import { useEffect } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Scrollbars } from 'react-custom-scrollbars';
import { NewCryptoCurrencyAsset } from 'shared/types';
import { portfolioDetailStore } from 'shared/store';
import { BuyCryptoForm } from './buy-cryto-form';

interface IProps {
  openPreviousForm: any;
  handleClose: any;
}

export const AddNewCryptoForm = observer(
  ({ openPreviousForm, handleClose }: IProps) => {
    const theme = useTheme();

    useEffect(() => {
      const fetchAssetPrice = async () => {};
      fetchAssetPrice();
    }, []);

    const handleComeback = () => {
      openPreviousForm({
        curFormType: 'transaction',
        selectedType: 'cryptoCurrency',
      });
    };

    const portfolioName = 'demo portoflio';
    const assetName = 'Ethereum';

    const handleFormSubmit = async (data: NewCryptoCurrencyAsset) => {
      //portfolioDetailStore.addNewCryptoCurrency(data);
      handleClose();
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
          <Typography
            variant="body1"
            sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
          >
            {assetName}
          </Typography>
        </Box>
        <Box
          sx={{
            [theme.breakpoints.down('sm')]: { height: '450px' },

            [theme.breakpoints.up('sm')]: {
              height: '530px',
            },
          }}
        >
          <BuyCryptoForm handleFormSubmit={handleFormSubmit} />
        </Box>
      </Box>
    );
  },
);
