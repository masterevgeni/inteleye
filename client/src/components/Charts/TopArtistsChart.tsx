import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPointProps } from '../../types';

export const TopArtistsChart = ({ data }: { data: ChartDataPointProps[] }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Top 5 Artists</Typography>
        <Box sx={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" width={120}/>
              <Tooltip />
              <Legend />
              <Bar dataKey="songs" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};