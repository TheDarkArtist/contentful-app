import type { Middleware, Dispatch, UnknownAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { EditorAppSDK } from '@contentful/app-sdk';

let timeout: ReturnType<typeof setTimeout> | null = null;

function isActionWithType(action: unknown): action is { type: string } {
  return typeof action === 'object' && action !== null && 'type' in action;
}

function isEditorSDK(sdk: unknown): sdk is EditorAppSDK {
  if (typeof sdk !== 'object' || sdk === null) return false;

  const hasEntry = 'entry' in sdk;
  if (!hasEntry) return false;

  const entry = (sdk as { entry: unknown }).entry;
  if (typeof entry !== 'object' || entry === null) return false;

  const hasFields = 'fields' in entry;
  if (!hasFields) return false;

  const fields = (entry as { fields: unknown }).fields;
  if (typeof fields !== 'object' || fields === null) return false;

  return 'layoutConfig' in fields;
}

export const autosaveMiddleware: Middleware<unknown, RootState, Dispatch<UnknownAction>> =
  (store) => (next) => (action) => {
    const result = next(action);

    const autosavableActions = [
      'layout/addBlock',
      'layout/removeBlock',
      'layout/moveBlock',
      'layout/setLayout',
    ] as const;

    if (isActionWithType(action) && autosavableActions.includes(action.type as typeof autosavableActions[number])) {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(async () => {
        try {
          const sdk = window.contentfulSDK;

          if (!isEditorSDK(sdk)) {
            console.warn('[autosave] SDK is not an editor SDK or layoutConfig field is missing');
            return;
          }

          const state = store.getState();

          if (!state.layout) {
            console.warn('[autosave] Layout state not found');
            return;
          }

          const blocks = state.layout.blocks;

          const layoutField = sdk.entry.fields.layoutConfig;
          if (layoutField && 'setValue' in layoutField && typeof layoutField.setValue === 'function') {
            await layoutField.setValue(blocks);
            console.info('[autosave] layoutConfig saved successfully');
          } else {
            console.warn('[autosave] layoutConfig field not found or setValue method not available');
          }

        } catch (err) {
          console.error('[autosave] Failed to save layoutConfig:', err);
        }
      }, 1000);
    }

    return result;
  };
