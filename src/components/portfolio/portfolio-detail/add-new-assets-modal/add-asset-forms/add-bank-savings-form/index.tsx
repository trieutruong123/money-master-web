import { useEffect } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BuyBankSavingsForm } from './buy-bank-savings-form';
import { portfolioDetailStore } from 'shared/store';
import { NewBanksSavingAsset, UpdatedBankSavingItem } from 'shared/types';

interface IProps {
  handleClose: any;
  openPreviousForm: any;
}

export const AddNewBankSavingsForm = observer(
  ({ handleClose, openPreviousForm }: IProps) => {
    const theme = useTheme();

    useEffect(() => {
      const fetchAssetPrice = async () => {};
      fetchAssetPrice();
    }, []);

    const handleComeback = () => {
      openPreviousForm({
        curFormType: 'transaction',
        selectedType: 'bankSavings',
      });
    };

    const portfolioName = 'demo portoflio';

    const handleFormSubmit = async (data: NewBanksSavingAsset) => {
      portfolioDetailStore.addNewBankSaving(data);
      handleClose();
    };

    return (
      <div style={{ height: 'inherit' }}>
        <div style={{ marginTop: '1rem' }}>
          <h2
            id="modal-modal-title"
            style={{
              fontWeight: 700,
              fontSize: '2rem',
              lineHeight: 1.375,
              textAlign: 'center',
            }}
          >
            Transaction
          </h2>
          <IconButton
            sx={{ position: 'absolute', left: '2rem', top: '1rem' }}
            onClick={handleComeback}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div style={{ marginLeft: '3rem', marginTop: '1rem' }}>
          <p
            style={{
              marginTop: '0.4rem',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            {portfolioName}
          </p>
        </div>
        <Box
          sx={{
            [theme.breakpoints.down('sm')]: { height: '470px' },

            [theme.breakpoints.up('sm')]: {
              height: '550px',
            },
          }}
        >
          <BuyBankSavingsForm handleFormSubmit={handleFormSubmit} />
        </Box>
      </div>
    );
  },
);
