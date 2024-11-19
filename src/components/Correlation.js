import data from '../data/countries_data_2008_2023.json';

const computeCorrelation = (country, yearRange, indicator1, indicator2) => {
  const [startYear, endYear] = yearRange;

  // Check if the specified country exists in the data
  if (!data[country]) return NaN;

  // Collect values for the indicators within the specified year range
  const values = [];
  for (let year = startYear; year <= endYear; year++) {
    if (data[country][year]) {
      const indicatorValue1 = data[country][year][indicator1];
      const indicatorValue2 = data[country][year][indicator2];

      if (!isNaN(indicatorValue1) && !isNaN(indicatorValue2)) {
        values.push([indicatorValue1, indicatorValue2]);
      }
    }
  }

  // Calculate the correlation coefficient
  if (values.length === 0) return NaN;

  const n = values.length;
  const [sum1, sum2, sum1Sq, sum2Sq, pSum] = values.reduce(
    ([acc1, acc2, acc1Sq, acc2Sq, accPsum], [val1, val2]) => [
      acc1 + val1,
      acc2 + val2,
      acc1Sq + val1 * val1,
      acc2Sq + val2 * val2,
      accPsum + val1 * val2,
    ],
    [0, 0, 0, 0, 0]
  );

  const numerator = pSum - (sum1 * sum2 / n);
  const denominator = Math.sqrt((sum1Sq - (sum1 * sum1 / n)) * (sum2Sq - (sum2 * sum2 / n)));

  return denominator === 0 ? 0 : numerator / denominator;
};

export default computeCorrelation;