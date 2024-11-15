import React, { useState, useEffect } from "react";
import YearRangeSlider from "./components/YearRangeSlider";
import './App.css';
import ChoroplethMap from "./components/ChoroplethMap";
import { Container } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import LineChartComponent from "./components/LineChart";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const App = () => {
  const [maxYearRange, setMaxYearRange] = useState([1960, 2020]);
  const [curYearRange, setCurYearRange] = useState([1960, 2020]);
  const [indicator, setIndicator] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleYearRangeChange = (newRange) => {
    setCurYearRange(newRange);
  };

  const handleIndicatorChange = (event) => {
    setIndicator(event.target.value);
  };

  useEffect(() => {
    // This effect will run whenever `indicator` or `curYearRange` changes
    // You can add logic here to update the map
    // console.log("IndicatorYear Range changed");
    // Add your map update logic here
  }, [indicator, curYearRange, selectedCountry]);

  return (
    <div className="App" style={{paddingTop: "50px"}}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={10}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Macro-Economic Indicator</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={indicator}
                label="Indicator"
                onChange={handleIndicatorChange}
              >
                <MenuItem value="GDP">GDP</MenuItem>
                <MenuItem value="Indicator2">Indicator2</MenuItem>
                <MenuItem value="Indicator3">Indicator3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={2}>
            <YearRangeSlider
              startYear={maxYearRange[0]}
              endYear={maxYearRange[1]}
              onChange={handleYearRangeChange}
            />
          </Grid>
        </Grid>
        <ChoroplethMap 
          yearRange={curYearRange} 
          indicator={indicator} 
          onClick={(country) => setSelectedCountry(country)}
          />

        {selectedCountry && ( // Only show LineChart if a country is selected
                  <LineChartComponent
                    country={selectedCountry} // Pass the selected country
                    yearRange={curYearRange}
                    indicator1={"Stock Price"}
                    indicator2={indicator}
                  />
                )}

      </Container>
    </div>
  );
};

export default App;