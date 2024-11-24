// Correlation.js

import data from '../data/countries_data_2008_2023.json';

/**
 * Compute the Pearson correlation coefficient between two indicators for a specific country
 * over a given range of years.
 *
 * @param {string} country - The name of the country.
 * @param {Array<number>} yearRange - An array with startYear and endYear.
 * @param {string} indicator1 - The first indicator to compare.
 * @param {string} indicator2 - The second indicator to compare.
 * @returns {number} - The correlation coefficient, or NaN if data is insufficient.
 */
const computeCorrelation = (country, yearRange, indicator1, indicator2) => {
  const [startYear, endYear] = yearRange;

  // Validate input and check if the country exists in the dataset
  if (!data || !data[country]) {
    console.warn(`Data for country "${country}" is not available.`);
    return NaN;
  }

  // Collect values for the specified indicators within the year range
  const values = [];
  for (let year = startYear; year <= endYear; year++) {
    const yearData = data[country]['Economic Data'][year];
    if (yearData) {
      const indicatorValue1 = yearData[indicator1];
      const indicatorValue2 = yearData[indicator2];

      if (isFinite(indicatorValue1) && isFinite(indicatorValue2)) {
        values.push([indicatorValue1, indicatorValue2]);
      }
    }
  }

  // Check if there are sufficient values for correlation calculation
  if (values.length === 0) {
    console.warn(
      `No valid data points for indicators "${indicator1}" and "${indicator2}" in the specified range.`
    );
    return NaN;
  }

  // Perform Pearson correlation coefficient calculation
  const n = values.length;
  const [sum1, sum2, sum1Sq, sum2Sq, pSum] = values.reduce(
    ([acc1, acc2, acc1Sq, acc2Sq, accPsum], [val1, val2]) => [
      acc1 + val1,
      acc2 + val2,
      acc1Sq + val1 ** 2,
      acc2Sq + val2 ** 2,
      accPsum + val1 * val2,
    ],
    [0, 0, 0, 0, 0]
  );

  const numerator = pSum - (sum1 * sum2) / n;
  const denominator = Math.sqrt(
    (sum1Sq - sum1 ** 2 / n) * (sum2Sq - sum2 ** 2 / n)
  );

  if (denominator === 0) {
    console.warn(
      'Denominator is zero, indicating no variation in one or both indicators.'
    );
    return 0;
  }

  return numerator / denominator;
};

export default computeCorrelation;
