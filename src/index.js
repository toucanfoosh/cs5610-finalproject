import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import "bootswatch/dist/lux/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div class="sf-bg-primary">
      <App />
    </div>
  </React.StrictMode>
);
