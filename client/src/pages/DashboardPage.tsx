import * as React from 'react';
import { Box, Grid, CircularProgress, Alert, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useMusicStats } from './../hooks/useMusicStats';
import { usePlaySong } from './../hooks/usePlayNewSong';
import KpiCard from './../components/Cards/KpiCard';
import NowPlaying from './../components/NowPlaying';
import SnackbarMessage from './../components/SnackBar/SnackBar'
import { GenreDistributionChart } from '../components/Charts/GenreDistributionChart';
import { TopArtistsChart } from '../components/Charts/TopArtistsChart';
import { MusicByDecadeChart } from '../components/Charts/MusicByDecadeChart';
import MusicTable from './../components/SongTable/SongTable'


const DashboardPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const { data, isLoading, isError, error } = useMusicStats();

  const playSong = usePlaySong;

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={3}>
        <Alert severity="error">
          Failed to load dashboard data: {error.message}
        </Alert>
      </Box>
    );
  }

  const formatDuration = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.round(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} >
          <Grid size={12}>
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              onClick={() => playSong()}
            >
              Play Random Song
            </Button>
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <NowPlaying song={data?.nowPlaying ?? null} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, lg: 3, }}>
            <KpiCard title="Total Songs" value={data?.kpis.totalSongs ?? 0} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, lg: 3, }}>
            <KpiCard title="Unique Artists" value={data?.kpis.totalUniqueArtists ?? 0} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, lg: 3, }}>
            <KpiCard title="Avg. Length" value={formatDuration(data?.kpis.avgDuration ?? 0)} />
          </Grid>
          <Grid size={12}>
            <MusicTable />
          </Grid>
          {/* Charts */}
          <Grid size={12}>
            <GenreDistributionChart data={data?.genreDistribution ?? []} />
          </Grid>
          <Grid size={12}>
            <MusicByDecadeChart data={data?.songsByDecade ?? []} />
          </Grid>
          <Grid size={12}>
            <TopArtistsChart data={data?.topArtists ?? []} />
          </Grid>
        </Grid>
      </Box>
      <SnackbarMessage isOpen={open} />
    </Box>
  );
};

export default DashboardPage;