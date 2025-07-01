import ReactDOM from 'react-dom/client';
import App from './App';
import { init, type KnownAppSDK } from '@contentful/app-sdk';

init((sdk: KnownAppSDK) => {
  try {
    const root = ReactDOM.createRoot(document.getElementById('root')!);
    root.render(<App sdk={sdk} />);
  } catch (error) {
    console.error('Failed to render app:', error);

    const root = ReactDOM.createRoot(document.getElementById('root')!);
    root.render(
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#d32f2f',
        fontSize: '1.1rem'
      }}>
        <h2>Rendering Error</h2>
        <p>Failed to render the application.</p>
        <p>Please check the console for more details.</p>
      </div>
    );
  }
});
