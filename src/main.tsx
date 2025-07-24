import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ this must point to your actual App.tsx file
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

