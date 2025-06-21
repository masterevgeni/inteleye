import * as React from 'react';
import {Snackbar, Alert} from '@mui/material';

export default function SnackbarMessage({isOpen}: {isOpen?: boolean}) {
  return (
    <React.Fragment>
      <Snackbar open={isOpen} autoHideDuration={6000} >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          New Song was played!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
