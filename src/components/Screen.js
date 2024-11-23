import React, { useState, useEffect, useCallback } from "react";
import YearRangeSlider from "./YearRangeSlider";
import '../App.css';
import ChoroplethMap from "./ChoroplethMap";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LineChartComponent from "./LineChart";
import IndicatorDropdown from "./IndicatorDropdown";
import { Allotment } from "allotment";
import computeCorrelation from "./Correlation";
import "allotment/dist/style.css";

const Screen = ({ windowHeight }) => {
  const [maxYearRange] = useState([2008, 2023]);
  const [curYearRange, setCurYearRange] = useState([2008, 2023]);
  const [indicator, setIndicator] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryCorrelation, setSelectedCountryCorrelation] = useState(null);

  const handleYearRangeChange = useCallback((newRange) => {
    setCurYearRange(newRange);
    const updatedCorrelation = computeCorrelation(selectedCountry, curYearRange, "Stock Price", indicator);
    setSelectedCountryCorrelation(updatedCorrelation);
  }, [selectedCountry, indicator, curYearRange]);


  const handleIndicatorChange = useCallback((event) => {
    setIndicator(event.target.value);
    const updatedCorrelation = computeCorrelation(selectedCountry, curYearRange, "Stock Price", indicator);
    setSelectedCountryCorrelation(updatedCorrelation);
  }, [selectedCountry, curYearRange]);

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
      <Container style={{ height: `${windowHeight}px`}}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item size={8}>
            <IndicatorDropdown indicator={indicator} handleIndicatorChange={handleIndicatorChange} />
          </Grid>
          <Grid item size={4}>
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
            <Allotment.Pane preferredSize={600}>
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
  );
};

export default Screen;