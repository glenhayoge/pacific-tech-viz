// Internet Usage Over Time Chart Component
// Track internet adoption per country (2000–2024)

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// Sample data for Pacific Internet Usage visualization

const InternetUsageChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sample data representing Pacific Island internet usage trends
    const sampleData = [
      { year: 2015, average: 25.5 },
      { year: 2016, average: 32.1 },
      { year: 2017, average: 38.7 },
      { year: 2018, average: 45.2 },
      { year: 2019, average: 52.8 },
      { year: 2020, average: 58.3 },
      { year: 2021, average: 65.1 },
      { year: 2022, average: 71.4 },
      { year: 2023, average: 76.9 }
    ];
    
    setData(sampleData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">📈 Internet Usage Over Time</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">📈 Internet Usage Over Time</h3>
      <div style={{ width: '100%', height: '260px' }}>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
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
              strokeWidth={2}
              name="Pacific Average"
              dot={{ fill: '#3B82F6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
};

export default InternetUsageChart;