import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.jsx';
import { UserProvider } from './Context/UserContext.jsx';
import { LoaderProvider } from './hooks/useLoader';
import './i18n/i18n.js';
import { CompareProvider } from './Context/CompareContext.jsx';
import { CurrencyProvider } from './Context/CurrencyContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <UserProvider>
        <LoaderProvider>
          <CompareProvider>
            <CurrencyProvider>
              <App />
            </CurrencyProvider>
          </CompareProvider>
        </LoaderProvider>
      </UserProvider>
    </Router>
  </StrictMode>
);
