import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.jsx';
import { UserProvider } from './Context/UserContext.jsx';
import { LoaderProvider } from './hooks/useLoader';
import './i18n/i18n.js';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <UserProvider>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </UserProvider>
    </Router>
  </StrictMode>
);
