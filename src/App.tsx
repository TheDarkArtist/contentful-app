import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { Builder } from './components/Builder';
import type { KnownAppSDK, EditorAppSDK } from '@contentful/app-sdk';

interface AppProps {
  sdk: KnownAppSDK;
}

function isEditorAppSDK(sdk: KnownAppSDK): sdk is EditorAppSDK {
  return 'entry' in sdk && typeof sdk.entry === 'object' && sdk.entry !== null;
}

export default function App({ sdk }: AppProps) {
  useEffect(() => {
    // Auto-resize the app if supported
    if ('window' in sdk && sdk.window && 'startAutoResizer' in sdk.window) {
      sdk.window.startAutoResizer();
    }

    // Make SDK available globally for middleware
    window.contentfulSDK = sdk;
  }, [sdk]);

  // Check if this is an editor app context
  if (!isEditorAppSDK(sdk)) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#666',
        fontSize: '1.1rem'
      }}>
        <h2>Layout Builder</h2>
        <p>This app can only be used in the entry editor context.</p>
        <p>Please add this app to a field in your content type.</p>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Builder sdk={sdk} />
      </PersistGate>
    </Provider>
  );
}

