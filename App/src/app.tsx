// src/App.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import TopMenu from './components/TopMenu';
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

function App() {

  return (
    <Box sx={{ display: 'flex' }}>
    <TopMenu />
      {/* Define your routes here */}
      <Routes>
        <Route path="/" element={<Navigate to="/demo" replace />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/docs/*" element={<DocsPage />} />
      </Routes>
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
        <App />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
