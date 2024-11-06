// src/components/Sidebar.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

// Import your sidebar content components
import DemoSidebarContent from '../pages/DemoPage/Sidebar/DemoSidebarContent';
import DocsSidebarContent from '../pages/DocsPage/DocsSidebarContent';

const Sidebar: React.FC = () => {
  const location = useLocation();

  // Determine which content to render based on the current path or state
  let sidebarContent;

  if (location.pathname.startsWith('/demo')) {
    sidebarContent = <DemoSidebarContent />;
  } else if (location.pathname.startsWith('/docs')) {
    sidebarContent = <DocsSidebarContent />;
  } 

  return (
    <Box
      sx={{
        width: '295px',
        bgcolor: 'background.sidebar',
        borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        flexShrink: 0,
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      {/* Sidebar Title or Logo */}
      <Box sx={{ mb: 2 }}>
        
        <Typography variant="title">Lockelight Demo</Typography>
      </Box>

      {/* Dynamic Sidebar Content */}
      {sidebarContent}
    </Box>
  );
};

export default Sidebar;
