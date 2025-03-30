import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const CustomSnackbar = ({
  open,
  onClose,
  message,
  severity,
  autoHideDuration = 3000,
  anchorOrigin = { vertical: 'top', horizontal: 'center' }
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert severity={severity} sx={{ width: '100%' }} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;