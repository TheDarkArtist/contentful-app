import type { KnownAppSDK } from 'contentful-ui-extensions-sdk';

declare global {
  interface Window {
    contentfulSDK: KnownAppSDK;
  }
}

interface ContentfulField<T = unknown> {
  setValue: (value: T) => void;
  getValue: () => T;
  onValueChanged: (handler: (value: T) => void) => () => void;
}

interface ContentfulEntry {
  fields: {
    layoutConfig: ContentfulField;
    [key: string]: ContentfulField;
  };
}

interface ContentfulSDK {
  entry: ContentfulEntry;
  window: {
    startAutoResizer: () => void;
    updateHeight: (height?: number) => void;
  };
}

declare global {
  interface Window {
    contentfulSDK: ContentfulSDK;
  }
}

export { };

