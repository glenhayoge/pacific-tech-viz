// Data processing utilities for Pacific connectivity data
import Papa from 'papaparse';

// Parse CSV data and filter for specific indicators
export const parseConnectivityData = (csvData) => {
  const parsed = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim()
  });
  
  // Transform the data to a more usable format
  return parsed.data.map(row => ({
    country: row['Pacific Island Countries and territories'],
    countryCode: row['GEO_PICT'],
    indicator: row['Indicator'],
    indicatorCode: row['INDICATOR'],
    year: parseInt(row['TIME_PERIOD']),
    value: parseFloat(row['OBS_VALUE']) || 0,
    unit: row['Unit of measure'],
    sex: row['Sex'],
    age: row['Age'],
    urbanization: row['Urbanization'],
    education: row['Education level'],
    dataSource: row['Data source'],
    comment: row['Comment']
  })).filter(row => row.country && row.indicator && row.year >= 1990);
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