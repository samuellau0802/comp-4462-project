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


const App = () => {
  const [maxYearRange, setMaxYearRange] = useState([2008, 2023]);
  const [curYearRange, setCurYearRange] = useState([2008, 2023]);
  const [indicator, setIndicator] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [mapSize, setMapSize] = useState('large');

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
    // if (selectedCountry && indicator && curYearRange) {
    //   setMapSize('small');
    // }
    
  }, [indicator, curYearRange, selectedCountry]);

  return (
    <div className="App" style={{paddingTop: "50px"}}>
      <Container maxWidth="sm">
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
                <MenuItem value="GDP growth (annual %)">GDP growth (annual %)</MenuItem>
                {/* <MenuItem value="Indicator2">Indicator2</MenuItem>
                <MenuItem value="Indicator3">Indicator3</MenuItem> */}
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
          style={{ width: mapSize === 'large' ? '100%' : '50%', height: 'auto' }} 
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