import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  bitcoin: {
    usd: number;
  };
}

interface DataPoint {
  name: string;
  bitcoint: number;
}

interface ChartProps {
  chartData: ChartData;
}

const Chart: React.FC<ChartProps> = ({ chartData }) => {
  const [data, setData] = useState<DataPoint[]>([]);

  console.log('chartData: ', chartData);

  useEffect(() => {
    console.log('Chart component mounted or chartData changed');
    
    if (chartData?.bitcoin?.usd) {
      const now = new Date();
      const timeString = `${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      const newDataPoint: DataPoint = {
        name: timeString,
        bitcoint: chartData.bitcoin.usd,
      };

      setData(prevData => {
        // Keep only the last 20 data points to prevent infinite growth
        const updatedData = [...prevData, newDataPoint];
        console.log('updatedData: ', updatedData);
         if (updatedData.length >= 5) {
          return updatedData.slice(1);
        }
        
        return updatedData.slice(-20);
      });
    }
  }, [chartData]);

  console.log('chart data: ', data);

  // Don't render if no data
  if (data.length === 0) {
    return <div>Loading chart data...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="bitcoint" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;