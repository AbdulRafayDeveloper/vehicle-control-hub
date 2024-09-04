import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
const App = lazy(() => import('./App.jsx'));
import './index.css';
import AppLoader from './views/components/Loaders/AppLoader';
import configService from './core/services/configService.js';
import './core/i18n.js'
configService.loadConfig().then(() => // load config befor mounting the application
  ReactDOM.createRoot(document.getElementById('root')).render(
    <Suspense fallback={<AppLoader />}>
      <App />
    </Suspense>
  )
);