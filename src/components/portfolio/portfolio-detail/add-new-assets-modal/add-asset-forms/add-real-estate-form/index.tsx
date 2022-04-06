import { useEffect, useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PerfrectScrollbar from 'react-perfect-scrollbar';
import { BuyRealEstateForm } from './buy-real-estate-form';
import {portfolioDetailStore} from 'store';

interface IProps {
  handleClose:any,
  openPreviousForm: any;
}

export const AddNewRealEstateForm = observer(({ handleClose,openPreviousForm }: IProps) => {
  const theme = useTheme();

  useEffect(() => {
    const fetchAssetPrice = async () => {};
    fetchAssetPrice();
  }, []);

  const handleComeback = () => {
    openPreviousForm({ curFormType: 'transaction',selectedType:'realEstate' });
  };

  const portfolioName = 'demo portoflio';

  const handleFormSubmit = async (data: any) => {
    portfolioDetailStore.addNewRealEstate(data);
    handleClose()
  };

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
        <BuyRealEstateForm handleFormSubmit={handleFormSubmit} />
      </Box>
    </Box>
  );
});
