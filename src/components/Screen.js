import React, { useState, useEffect, useCallback } from "react";
import YearRangeSlider from "./YearRangeSlider";
import '../App.css';
import ChoroplethMap from "./ChoroplethMap";
import { Button, Container, Card, CardContent, Grid } from "@mui/material";
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
      if (!isNaN(correlation)) {
        setSelectedCountryCorrelation(correlation);
      } else {
        setSelectedCountryCorrelation(null);
      }
    }
  }, [selectedCountry, selectedCountryCorrelation]);

  const correlationCard = (
    selectedCountryCorrelation && (
      <Card
        style={{
          backgroundColor: "#1d1d1f",
          color: "#e0e0e0",
          border: "1px solid #3a3a3b",
          borderRadius: "8px",
        }}
      >
        <CardContent>
          <div style={{ fontSize: "1.2em", marginBottom: "5px" }}>Correlation</div>
          <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>{selectedCountryCorrelation}</div>
        </CardContent>
      </Card>
    )
  );

  useEffect(() => {
    // Add logic for when `indicator`, `curYearRange`, or `selectedCountry` changes if needed
  }, [indicator, curYearRange, selectedCountry]);

  return (
    <div className="App" style={{ paddingTop: "50px", height: "1000px", backgroundColor: "#121212" }}>
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
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  {correlationCard}
                </Grid>
                <Grid item xs={9}>
                  <LineChartComponent
                    country={selectedCountry}
                    yearRange={curYearRange}
                    indicator1={"Stock Price"}
                    indicator2={indicator}
                  />
                </Grid>
              </Grid>
            </Allotment.Pane>
          )}
        </Allotment>
      </Container>
    </div>
  );
};

export default Screen;
