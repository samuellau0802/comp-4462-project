import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, ThemeProvider, createTheme, ListItemIcon, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import SavingsIcon from '@mui/icons-material/Savings';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import WorkIcon from '@mui/icons-material/Work';

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

const IndicatorDropdown = ({ indicator, handleIndicatorChange }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <FormControl
        fullWidth
        variant="outlined"
        sx={{
          marginTop: 2,
          background: 'linear-gradient(135deg, rgba(130, 170, 255, 0.2), rgba(187, 134, 252, 0.2))',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)', // Glassmorphism effect
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          height: '45px', // Ensures consistent thickness
          minHeight: '64px', // Prevent shrinking
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
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
            borderRadius: '12px',
            overflow: 'hidden',
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                background: 'rgba(18, 18, 18, 0.9)',
                backdropFilter: 'blur(6px)',
                borderRadius: '12px',
                color: 'text.primary',
                '& .MuiMenuItem-root': {
                  padding: '10px 20px',
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
            <Typography>GDP Growth (Annual %)</Typography>
          </MenuItem>
          <MenuItem value="FX Reserves">
            <ListItemIcon>
              <SavingsIcon sx={{ color: 'secondary.main' }} />
            </ListItemIcon>
            <Typography>FX Reserves</Typography>
          </MenuItem>
          <MenuItem value="Government Debt-to-GDP">
            <ListItemIcon>
              <TimelineIcon sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <Typography>Government Debt-to-GDP</Typography>
          </MenuItem>
          <MenuItem value="Balance of Trade">
            <ListItemIcon>
              <TrendingUpIcon sx={{ color: 'secondary.main' }} />
            </ListItemIcon>
            <Typography>Balance of Trade</Typography>
          </MenuItem>
          <MenuItem value="Inflation">
            <ListItemIcon>
              <ShowChartIcon sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <Typography>Inflation</Typography>
          </MenuItem>
          <MenuItem value="Unemployment Rate">
            <ListItemIcon>
              <WorkIcon sx={{ color: 'secondary.main' }} />
            </ListItemIcon>
            <Typography>Unemployment Rate</Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default IndicatorDropdown;