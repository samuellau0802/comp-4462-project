import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a stunning dark theme with gradient support
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#82aaff', // Soft blue for primary color
    },
    secondary: {
      main: '#ff79c6', // Pink accent for wow factor
    },
    background: {
      default: '#121212', // Dark base
      paper: 'rgba(255, 255, 255, 0.1)', // Glassmorphism background
    },
    text: {
      primary: '#ffffff', // Bright white text
      secondary: '#b3b3b3', // Muted grey text
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica Neue", sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
    },
  },
});

const Header = ({ handleSplit, isSplit }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <AppBar position="static" sx={{ background: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(10px)' }}>
          <Toolbar>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ padding: "4px 12px", marginRight: 2 }}
              onClick={handleSplit}
            >
              {isSplit ? "Unsplit Screen" : "Split Screen"}
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
              Macro-Economic Data and Stock Prices Visualization
            </Typography>
            <Button color="inherit" disabled></Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Header;