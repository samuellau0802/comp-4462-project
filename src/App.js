import React, { useState, useEffect, useCallback, useRef } from "react";
import YearRangeSlider from "./components/YearRangeSlider";
import './App.css';
import ChoroplethMap from "./components/ChoroplethMap";
import { Container } from "@mui/material";
import LineChartComponent from "./components/LineChart";
import IndicatorDropdown from "./components/IndicatorDropdown";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';

const App = () => {
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
    setSelectedCountry(null); // Deselect the country if it's already selected
    setSelectedCountryCorrelation(null);
  } else {
    setSelectedCountry(country); // Select the new country
    if (!isNaN(correlation)) {
      setSelectedCountryCorrelation(correlation);
    } else {
      setSelectedCountryCorrelation(null);
  }
}
}, [selectedCountry, selectedCountryCorrelation]);

const correlationCard = (
  selectedCountryCorrelation && (
    <Card>
      <CardContent>
        <div>
          Correlation
        </div>
        <div>
          <strong>{selectedCountryCorrelation}</strong>
        </div>
      </CardContent>
    </Card>
  )
);


  useEffect(() => {
    // This effect will run whenever `indicator`, `curYearRange`, or `selectedCountry` changes
    // Add your map update logic here if needed
  }, [indicator, curYearRange, selectedCountry]);

  return (
    <div className="App" style={{ paddingTop: "50px", height: "1000px" }}>
        <Container style={{ height: "1000px" }}>

        <Grid container spacing={4}>
          <Grid item size={10}>
            <IndicatorDropdown indicator={indicator} handleIndicatorChange={handleIndicatorChange} />
          </Grid>
          <Grid item size={2}>
            <YearRangeSlider
              startYear={maxYearRange[0]}
              endYear={maxYearRange[1]}
              onChange={handleYearRangeChange}
            />
          </Grid>
        </Grid>


        <Allotment vertical={true}>
          <Allotment.Pane minSize={200} preferredSize={900}>
            <ChoroplethMap
              yearRange={curYearRange}
              indicator={indicator}
              onClick={(country, correlation) => handleSelectedCountry(country, correlation)}
              // style={{ width: '100%', height: '100%' }}
            />
          </Allotment.Pane>

            {selectedCountry && (
              <Allotment.Pane preferredSize={500}>
                <Grid container spacing={2}>
                  <Grid size={2}>
                  <Card variant="outlined">{correlationCard}</Card>
              
                  </Grid>
                  <Grid size={10}>
                          <LineChartComponent
                        country={selectedCountry}
                        yearRange={curYearRange}
                        indicator1={"Stock Price"}
                        indicator2={indicator}
                        style={{ width: '100%', height: '100%' }}
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

export default App;