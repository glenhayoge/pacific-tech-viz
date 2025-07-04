// Cybersecurity vs Internet Penetration Scatter Plot
// See which countries are digitally prepared

import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// Sample data for Pacific Cybersecurity visualization

const CybersecurityScatterPlot = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use sample data directly for immediate display
    const sampleData = [
      { country: 'Fiji', internet: 64.2, security: 72.1 },
      { country: 'Samoa', internet: 51.8, security: 68.5 },
      { country: 'Tonga', internet: 43.7, security: 55.2 },
      { country: 'Vanuatu', internet: 38.9, security: 48.7 },
      { country: 'Cook Islands', internet: 79.3, security: 81.4 },
      { country: 'Palau', internet: 72.6, security: 74.9 },
      { country: 'Tuvalu', internet: 49.2, security: 52.8 },
      { country: 'Kiribati', internet: 35.4, security: 41.3 }
    ];
    
    setData(sampleData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">🔒 Cybersecurity vs Internet Penetration</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">🔒 Digital Readiness Comparison</h3>
      <div style={{ width: '100%', height: '260px' }}>
        <ResponsiveContainer width="100%" height={240}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              type="number" 
              dataKey="internet" 
              name="Internet Usage"
              stroke="#9CA3AF"
              fontSize={12}
              label={{ value: 'Internet Usage %', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              type="number" 
              dataKey="security" 
              name="Security Score"
              stroke="#9CA3AF"
              fontSize={12}
              label={{ value: 'Security Score', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              formatter={(value, name) => [
                `${value}${name === 'internet' ? '%' : ''}`,
                name === 'internet' ? 'Internet Usage' : 'Security Score'
              ]}
              labelFormatter={(label) => `Country: ${label}`}
            />
            <Scatter
              name="Pacific Countries"
              data={data}
              fill="#F59E0B"
              stroke="#F59E0B"
              strokeWidth={2}
              r={6}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CybersecurityScatterPlot;