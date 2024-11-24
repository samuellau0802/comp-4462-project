import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

// Keyframe animation for cycling colors in a dark theme
const colorCycleAnimation = keyframes`
  0% { background: #121212; color: #82aaff; }
  25% { background: #1a1a2e; color: #ff79c6; }
  50% { background: #0f2027; color: #21d4fd; }
  75% { background: #162447; color: #a1ffce; }
  100% { background: #121212; color: #82aaff; }
`;

// Custom dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#82aaff', // Soft blue for primary elements
    },
    secondary: {
      main: '#ff79c6', // Vibrant pink for accents
    },
    background: {
      default: '#121212', // Deep dark background
      paper: 'rgba(18, 18, 18, 0.8)', // Subtle frosted glass effect
    },
    text: {
      primary: '#ffffff', // Bright white text
      secondary: '#b3b3b3', // Muted grey text
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", "Roboto", "Helvetica Neue", sans-serif',
    fontSize: 16,
    button: {
      textTransform: 'none',
    },
  },
});

const Header = ({ handleSplit, isSplit, startScrollyTelling }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          marginBottom: '16px',
          animation: 'fadeIn 1s ease',
        }}
      >
        <AppBar
          position="static"
          sx={{
            animation: `${colorCycleAnimation} 10s infinite`, // Color cycle animation
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            borderRadius: '12px',
            padding: '8px 16px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              // transform: 'scale(1.02)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.8)',
            },
          }}
        >
          <Toolbar>
            {/* Split Screen Button */}
            <Button
              variant="contained"
              size="small"
              onClick={handleSplit}
              sx={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #82aaff, #ff79c6)',
                color: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(130, 170, 255, 0.5)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                fontWeight: 600,
                fontSize: '0.9rem',
                marginRight: '16px',
                '&:hover': {
                  // transform: 'scale(1.1)',
                  boxShadow: '0 8px 16px rgba(130, 170, 255, 0.8)',
                },
              }}
            >
              {isSplit ? 'Unsplit Screen' : 'Split Screen'}
            </Button>

            {/* Title with Glowing Effect */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                fontSize: '1.5rem',
                textAlign: 'center',
                letterSpacing: '0.5px',
                textShadow: '0 0 20px rgba(130, 170, 255, 0.7)', // Glowing effect
                animation: `${colorCycleAnimation} 10s infinite`, // Color synced with AppBar
              }}
            >
              Macro-Economic Data and Index Prices Visualization
            </Typography>

            <Button
              variant="contained"
              onClick={startScrollyTelling}
              sx={{
                background: 'linear-gradient(135deg, #82aaff, #ffcc80)',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '25px',
                padding: '10px 20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  // transform: 'scale(1.05)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.8)',
                },
              }}
            >
              Start Tour
        </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Header;
