// src/DemoPage.tsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Link, Routes, Route, useParams } from 'react-router-dom';
import select from '../../images/select.png';

interface Demo {
  id: string;
  path: string;
}
const demos: Demo[] = [
  { id: 'manual', path: '/demo/manual' },
  { id: 'legal', path: '/demo/legal' },
];

function DemoPage() {
  // Define your sidebar control buttons
  const sidebarButtons = [
    { text: 'Start', icon: <PlayArrowIcon />, onClick: () => console.log('Start') },
    { text: 'Stop', icon: <StopIcon />, onClick: () => console.log('Stop') },
    // Add more buttons as needed
  ];

  return (
    <>
      {/* Vertical Sidebar */}
      <Box
        sx={{
          width: '240px', // Use string with units
          bgcolor: 'background.paper',
          height: 'calc(100vh - 80px)', // Full height minus AppBar
          position: 'fixed',
          top: '80px', // Positioned below the AppBar
          left: 0,
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        {/* Sidebar Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: 'text.primary' }}>
            Controls
          </Typography>
        </Box>

        {/* Control Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {sidebarButtons.map((button) => (
            <Button
              key={button.text}
              startIcon={button.icon}
              onClick={button.onClick}
              sx={{
                mb: 1,
                justifyContent: 'flex-start',
                color: 'text.primary',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {button.text}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          display: 'flex',                // Enable Flexbox
          flexDirection: 'column',        // Arrange children vertically
          alignItems: 'center',           // Center horizontally
          justifyContent: 'center',       // Center vertically
          flexGrow: 1,
          ml: '240px',                    // Margin left for Sidebar
          mt: '80px',                     // Margin top for AppBar
          p: 3,
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        {/* Centered Image */}
        <Box
          component="img"
          src={select}
          alt="Select"
          sx={{
            maxWidth: '100%',
            height: '150px',
            objectFit: 'contain',
            marginBottom: '50px',
          }}
        />

        {/* Centered Text */}
        <Typography
          variant="h1"
          align="center"
          gutterBottom
          sx={{ color: '#888888', fontSize: '25px', marginBottom: '20px' }}
        >
          Select Demo Simulation
        </Typography>
        <Routes>
          <Route path="/" element={''} />
          <Route path="manual" element={''} />
          <Route path="automated" element={'<AutomatedDemo />'} />
          {/* Add more nested demo routes as needed */}
        </Routes>
      </Box>
    </>
  );
}

export default DemoPage;
