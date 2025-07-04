// 4G Coverage Snapshot Chart Component
// Rank countries by mobile network access

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// Sample data for Pacific Mobile Coverage visualization

const FourGCoverageChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use sample data directly for immediate display
    const sampleData = [
      { country: 'Fiji', coverage: 95.2 },
      { country: 'Samoa', coverage: 89.7 },
      { country: 'Cook Islands', coverage: 92.3 },
      { country: 'Palau', coverage: 90.8 },
      { country: 'Tonga', coverage: 87.1 },
      { country: 'Vanuatu', coverage: 83.5 },
      { country: 'Tuvalu', coverage: 78.9 },
      { country: 'Kiribati', coverage: 65.4 }
    ];
    
    setData(sampleData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">📊 4G Coverage Snapshot</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">📊 Mobile Network Coverage</h3>
      <div style={{ width: '100%', height: '260px' }}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="country" 
              stroke="#9CA3AF" 
              fontSize={10}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={12}
              label={{ value: 'Coverage %', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              formatter={(value) => [`${value}%`, 'Coverage']}
            />
            <Bar 
              dataKey="coverage" 
              fill="#10B981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FourGCoverageChart;