import { useEffect } from 'react';
import type { KnownAppSDK } from 'contentful-ui-extensions-sdk';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
import { Builder } from './components/Builder';

interface AppProps {
  sdk: KnownAppSDK;
}

export default function App({ sdk }: AppProps) {
  useEffect(() => {
    if ('window' in sdk) {
      sdk.window.startAutoResizer();
    }

    window.contentfulSDK = sdk;
  }, [sdk]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Builder sdk={sdk} />
      </PersistGate>
    </Provider>
  );
}

