// Digital Skills Radar Chart Component
// Compare digital literacy across nations

import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
// Sample data for Pacific Digital Skills visualization

const DigitalSkillsRadar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use sample data directly for immediate display
    const sampleData = [
      { category: 'Internet Usage', value: 68.5, fullMark: 100 },
      { category: 'Digital Literacy', value: 42.3, fullMark: 100 },
      { category: 'Computer Skills', value: 35.7, fullMark: 100 },
      { category: 'Mobile Usage', value: 85.2, fullMark: 100 },
      { category: 'Online Services', value: 51.8, fullMark: 100 }
    ];
    
    setData(sampleData);
    setLoading(false);
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

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Digital Skills Radar</h3>
      <div style={{ width: '100%', height: '420px' }}>
        <ResponsiveContainer width="100%" height={420}>
          <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis 
              dataKey="category" 
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fill: '#9CA3AF', fontSize: 8 }}
            />
            <Radar
              name="Pacific Average"
              dataKey="value"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Legend 
              wrapperStyle={{ color: '#9CA3AF' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DigitalSkillsRadar;