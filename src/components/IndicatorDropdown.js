import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const IndicatorDropdown = ({ indicator, handleIndicatorChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">Macro-Economic Indicator</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={indicator}
        label="Indicator"
        onChange={handleIndicatorChange}
      >
        <MenuItem value="GDP growth (annual %)">GDP growth (annual %)</MenuItem>
        <MenuItem value="FX Reserves">FX Reserves</MenuItem>
        <MenuItem value="Government Debt-to-GDP">Government Debt-to-GDP</MenuItem>
        <MenuItem value="Balance of Trade">Balance of Trade</MenuItem>
        <MenuItem value="Inflation">Inflation</MenuItem>
        <MenuItem value="Unemployment Rate">Unemployment Rate</MenuItem>
      </Select>
    </FormControl>
  );
};

export default IndicatorDropdown;