import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import * as React from 'react';

export const SnackbarCloseButton = ({ snackbarKey }: any) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <CloseIcon sx={{ color: '#ffffff' }} />
    </IconButton>
  );
};

export default SnackbarCloseButton;
