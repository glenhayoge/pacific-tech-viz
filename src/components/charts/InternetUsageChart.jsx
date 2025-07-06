// Internet Usage Over Time Chart Component
// Track internet adoption per country (2000–2024)

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { parseConnectivityData } from '../../data/dataUtils';

const InternetUsageChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/SPC_Tech_Connectivity_2025.csv');
        const csvText = await response.text();
        const parsed = parseConnectivityData(csvText);
        
        // Filter for internet usage indicator
        const internetData = parsed.filter(row => 
          row.indicator === 'Proportion of individuals using the Internet'
        );
        
        // Group by country and year, calculate average per year
        const groupedData = {};
        internetData.forEach(row => {
          const year = row.year;
          if (!groupedData[year]) {
            groupedData[year] = { year, countries: [], total: 0, count: 0 };
          }
          if (row.value > 0) {
            groupedData[year].countries.push({ country: row.country, value: row.value });
            groupedData[year].total += row.value;
            groupedData[year].count += 1;
          }
        });
        
        // Transform to chart format with country lines
        const yearData = Object.values(groupedData)
          .filter(item => item.count > 0)
          .map(item => ({
            year: item.year,
            average: (item.total / item.count).toFixed(1),
            ...item.countries.reduce((acc, country) => {
              acc[country.country] = country.value;
              return acc;
            }, {})
          }))
          .sort((a, b) => a.year - b.year);
        
        setData(yearData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Internet Usage Over Time</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-8 shadow-lg" style={{ marginTop: '100px', marginBottom: '100px' }}>
      <h3 className="text-2xl font-semibold mb-4">Internet Usage Over Time</h3>
      <div style={{ width: '100%', height: '420px' }}>
        <ResponsiveContainer width="100%" height={420}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="5 5" stroke="#374151" />
            <XAxis 
              dataKey="year" 
              stroke="#9CA3AF" 
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={12}
              label={{ value: 'Usage %', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="average" 
              stroke="#3B82F6" 
              strokeWidth={3}
              name="Pacific Average"
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
            {data.length > 0 && Object.keys(data[0])
              .filter(key => key !== 'year' && key !== 'average')
              .slice(0, 5)
              .map((country, index) => {
                const colors = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'];
                return (
                  <Line
                    key={country}
                    type="monotone"
                    dataKey={country}
                    stroke={colors[index]}
                    strokeWidth={2}
                    name={country}
                    dot={{ fill: colors[index], strokeWidth: 1, r: 3 }}
                    connectNulls={false}
                  />
                );
              })
            }
          </LineChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
};

export default InternetUsageChart;