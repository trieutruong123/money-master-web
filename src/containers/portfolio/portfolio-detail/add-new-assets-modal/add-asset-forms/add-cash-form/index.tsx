import { useEffect, useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BuyCashForm } from './buy-cash-form';
import { NewCashAsset } from 'shared/types';
import { portfolioDetailStore, rootStore } from 'shared/store';

interface IProps {
  handleClose: any;
  openPreviousForm: any;
}

export const AddNewCashForm = observer(({ handleClose,openPreviousForm }: IProps) => {
  const theme = useTheme();

  useEffect(() => {
    const fetchAssetPrice = async () => {};
    fetchAssetPrice();
  }, []);

  const handleComeback = () => {
    openPreviousForm({ curFormType: 'transaction', selectedType: 'cash' });
  };

  const portfolioName = 'demo portoflio';

  const handleFormSubmit = async (data: NewCashAsset) => {
    const res = await portfolioDetailStore.addNewCash(data);
    if (res.isError) {
      rootStore.raiseError(res.data.en);
    } else {
      rootStore.raiseNotification(res.data.en, 'success');
    }
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
        <BuyCashForm handleFormSubmit={handleFormSubmit} />
      </Box>
    </div>
  );
});
