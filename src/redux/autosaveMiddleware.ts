import type { Middleware, Dispatch, UnknownAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

let timeout: ReturnType<typeof setTimeout> | null = null;

function isActionWithType(action: unknown): action is { type: string } {
  return typeof action === 'object' && action !== null && 'type' in action;
}

function hasFieldSDK(sdk: unknown): sdk is { field: { setValue: (v: unknown) => void } } {
  return typeof sdk === 'object' && sdk !== null && 'field' in sdk;
}

export const autosaveMiddleware: Middleware<unknown, RootState, Dispatch<UnknownAction>> =
  (store) => (next) => (action) => {
    const result = next(action);

    const autosavable = [
      'layout/addBlock',
      'layout/removeBlock',
      'layout/moveBlock',
      'layout/setLayout',
    ];

    if (isActionWithType(action) && autosavable.includes(action.type)) {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        const sdk = window.contentfulSDK;
        const blocks = store.getState().layout.blocks;

        if (hasFieldSDK(sdk)) {
          try {
            sdk.field.setValue(blocks);
            console.info('[autosave] layout saved');
          } catch (err) {
            console.error('[autosave] failed to save layout:', err);
          }
        }
      }, 1000);
    }

    return result;
  };

