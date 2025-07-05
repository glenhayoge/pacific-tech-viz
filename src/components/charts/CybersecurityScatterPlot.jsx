// Cybersecurity vs Internet Penetration Scatter Plot
// See which countries are digitally prepared

import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { parseConnectivityData } from '../../data/dataUtils';

const CybersecurityScatterPlot = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load CSV data
        const response = await fetch('/data/SPC_Tech_Connectivity_2025.csv');
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        
        const csvText = await response.text();
        const parsedData = parseConnectivityData(csvText);
        
        // Filter for Internet Usage, Cybersecurity, and Broadband data
        const internetData = parsedData.filter(row => 
          row.indicatorCode === 'IT_USE_ii99' && 
          row.sex === 'Total' && 
          row.age === 'All ages' && 
          row.urbanization === 'National' &&
          row.value > 0
        );
        
        const cybersecurityData = parsedData.filter(row => 
          row.indicatorCode === 'NCSI_RANK' && 
          row.value > 0
        );
        
        const broadbandData = parsedData.filter(row => 
          row.indicatorCode === 'IT_NET_BBND' && 
          row.value > 0
        );
        
        // Get latest year data for each country
        const getLatestData = (data) => {
          const countryData = {};
          data.forEach(row => {
            if (!countryData[row.country] || row.year > countryData[row.country].year) {
              countryData[row.country] = row;
            }
          });
          return countryData;
        };
        
        const latestInternetData = getLatestData(internetData);
        const latestCybersecurityData = getLatestData(cybersecurityData);
        const latestBroadbandData = getLatestData(broadbandData);
        
        // Combine data by country
        const scatterData = [];
        Object.keys(latestInternetData).forEach(country => {
          const internetRecord = latestInternetData[country];
          const cybersecurityRecord = latestCybersecurityData[country];
          const broadbandRecord = latestBroadbandData[country];
          
          if (internetRecord && cybersecurityRecord) {
            // Convert cybersecurity rank to score (lower rank = higher score)
            const securityScore = 100 - cybersecurityRecord.value;
            
            // Use broadband penetration for circle size (scale between 4-12)
            const broadbandValue = broadbandRecord ? broadbandRecord.value : 0;
            const circleSize = Math.min(Math.max(4, 4 + (broadbandValue * 0.2)), 12);
            
            scatterData.push({
              country: country,
              internet: internetRecord.value,
              security: securityScore,
              internetYear: internetRecord.year,
              securityYear: cybersecurityRecord.year,
              broadband: broadbandValue,
              r: circleSize
            });
          }
        });
        
        setData(scatterData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Cybersecurity vs Internet Penetration</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Cybersecurity vs Internet Penetration</h3>
        <div className="h-64 flex items-center justify-center text-red-400">
          <p>Error loading data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg" style={{ marginTop: '100px', marginBottom: '100px' }}>
      <h3 className="text-xl font-semibold mb-4">Digital Readiness Comparison</h3>
      <div className="mb-2 text-sm text-gray-400">
        Cybersecurity Readiness vs Internet Usage (Latest available data)
      </div>
      <div style={{ width: '100%', height: '420px' }}>
        <ResponsiveContainer width="100%" height={420}>
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
              label={{ value: 'Cybersecurity Score', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              formatter={(value, name) => {
                if (name === 'internet') {
                  return [`${value.toFixed(1)}%`, 'Internet Usage'];
                } else if (name === 'security') {
                  return [`${value.toFixed(1)}`, 'Cybersecurity Score'];
                }
                return [value, name];
              }}
              labelFormatter={(label, payload) => {
                if (payload && payload.length > 0) {
                  const data = payload[0].payload;
                  return `${data.country} (Internet: ${data.internetYear}, Security: ${data.securityYear}, Broadband: ${data.broadband.toFixed(1)})`;
                }
                return label;
              }}
            />
            <Scatter
              name="Pacific Countries"
              data={data}
              fill="#F59E0B"
              stroke="#F59E0B"
              strokeWidth={2}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CybersecurityScatterPlot;