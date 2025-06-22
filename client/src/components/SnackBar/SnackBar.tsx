import * as React from 'react';
import {Snackbar, Alert} from '@mui/material';

export default function SnackbarMessage({isOpen}: {isOpen?: boolean}, setOpen: (open: boolean) => void) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Snackbar open={isOpen} autoHideDuration={4000} >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
          //  onClose={handleClose}
        >
          New Song was played!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
