import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot
import App from './App';

const container = document.getElementById('root'); // Get the root element
const root = ReactDOM.createRoot(container); // Create a root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
