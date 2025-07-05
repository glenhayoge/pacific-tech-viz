// 4G Coverage Snapshot Chart Component
// Rank countries by mobile network access

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { parseConnectivityData } from '../../data/dataUtils';

const FourGCoverageChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/SPC_Tech_Connectivity_2025.csv');
        const csvText = await response.text();
        const parsed = parseConnectivityData(csvText);
        
        // Filter for 4G coverage indicator
        const fourGData = parsed.filter(row => 
          row.indicator.includes('4G mobile') || 
          row.indicatorCode === 'IT_MOB_4GNTWK'
        );
        
        // Get the most recent data for each country
        const countryDataMap = new Map();
        
        fourGData
          .filter(row => row.value > 0)
          .forEach(row => {
            const country = row.country;
            const existingData = countryDataMap.get(country);
            
            // Keep the most recent year's data for each country
            if (!existingData || row.year > existingData.year) {
              countryDataMap.set(country, {
                country: row.country,
                coverage: parseFloat(row.value.toFixed(1)),
                year: row.year
              });
            }
          });
        
        // Convert to array and sort by coverage descending
        const latestData = Array.from(countryDataMap.values())
          .sort((a, b) => b.coverage - a.coverage);
        
        setData(latestData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading 4G coverage data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">4G Coverage by Country (Most Recent Data)</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">4G Coverage by Country (Most Recent Data)</h3>
      <div style={{ width: '100%', height: '500px' }}>
        <ResponsiveContainer width="100%" height={480}>
          <BarChart 
            data={data} 
            layout="vertical"
            margin={{ top: 20, right: 50, left: 80, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              type="number"
              domain={[0, 100]}
              stroke="#9CA3AF" 
              fontSize={12}
              label={{ value: 'Coverage %', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              type="category"
              dataKey="country" 
              stroke="#9CA3AF" 
              fontSize={11}
              width={80}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              formatter={(value, name, props) => [
                `${value}%`, 
                '4G Coverage',
                { color: '#10B981' }
              ]}
              labelFormatter={(label, payload) => {
                const year = payload && payload[0] ? payload[0].payload.year : '';
                return `${label} ${year ? `(${year})` : ''}`;
              }}
            />
            <Bar 
              dataKey="coverage" 
              radius={[0, 4, 4, 0]}
            >
              {data.map((entry, index) => {
                const colors = ['#10B981', '#059669', '#047857', '#065f46', '#064e3b'];
                const colorIndex = Math.min(index, colors.length - 1);
                return <Cell key={`cell-${index}`} fill={colors[colorIndex]} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FourGCoverageChart;