import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackbarMessage({isOpen}: {isOpen?: boolean}) {
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (
//     event?: React.SyntheticEvent | Event,
//     reason?: SnackbarCloseReason,
//   ) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };

  return (
    <React.Fragment>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      {/* <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}> */}
      <Snackbar open={isOpen} autoHideDuration={6000} >
        <Alert
        //   onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
