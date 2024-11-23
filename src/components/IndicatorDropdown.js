import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ThemeProvider,
  createTheme,
  ListItemIcon,
  Typography,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import SavingsIcon from '@mui/icons-material/Savings';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import WorkIcon from '@mui/icons-material/Work';

// Custom dark theme with polished Apple-inspired gradients and effects
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#82aaff', // Calming blue
    },
    secondary: {
      main: '#ff79c6', // Vibrant pink for accents
    },
    background: {
      default: '#121212', // Deep dark background
      paper: 'rgba(255, 255, 255, 0.08)', // Subtle frosted glassmorphism
    },
    text: {
      primary: '#ffffff', // Bright text for contrast
      secondary: '#b3b3b3', // Muted secondary text
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", "Roboto", "Helvetica Neue", sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
    },
  },
});

const IndicatorDropdown = ({ indicator, handleIndicatorChange }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <FormControl
        fullWidth
        variant="outlined"
        sx={{
          marginTop: 2,
          background:
            'linear-gradient(145deg, rgba(130, 170, 255, 0.15), rgba(255, 121, 198, 0.15))',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          height: '64px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            // transform: 'scale(1.03)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 1)',
          },
        }}
      >
        <InputLabel
          id="indicator-select-label"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            fontSize: '1.1rem',
          }}
        >
          Choose an Indicator
        </InputLabel>
        <Select
          labelId="indicator-select-label"
          id="indicator-select"
          value={indicator}
          label="Choose an Indicator"
          onChange={handleIndicatorChange}
          sx={{
            color: 'text.primary',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              borderWidth: '2px',
            },
            fontSize: '1.1rem',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                background: 'rgba(18, 18, 18, 0.95)',
                backdropFilter: 'blur(6px)',
                borderRadius: '16px',
                color: 'text.primary',
                '& .MuiMenuItem-root': {
                  padding: '12px 20px',
                  '&:hover': {
                    backgroundColor: 'rgba(130, 170, 255, 0.2)',
                  },
                },
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#82aaff',
                  borderRadius: '4px',
                },
              },
            },
          }}
        >
          <MenuItem value="GDP growth (annual %)">
            <ListItemIcon>
              <BarChartIcon sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              GDP Growth (Annual %)
            </Typography>
          </MenuItem>
          <MenuItem value="FX Reserves">
            <ListItemIcon>
              <SavingsIcon sx={{ color: 'secondary.main' }} />
            </ListItemIcon>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              FX Reserves
            </Typography>
          </MenuItem>
          <MenuItem value="Government Debt-to-GDP">
            <ListItemIcon>
              <TimelineIcon sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Government Debt-to-GDP
            </Typography>
          </MenuItem>
          <MenuItem value="Balance of Trade">
            <ListItemIcon>
              <TrendingUpIcon sx={{ color: 'secondary.main' }} />
            </ListItemIcon>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Balance of Trade
            </Typography>
          </MenuItem>
          <MenuItem value="Inflation">
            <ListItemIcon>
              <ShowChartIcon sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Inflation
            </Typography>
          </MenuItem>
          <MenuItem value="Unemployment Rate">
            <ListItemIcon>
              <WorkIcon sx={{ color: 'secondary.main' }} />
            </ListItemIcon>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Unemployment Rate
            </Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default IndicatorDropdown;
