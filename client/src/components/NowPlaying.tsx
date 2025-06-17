import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { NowPlayingProps } from '../types';

const NowPlaying = ({ song }: NowPlayingProps) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          Now Playing
        </Typography>
        {song ? (
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: 'secondary.main', width: 60, height: 60, mr: 2 }}>
              <MusicNoteIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h6" component="div">
                {song.title}
              </Typography>
              <Typography color="text.secondary">{song.artist}</Typography>
              <Typography color="text.secondary" variant="body2">
                {song.album} ({song.releaseYear})
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography color="text.secondary">No song is currently playing.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default NowPlaying;