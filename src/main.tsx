import ReactDOM from 'react-dom/client';
import App from './App';
import { init } from 'contentful-ui-extensions-sdk';
import type { KnownAppSDK } from 'contentful-ui-extensions-sdk';

init((sdk: KnownAppSDK) => {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(<App sdk={sdk} />);
});

