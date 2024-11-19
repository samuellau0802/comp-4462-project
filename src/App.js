import React, { useState, useEffect, useCallback } from "react";
import YearRangeSlider from "./components/YearRangeSlider";
import './App.css';
import ChoroplethMap from "./components/ChoroplethMap";
import { Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import LineChartComponent from "./components/LineChart";
import IndicatorDropdown from "./components/IndicatorDropdown";

const App = () => {
  const [maxYearRange] = useState([2008, 2023]);
  const [curYearRange, setCurYearRange] = useState([2008, 2023]);
  const [indicator, setIndicator] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [mapSize, ] = useState('large');

  const handleYearRangeChange = useCallback((newRange) => {
    setCurYearRange(newRange);
  }, []);

  const handleIndicatorChange = useCallback((event) => {
    setIndicator(event.target.value);
  }, []);

  useEffect(() => {
    // This effect will run whenever `indicator`, `curYearRange`, or `selectedCountry` changes
    // Add your map update logic here if needed
  }, [indicator, curYearRange, selectedCountry]);

  return (
    <div className="App" style={{ paddingTop: "50px" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={10}>
            <IndicatorDropdown indicator={indicator} handleIndicatorChange={handleIndicatorChange} />
          </Grid>
          <Grid item xs={2}>
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
        {selectedCountry && (
          <LineChartComponent
            country={selectedCountry}
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