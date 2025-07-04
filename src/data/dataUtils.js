// Data processing utilities for Pacific connectivity data

// Parse CSV data and filter for specific indicators
export const parseConnectivityData = (csvData) => {
  // TODO: Implement CSV parsing with papaparse
  return csvData;
};

// Filter data by country
export const filterByCountry = (data, countries) => {
  return data.filter(row => countries.includes(row.country));
};

// Filter data by time period
export const filterByTimeRange = (data, startYear, endYear) => {
  return data.filter(row => {
    const year = parseInt(row.year);
    return year >= startYear && year <= endYear;
  });
};

// Get unique countries from dataset
export const getUniqueCountries = (data) => {
  return [...new Set(data.map(row => row.country))];
};

// Get unique indicators from dataset
export const getUniqueIndicators = (data) => {
  return [...new Set(data.map(row => row.indicator))];
};

// Transform data for different chart types
export const transformForLineChart = (data, xField, yField) => {
  return data.map(row => ({
    [xField]: row[xField],
    [yField]: parseFloat(row[yField]) || 0
  }));
};

export const transformForBarChart = (data, labelField, valueField) => {
  return data.map(row => ({
    label: row[labelField],
    value: parseFloat(row[valueField]) || 0
  }));
};

export const transformForRadarChart = (data, categories) => {
  return categories.map(category => ({
    category,
    value: data[category] || 0
  }));
};