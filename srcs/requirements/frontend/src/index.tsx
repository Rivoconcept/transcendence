import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // optionnel, tu peux créer ce fichier pour le style global

// Crée la racine de ton application React
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
