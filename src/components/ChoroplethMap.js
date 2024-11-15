import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import * as d3 from 'd3';
import { Tooltip } from 'react-tooltip';
import data from '../data/countries_data.json';
import geodata from '../data/world-110m.json';


const computeCorrelation = (country, yearRange, indicator1, indicator2) => {
  const [startYear, endYear] = yearRange;
  const values1 = [];
  const values2 = [];

  // Check if the specified country exists in the data
  if (!data[country]) {
      return 0;
  }

  // Loop through the specified year range for the given country
  for (let year = startYear; year <= endYear; year++) {
      if (data[country][year]) {
          const indicatorValue1 = data[country][year][indicator1];
          const indicatorValue2 = data[country][year][indicator2];

          if (indicatorValue1 !== undefined && indicatorValue2 !== undefined) {
              values1.push(indicatorValue1);
              values2.push(indicatorValue2);
          }
      }
  }

  // Calculate the correlation coefficient
  if (values1.length === 0 || values2.length === 0) return 0;

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


const ChoroplethMap = ({ yearRange, indicator, onClick }) => {
  // Create a color scale using d3 for the choropleth
  const colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain([-1, 1]);


  // Create a color scale legend
  const legendWidth = 500;
  const legendHeight = 20;
  const gradientId = 'colorGradient';

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <ComposableMap projection="geoEqualEarth">
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
                      fill: colorScale(indicatorValue),
                      outline: 'none',
                      stroke: '#000000',
                      strokeWidth: 0.5,
                    },
                    hover: {
                      fill: colorScale(indicatorValue),
                      fillOpacity: 0.7,
                      outline: 'none',
                      stroke: '#000000',
                      strokeWidth: 0.5,
                    },
                    pressed: {
                      fill: colorScale(indicatorValue),
                      outline: 'none',
                      stroke: '#000000',
                      strokeWidth: 0.5,
                    },
                  }}
                  onClick={() => {
                    if (onClick) {
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
      <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <svg width={legendWidth} height={legendHeight + 20}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: d3.interpolateRdYlGn(-1), stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: d3.interpolateRdYlGn(1), stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect width={legendWidth} height={legendHeight} fill={`url(#${gradientId})`} />
          <text x="0" y={legendHeight + 20} fontSize="16">-1</text>
          <text x={legendWidth - 10} y={legendHeight + 20} fontSize="16">1</text>
        </svg>
      </div>
      <Tooltip id="map" />
    </div>
  );
};

export default ChoroplethMap;