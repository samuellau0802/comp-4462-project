// Screen.js

import React, { useState, useEffect, useCallback } from "react";
import YearRangeSlider from "./YearRangeSlider";
import '../App.css';
import ChoroplethMap from "./ChoroplethMap";
import { Container, Grid } from "@mui/material"; // Ensure Grid is imported
import LineChartComponent from "./LineChart";
import IndicatorDropdown from "./IndicatorDropdown";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

const Screen = () => {
  const [maxYearRange] = useState([2008, 2023]);
  const [curYearRange, setCurYearRange] = useState([2008, 2023]);
  const [indicator, setIndicator] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryCorrelation, setSelectedCountryCorrelation] = useState(null);

  const handleYearRangeChange = useCallback((newRange) => {
    setCurYearRange(newRange);
  }, []);

  const handleIndicatorChange = useCallback((event) => {
    setIndicator(event.target.value);
  }, []);

  const handleSelectedCountry = useCallback((country, correlation) => {
    if (selectedCountry === country) {
      setSelectedCountry(null);
      setSelectedCountryCorrelation(null);
    } else {
      setSelectedCountry(country);
      
      // Parse correlation to ensure it's a number
      const numericCorrelation = parseFloat(correlation);
      
      if (!isNaN(numericCorrelation)) {
        setSelectedCountryCorrelation(numericCorrelation); // Store as number
      } else {
        setSelectedCountryCorrelation(null);
      }
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Add any logic needed when `indicator`, `curYearRange`, or `selectedCountry` changes
  }, [indicator, curYearRange, selectedCountry]);

  return (
    <div className="App" style={{ paddingTop: "20px", height: "1000px", backgroundColor: "#121212" }}>
      <Container style={{ height: "1000px" }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={8}>
            <IndicatorDropdown indicator={indicator} handleIndicatorChange={handleIndicatorChange} />
          </Grid>
          <Grid item xs={4}>
            <YearRangeSlider
              startYear={maxYearRange[0]}
              endYear={maxYearRange[1]}
              onChange={handleYearRangeChange}
            />
          </Grid>
        </Grid>

        <Allotment vertical>
          <Allotment.Pane minSize={200} preferredSize={900}>
            <ChoroplethMap
              yearRange={curYearRange}
              indicator={indicator}
              onClick={(country, correlation) => handleSelectedCountry(country, correlation)}
            />
          </Allotment.Pane>

          {selectedCountry && (
            <Allotment.Pane preferredSize={550}>
              <LineChartComponent
                country={selectedCountry}
                yearRange={curYearRange}
                indicator1={"Stock Price"}
                indicator2={indicator}
                correlation={selectedCountryCorrelation} // Passing correlation as a number
              />
            </Allotment.Pane>
          )}
        </Allotment>
      </Container>
    </div>
  );
};

export default Screen;