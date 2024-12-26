// src/frontend/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // Ensure the path is correct
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme-mui';

// Render the App component
const rootElement = document.getElementById('root');
let root: ReactDOM.Root;

if (rootElement) {
  root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
} else {
  throw new Error('Root element not found');
}

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./app', () => {
    // Dynamically import the updated App component
    import('./app').then(({ default: NextApp }) => {
      if (root) {
        root.render(
          <React.StrictMode>
            <Provider store={store}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                  <NextApp />
                </BrowserRouter>
              </ThemeProvider>
            </Provider>
          </React.StrictMode>
        );
      }
    }).catch(err => {
      console.error('Failed to load App module:', err);
    });
  });
}

console.log('Frontend app loaded successfully.');
