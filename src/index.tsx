import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

if (document.getElementById('root')) {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Рут не найден.');
}