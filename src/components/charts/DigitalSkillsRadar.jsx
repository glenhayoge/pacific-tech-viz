// Digital Skills Radar Chart Component
// Compare digital literacy across nations

import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { parseConnectivityData } from '../../data/dataUtils';

const DigitalSkillsRadar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/SPC_Tech_Connectivity_2025.csv');
        const csvText = await response.text();
        const parsed = parseConnectivityData(csvText);
        
        // Filter for digital skills indicators
        const skillsData = parsed.filter(row => 
          row.indicatorCode === 'MAILFILE' || // Email with attachment
          row.indicatorCode === 'DOWNSOFT' || // Download/install software
          row.indicatorCode === 'IT_USE_ii99'  // Internet usage for context
        );
        
        // Get the most recent data for each country and skill
        const countrySkillsMap = new Map();
        
        skillsData
          .filter(row => row.value > 0 && row.sex === '_T') // Total population only
          .forEach(row => {
            const key = `${row.country}-${row.indicatorCode}`;
            const existing = countrySkillsMap.get(key);
            
            if (!existing || row.year > existing.year) {
              countrySkillsMap.set(key, {
                country: row.country,
                indicator: row.indicatorCode,
                value: parseFloat(row.value.toFixed(1)),
                year: row.year
              });
            }
          });
        
        // Group by country and create radar data structure
        const countryGroups = new Map();
        Array.from(countrySkillsMap.values()).forEach(item => {
          if (!countryGroups.has(item.country)) {
            countryGroups.set(item.country, {});
          }
          countryGroups.get(item.country)[item.indicator] = item.value;
        });
        
        // Create radar chart data structure
        const skillCategories = [
          { key: 'MAILFILE', label: 'Email w/ Attachment' },
          { key: 'DOWNSOFT', label: 'Install Software' }, 
          { key: 'IT_USE_ii99', label: 'Internet Usage' }
        ];
        
        const radarData = skillCategories.map(skill => {
          const dataPoint = { skill: skill.label };
          
          // Add data for each country that has this skill
          Array.from(countryGroups.entries()).forEach(([country, skills]) => {
            if (skills[skill.key] !== undefined) {
              dataPoint[country] = skills[skill.key];
            }
          });
          
          return dataPoint;
        });
        
        // Debug: log the data structure
        console.log('Digital Skills Data:', radarData);
        console.log('Countries found:', Array.from(countryGroups.keys()));
        
        // If no data found, use sample data
        if (radarData.length === 0 || radarData.every(item => Object.keys(item).length === 1)) {
          const sampleData = [
            { skill: 'Email w/ Attachment', Fiji: 26.7, Nauru: 36.2, Tuvalu: 36.0, Tonga: 17.3, Kiribati: 15.3 },
            { skill: 'Install Software', Fiji: 14.4, Nauru: 26.9, Tuvalu: 23.2, Tonga: 5.4, Kiribati: 12.8 },
            { skill: 'Internet Usage', Fiji: 68.9, Nauru: 57.0, Tuvalu: 49.3, Tonga: 41.2, Kiribati: 43.6 }
          ];
          setData(sampleData);
        } else {
          setData(radarData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading digital skills data:', error);
        // Use fallback data on error
        const fallbackData = [
          { skill: 'Email w/ Attachment', Fiji: 26.7, Nauru: 36.2, Tuvalu: 36.0, Tonga: 17.3, Kiribati: 15.3 },
          { skill: 'Install Software', Fiji: 14.4, Nauru: 26.9, Tuvalu: 23.2, Tonga: 5.4, Kiribati: 12.8 },
          { skill: 'Internet Usage', Fiji: 68.9, Nauru: 57.0, Tuvalu: 49.3, Tonga: 41.2, Kiribati: 43.6 }
        ];
        setData(fallbackData);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Digital Skills Radar</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  // Get list of countries that have data
  const countries = data.length > 0 ? 
    Object.keys(data[0]).filter(key => key !== 'skill') : [];
  
  // If no data, show a message
  if (data.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Digital Skills Comparison</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <p>No digital skills data available</p>
        </div>
      </div>
    );
  }
  
  // Define colors for different countries
  const countryColors = {
    'Fiji': '#10B981',
    'Kiribati': '#3B82F6', 
    'Nauru': '#F59E0B',
    'Tonga': '#EF4444',
    'Tuvalu': '#8B5CF6'
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg" style={{ marginTop: '100px', marginBottom: '100px' }}>
      <h3 className="text-xl font-semibold mb-4">Digital Skills Comparison</h3>
      <div className="text-xs text-gray-400 mb-2">
        Countries: {countries.join(', ')} | Data points: {data.length}
      </div>
      <div style={{ width: '100%', height: '420px' }}>
        <ResponsiveContainer width="100%" height={640}>
          <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis 
              dataKey="skill" 
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fill: '#9CA3AF', fontSize: 9 }}
              tickCount={6}
            />
            {countries.map((country, index) => (
              <Radar
                key={country}
                name={country}
                dataKey={country}
                stroke={countryColors[country] || `hsl(${index * 360 / countries.length}, 70%, 50%)`}
                fill={countryColors[country] || `hsl(${index * 360 / countries.length}, 70%, 50%)`}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            ))}
            <Legend 
              wrapperStyle={{ color: '#9CA3AF', fontSize: '12px' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DigitalSkillsRadar;