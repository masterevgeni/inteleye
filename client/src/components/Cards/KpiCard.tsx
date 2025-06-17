import { Card, CardContent, Typography } from '@mui/material';

interface KpiCardProps {
  title: string;
  value: string | number;
}

const KpiCard = ({ title, value }: KpiCardProps) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" component="div">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default KpiCard;