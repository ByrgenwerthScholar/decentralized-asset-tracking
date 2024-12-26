// src/frontend/src/App.tsx
import React from 'react';
import TopMenu from './shared/TopMenu';
import Sidebar from './shared/Sidebar';
import { Box } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import DemoPage from './pages/DemoPage/DemoPage';
import DocsPage from './pages/DocsPage/DocsPage';
import '@fontsource/poppins';

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
            ml: '295px' // Offset by Sidebar width
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

export default App;
