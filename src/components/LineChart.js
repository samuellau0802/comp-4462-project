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
import * as d3 from 'd3';

const getDataForCountry = (country, yearRange, indicator1, indicator2) => {
    const [startYear, endYear] = yearRange;
    const chartData = [];

    if (!data[country]) {
        return chartData;
    }

    for (let year = startYear; year <= endYear; year++) {
        if (data[country][year]) {
            const indicatorValue1 = parseFloat(data[country][year][indicator1]);
            const indicatorValue2 = parseFloat(data[country][year][indicator2]);

            if (!isNaN(indicatorValue1) && !isNaN(indicatorValue2)) {
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

const normalizeData = (chartData, indicators) => {
    const normalizedData = [];
    const minMax = {};

    indicators.forEach(indicator => {
        const values = chartData
            .map(item => item[indicator])
            .filter(value => typeof value === 'number' && !isNaN(value));
        minMax[indicator] = {
            min: Math.min(...values),
            max: Math.max(...values)
        };
    });

    chartData.forEach(item => {
        const normalizedItem = { year: item.year };
        indicators.forEach(indicator => {
            const { min, max } = minMax[indicator];
            const value = item[indicator];

            if (typeof value === 'number' && !isNaN(value)) {
                normalizedItem[indicator] =
                    max !== min ? ((value - min) / (max - min)) * 100 : 0;
            } else {
                normalizedItem[indicator] = 0;
            }
        });
        normalizedData.push(normalizedItem);
    });

    return normalizedData;
};

const formatNumber = (num) => {
    const absNum = Math.abs(num);
    let formattedNumber;

    if (absNum >= 1e9) {
        formattedNumber = (absNum / 1e9).toFixed(1) + 'B';
    } else if (absNum >= 1e6) {
        formattedNumber = (absNum / 1e6).toFixed(1) + 'M';
    } else if (absNum >= 1e3) {
        formattedNumber = (absNum / 1e3).toFixed(1) + 'K';
    } else {
        formattedNumber = absNum.toString();
    }

    return num < 0 ? '-' + formattedNumber : formattedNumber;
};

const getCorrelationColor = (correlation) => {
    if (correlation === null || correlation === undefined) return "#1d1d1f";
    const colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain([-1, 1]);
    return colorScale(correlation);
};

const CorrelationCard = ({ correlation }) => {
    if (correlation === null || correlation === undefined) return null;

    const backgroundColor = getCorrelationColor(correlation);
    const textColor = (correlation > 0.5 || correlation < -0.5) ? "#ffffff" : "#000000";

    return (
        <Card
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
                border: "1px solid #3a3a3b",
                borderRadius: "8px",
                marginBottom: "16px",
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

const LineChartComponent = ({ country, yearRange, indicator1, indicator2, correlation }) => {
    const [yAxisMode, setYAxisMode] = useState('dual');

    const chartData = useMemo(
        () => getDataForCountry(country, yearRange, indicator1, indicator2),
        [country, yearRange, indicator1, indicator2]
    );

    const singleYData = useMemo(
        () => normalizeData(chartData, [indicator1, indicator2]),
        [chartData, indicator1, indicator2]
    );

    const isDual = yAxisMode === 'dual';

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                {`${country}: ${indicator1} and ${indicator2} (${yearRange[0]} - ${yearRange[1]})`}
            </Typography>

            <Box display="flex" flexDirection="row" alignItems="flex-start">
                <Box display="flex" flexDirection="column" mr={4}>
                    <CorrelationCard correlation={correlation} />

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

                <Box sx={{ height: "400px", width: "100%" }}>
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={isDual ? chartData : singleYData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="year"
                                    interval="preserveStartEnd"
                                    label={{fontSize: 12}}
                                    tick={{ fontSize: 12 }}
                                    />
                                {isDual ? (
                                    <>
                                        <YAxis
                                            yAxisId="left"
                                            label={{
                                                value: indicator1,
                                                angle: -90,
                                                position: 'insideLeft',
                                                offset: 10,
                                                fontSize: 13,
                                                fill: "#8884d8" // Line color for indicator1
                                            }}
                                            interval="preserveStartEnd"
                                            tick={{ fontSize: 13, fill: "#8884d8" }} // Line color for indicator1
                                            tickFormatter={formatNumber}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            label={{
                                                value: indicator2,
                                                angle: 90,
                                                position: 'insideRight',
                                                offset: 0,
                                                fontSize: 13,
                                                fill: "#82ca9d" // Line color for indicator2
                                            }}
                                            interval="preserveStartEnd"
                                            tick={{ fontSize: 13, fill: "#82ca9d" }} // Line color for indicator2
                                            tickFormatter={formatNumber}
                                        />
                                        <Tooltip formatter={formatNumber} />
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
                                                offset: 0,
                                                fontSize: 14
                                            }}
                                            interval="preserveStartEnd"
                                            tick={{ fontSize: 14 }}
                                            tickFormatter={formatNumber}
                                        />
                                        <Tooltip formatter={formatNumber} />
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