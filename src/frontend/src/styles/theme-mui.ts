// theme.ts
import { createTheme } from '@mui/material/styles';
import '@fontsource/poppins';

const theme = createTheme({
  palette: {
    mode: 'dark', // Enable dark mode
    primary: {
      main: '#655D5F',      // Light blue for contrast in dark mode
      dark: '#383543',
      light: '#E3AE3C',
      contrastText: '#000000',
    },
    secondary: {
      main: '#f48fb1',      // Pink accent color
      dark: '#d81b60',
      light: '#f8bbd0',
      contrastText: '#000000',
    },
    background: {
      default: '#151220',   // Dark background
      paper: '#383543',
      sidebar: '#2F354C'  // Sidebar background color    // Slightly lighter for surfaces
    },
    text: {
      primary: '#e6e3e3',   // White text for readability
      secondary: '#D2CCB9', // Grey for secondary text
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: {
      fontSize: '2.2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 500,
    },
    h6: {
      fontWeight: 700, // Bold for titles
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none', // Keep button text capitalization
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#90caf9', // Use the primary main color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#90caf9',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#64b5f6', // Slightly darker on hover
          },
        },
        containedSecondary: {
          backgroundColor: '#f48fb1',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#f06292',
          },
        },
        outlinedPrimary: {
          borderColor: '#90caf9',
          color: '#90caf9',
          '&:hover': {
            borderColor: '#64b5f6',
            backgroundColor: 'rgba(144, 202, 249, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Enhanced shadow for depth
        },
      },
    },
  },
});

export default theme;
