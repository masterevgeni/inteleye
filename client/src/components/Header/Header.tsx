import {AppBar, Box, Toolbar, Typography} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Polling Inteleye <MusicNoteIcon sx={{ mr: 2 }} /> Music Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
