import type { KnownAppSDK } from 'contentful-ui-extensions-sdk';

declare global {
  interface Window {
    contentfulSDK: KnownAppSDK;
  }
}

export { };

