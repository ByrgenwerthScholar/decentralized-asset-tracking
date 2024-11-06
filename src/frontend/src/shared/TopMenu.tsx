import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Divider,
} from '@mui/material';

import { Link, useLocation } from 'react-router-dom';

function TopMenu() {
  const location = useLocation();

  const topMenuItems = [
    { text: 'Demo', path: '/demo' },
    { text: 'Blockchain', path: '/blockchain' },
    { text: 'Docs', path: '/docs' },
    { text: 'Contact', path: '/contact' },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: 80,
        justifyContent: 'center',
        bgcolor: 'transparent',
        ml: '295px', // Margin-left equal to Sidebar width
        width: 'calc(100% - 295px)', // Width adjusted to account for Sidebar
      }}
    >
      <Toolbar sx={{ height: '100%' }}>
        {/* Navigation Items */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            maxWidth: '1000px',
          }}
        >
          {topMenuItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <Button
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  color: location.pathname === item.path ? 'primary.light' : 'text.primary',
                  // Removed the borderBottom style
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  flexGrow: 1,
                  paddingY: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {item.text}
              </Button>
              {index < topMenuItems.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    mx: 1,
                    height: '1.5em',
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                    alignSelf: 'center',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopMenu;
