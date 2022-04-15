import { useEffect } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NewStockAsset } from 'shared/types';
import { portfolioDetailStore } from 'shared/store';
import { BuyStockForm } from './buy-stock-form';

interface IProps {
  handleClose: any;
  openPreviousForm: any;
}

export const AddNewStockForm = observer(({handleClose, openPreviousForm }: IProps) => {
  const theme = useTheme();

  useEffect(() => {
    const fetchAssetPrice = async () => {};
    fetchAssetPrice();
  }, []);

  const handleComeback = () => {
    openPreviousForm({ curFormType: 'transaction', selectedType: 'stocks' });
  };

  const portfolioName = 'demo portoflio';
  const assetName = 'Ethereum';

  const handleFormSubmit = async (data: NewStockAsset) => {
    //portfolioDetailStore.addNewStock(data);
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
        <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
          {assetName}
        </p>
      </div>
      <Box
        sx={{
          [theme.breakpoints.down('sm')]: { height: '450px' },

          [theme.breakpoints.up('sm')]: {
            height: '530px',
          },
        }}
      >
        <BuyStockForm handleFormSubmit={handleFormSubmit} />
      </Box>
    </div>
  );
});
