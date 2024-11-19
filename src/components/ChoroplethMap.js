import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import * as d3 from 'd3';
import { Tooltip } from 'react-tooltip';
import data from '../data/countries_data_2008_2023.json';
import geodata from '../data/world-110m.json';


const computeCorrelation = (country, yearRange, indicator1, indicator2) => {
  const [startYear, endYear] = yearRange;
  const values1 = [];
  const values2 = [];

  // Check if the specified country exists in the data
  if (!data[country]) {
      return NaN;
  }

  // Loop through the specified year range for the given country
  for (let year = startYear; year <= endYear; year++) {
      if (data[country][year]) {
          const indicatorValue1 = data[country][year][indicator1];
          const indicatorValue2 = data[country][year][indicator2];

          if (indicatorValue1 !== "NaN" && indicatorValue2 !== "NaN") {
              values1.push(indicatorValue1);
              values2.push(indicatorValue2);
          }
      }
  }

  // Calculate the correlation coefficient
  if (values1.length === 0 || values2.length === 0) return NaN;

  const n = values1.length;
  const sum1 = values1.reduce((a, b) => a + b, 0);
  const sum2 = values2.reduce((a, b) => a + b, 0);
  const sum1Sq = values1.reduce((a, b) => a + b * b, 0);
  const sum2Sq = values2.reduce((a, b) => a + b * b, 0);
  const pSum = values1.reduce((a, b, i) => a + b * values2[i], 0);

  const numerator = pSum - (sum1 * sum2 / n);
  const denominator = Math.sqrt((sum1Sq - (sum1 * sum1 / n)) * (sum2Sq - (sum2 * sum2 / n)));

  return denominator === 0 ? 0 : numerator / denominator;
};


const ChoroplethMap = ({ yearRange, indicator, onClick, style }) => {
  // Create a color scale using d3 for the choropleth
  const colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain([-1, 1]);


  // Create a color scale legend
  const gradientId = 'colorGradient';

  return (
    <div style={{ position: 'relative', textAlign: 'center', ...style }}>
      <ComposableMap projection="geoMercator">
        <Geographies geography={geodata}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const indicatorValue = computeCorrelation(countryName, yearRange, "Stock Price", indicator);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: isNaN(indicatorValue) ? "#d3d3d3" : colorScale(indicatorValue), // Light gray for NaN
                      outline: 'none',
                      stroke: '#000000',
                      strokeWidth: 0.5,
                    },
                    hover: {
                      fill: isNaN(indicatorValue) ? "#d3d3d3" : colorScale(indicatorValue),
                      fillOpacity: 0.7,
                      outline: 'none',
                      stroke: '#000000',
                      strokeWidth: 0.5,
                    },
                    pressed: {
                      fill: isNaN(indicatorValue) ? "#d3d3d3" : colorScale(indicatorValue),
                      outline: 'none',
                      stroke: '#000000',
                      strokeWidth: 0.5,
                    },
                  }}
                  onClick={() => {
                    if (onClick) {
                      console.log(indicatorValue);
                      onClick(countryName); // Call the onClick function passed from the parent
                  }
                  }}
                  data-tooltip-id="map"
                  data-tooltip-content={`${countryName}: ${indicatorValue}`}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <div style={{ position: 'absolute', bottom: '0px', right: '20px', width: '30%', height: 'auto' }}>
        <svg viewBox="0 0 100 20" preserveAspectRatio="xMinYMin meet" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: d3.interpolateRdYlGn(-1), stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: d3.interpolateRdYlGn(1), stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect width="100" height="10" fill={`url(#${gradientId})`} />
          <text x="0" y="15" fontSize="5">-1</text>
          <text x="95" y="15" fontSize="5">1</text>
        </svg>
      </div>
      <Tooltip id="map" />
    </div>
  );
};

export default ChoroplethMap;