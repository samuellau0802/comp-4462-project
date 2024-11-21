import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Header = ({ handleSplit, isSplit }) => {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
        <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ padding: "4px 12px" }}  // Optional custom padding
        onClick={handleSplit}
      >
        {isSplit ? "Unsplit Screen" : "Split Screen"}
      </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Macro-Economic Data and Stock Prices Visualization
          </Typography>
          <Button color="inherit" disabled></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;