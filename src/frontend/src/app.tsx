// src/App.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import TopMenu from './shared/TopMenu';
import Sidebar from './shared/Sidebar';
import {
  ThemeProvider,
  CssBaseline,
  Box,
} from '@mui/material';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './styles/theme-mui';
import DemoPage from './pages/DemoPage/DemoPage';
import DocsPage from './pages/DocsPage/DocsPage';
import '@fontsource/poppins';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* TopMenu */}
        <TopMenu />

        {/* Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: '80px',
            ml: '295px' // Offset by TopMenu height
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/demo" replace />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/docs/*" element={<DocsPage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

// Render the App
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
