import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PerfrectScrollbar from 'react-perfect-scrollbar';
import { BuyCashForm } from './buy-cash-form';

interface IProps {
  openPreviousForm: any;
}

export const AddNewCashForm = observer(({ openPreviousForm }: IProps) => {
  const theme = useTheme();

  useEffect(() => {
    const fetchAssetPrice = async () => {};
    fetchAssetPrice();
  }, []);

  const handleComeback = () => {
    openPreviousForm({ curFormType: 'transaction',selectedType:'cash' });
  };

  const portfolioName = 'demo portoflio';

  const handleFormSubmit = async (data: any) => {};

  return (
    <Box sx={{ height: 'inherit' }}>
      <Box sx={{ mt: '1rem' }}>
        <Typography align="center" id="modal-modal-title" variant="h4">
          Transaction
        </Typography>
        <IconButton
          sx={{ position: 'absolute', left: '2rem', top: '1rem' }}
          onClick={handleComeback}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box sx={{ ml: '3rem', mt: '1rem' }}>
        <Typography
          variant="body1"
          sx={{
            mt: '0.4rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {portfolioName}
        </Typography>
      </Box>
      <Box
        sx={{
          [theme.breakpoints.down('sm')]: { height: '470px' },

          [theme.breakpoints.up('sm')]: {
            height: '550px',
          },
        }}
      >
        <BuyCashForm handleFormSubmit={handleFormSubmit} />
      </Box>
    </Box>
  );
});
