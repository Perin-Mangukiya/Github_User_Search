import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Auth0Provider
    domain="dev-z383sbnee3qz6gmw.us.auth0.com"
    clientId="ctsMRa7dcKIUdCiqGNdDOKmn8ClXHg3d"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation='localstorage' 

    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
);
serviceWorker.unregister();
