import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { MantineProvider } from '@mantine/core';

// Type assertion to ensure `root` is not null
const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <MantineProvider >
      <App />
    </MantineProvider>
  </React.StrictMode>
);

// Measuring performance in the app
reportWebVitals();

