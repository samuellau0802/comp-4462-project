import React, { useMemo } from 'react';
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
            const indicatorValue1 = data[country][year][indicator1];
            const indicatorValue2 = data[country][year][indicator2];

            if (indicatorValue1 !== undefined && indicatorValue2 !== undefined) {
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

// LineChartComponent to visualize the data
const LineChartComponent = ({ country, yearRange, indicator1, indicator2 }) => {
    const chartData = useMemo(() => getDataForCountry(country, yearRange, indicator1, indicator2), [country, yearRange, indicator1, indicator2]);

    return (
        <div>
            <h3>{`Line Chart for ${country}: ${indicator1} and ${indicator2} (${yearRange[0]} - ${yearRange[1]})`}</h3>
            <div style={{ height: "400px", width: "100%" }}>
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData}>
                            <CartesianGrid />
                            <XAxis dataKey="year" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line connectNulls yAxisId="left" type="monotone" dataKey={indicator1} stroke="#8884d8" />
                            <Line connectNulls yAxisId="right" type="monotone" dataKey={indicator2} stroke='#82ca9d' />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p>No data available for the specified range.</p>
                )}
            </div>
        </div>
    );
};

export default LineChartComponent;