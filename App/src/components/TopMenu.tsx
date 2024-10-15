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
      color="transparent"
      elevation={0}
      sx={{
        height: 80, // Increased height for thickness
        justifyContent: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)', // Separator line
        bgcolor: 'transparent', // Transparent background
      }}>
      <Toolbar sx={{ height: '100%' }}>
        {/* Logo and Title on the Left */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Flex container for the Typography components */}
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Typography
              variant="h6"
              sx={{
                textDecoration: 'none',
                color: 'text.primary',
                fontSize: '1.4rem',
              }}
            >
              LockeLight Demo
            </Typography>
          </Box>
        </Box>
      
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1, // Allows the Box to take up remaining horizontal space
            marginLeft: '100px', // Static left margin separating from the logo
            maxWidth: '1000px', // Optional: Limit maximum width to prevent excessive spacing on very large screens
          }}
        >
          {topMenuItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <Button
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  color: 'text.primary',
                  borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  flexGrow: 1, // Ensures equal button width
                  paddingY: 1, // Ensures consistent button height
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
                    mx: 1, // Horizontal margin around the divider
                    height: '1.5em', // Adjusts the height to align with button text
                    bgcolor: 'rgba(255, 255, 255, 0.3)', // Subtle divider color
                    alignSelf: 'center', // Centers the divider vertically
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopMenu;
