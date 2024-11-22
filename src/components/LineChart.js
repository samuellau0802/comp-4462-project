// LineChartComponent.js

import React, { useMemo, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import data from '../data/countries_data_2008_2023.json';
import { Button, ButtonGroup, Box, Typography, Card, CardContent } from '@mui/material';

// Function to extract data for the specified country and indicators
const getDataForCountry = (country, yearRange, indicator1, indicator2) => {
    const [startYear, endYear] = yearRange;
    const chartData = [];

    if (!data[country]) {
        return chartData; // Return empty if the country is not found
    }

    // Loop through the specified year range for the given country
    for (let year = startYear; year <= endYear; year++) {
        if (data[country][year]) {
            const indicatorValue1 = parseFloat(data[country][year][indicator1]);
            const indicatorValue2 = parseFloat(data[country][year][indicator2]);

            // Check if both indicators are valid numbers
            if (
                !isNaN(indicatorValue1) &&
                !isNaN(indicatorValue2)
            ) {
                chartData.push({
                    year: year,
                    [indicator1]: indicatorValue1,
                    [indicator2]: indicatorValue2
                });
            }
        }
    }

    return chartData;
};

// Function to normalize data between 0 and 100
const normalizeData = (chartData, indicators) => {
    const normalizedData = [];
    const minMax = {};

    // Calculate min and max for each indicator
    indicators.forEach(indicator => {
        const values = chartData
            .map(item => item[indicator])
            .filter(value => typeof value === 'number' && !isNaN(value));
        minMax[indicator] = {
            min: Math.min(...values),
            max: Math.max(...values)
        };
    });

    // Normalize each value
    chartData.forEach(item => {
        const normalizedItem = { year: item.year };
        indicators.forEach(indicator => {
            const { min, max } = minMax[indicator];
            const value = item[indicator];

            if (typeof value === 'number' && !isNaN(value)) {
                // Avoid division by zero
                normalizedItem[indicator] =
                    max !== min ? ((value - min) / (max - min)) * 100 : 0;
            } else {
                // Handle unexpected non-numeric values
                normalizedItem[indicator] = 0;
            }
        });
        normalizedData.push(normalizedItem);
    });

    return normalizedData;
};

// CorrelationCard Component
const CorrelationCard = ({ correlation }) => {
    if (correlation === null || correlation === undefined) return null;

    return (
        <Card
            style={{
                backgroundColor: "#1d1d1f",
                color: "#e0e0e0",
                border: "1px solid #3a3a3b",
                borderRadius: "8px",
                marginBottom: "16px", // Adds spacing below the card
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Correlation
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                    {typeof correlation === 'number' ? correlation.toFixed(2) : "N/A"}
                </Typography>
            </CardContent>
        </Card>
    );
};

// LineChartComponent to visualize the data
const LineChartComponent = ({ country, yearRange, indicator1, indicator2, correlation }) => {
    const [yAxisMode, setYAxisMode] = useState('dual'); // 'dual' or 'single'

    const chartData = useMemo(
        () => getDataForCountry(country, yearRange, indicator1, indicator2),
        [country, yearRange, indicator1, indicator2]
    );

    const singleYData = useMemo(
        () => normalizeData(chartData, [indicator1, indicator2]),
        [chartData, indicator1, indicator2]
    );

    // Determine the data and y-axis configuration based on the current mode
    const isDual = yAxisMode === 'dual';

    return (
        <Box>
            {/* Optional Chart Title */}
            <Typography variant="h6" gutterBottom>
                {`${country}: ${indicator1} and ${indicator2} (${yearRange[0]} - ${yearRange[1]})`}
            </Typography>

            {/* Parent Container with Flex Layout */}
            <Box display="flex" flexDirection="row" alignItems="flex-start">
                {/* Buttons and Correlation Card Container */}
                <Box
                    display="flex"
                    flexDirection="column"
                    mr={4} // Margin right to separate buttons from the chart
                >
                    {/* Correlation Card */}
                    <CorrelationCard correlation={correlation} />

                    {/* ButtonGroup Container */}
                    <ButtonGroup
                        orientation="vertical"
                        variant="contained"
                        aria-label="y-axis toggle"
                        fullWidth
                    >
                        <Button
                            onClick={() => setYAxisMode('dual')}
                            disabled={isDual}
                            className="custom-button"
                            sx={{ mb: 1 }}
                        >
                            Dual Y-Axis
                        </Button>
                        <Button
                            onClick={() => setYAxisMode('single')}
                            disabled={!isDual}
                            className="custom-button"
                        >
                            Single Y-Axis
                        </Button>
                    </ButtonGroup>
                </Box>

                {/* Chart Container */}
                <Box sx={{ height: "400px", width: "100%" }}>
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={isDual ? chartData : singleYData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                {isDual ? (
                                    <>
                                        <YAxis
                                            yAxisId="left"
                                            label={{
                                                value: indicator1,
                                                angle: -90,
                                                position: 'insideLeft',
                                                offset: 10
                                            }}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            label={{
                                                value: indicator2,
                                                angle: 90,
                                                position: 'insideRight',
                                                offset: 10
                                            }}
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey={indicator1}
                                            stroke="#8884d8"
                                            connectNulls
                                        />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey={indicator2}
                                            stroke="#82ca9d"
                                            connectNulls
                                        />
                                    </>
                                ) : (
                                    <>
                                        <YAxis
                                            label={{
                                                value: 'Normalized Value (%)',
                                                angle: -90,
                                                position: 'insideLeft',
                                                offset: 0
                                            }}
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey={indicator1}
                                            stroke="#8884d8"
                                            connectNulls
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey={indicator2}
                                            stroke="#82ca9d"
                                            connectNulls
                                        />
                                    </>
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <Typography variant="body1">No data available for the specified range.</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default LineChartComponent;