import { useEffect } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NewStockAsset } from 'shared/types';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { BuyStockForm } from './buy-stock-form';

interface IProps {
  stockId: string;
  handleClose: any;
  openPreviousForm: any;
  selectedStock: { id: string; name: string; symbol: string };
  content: any;
}

export const AddNewStockForm = observer(
  ({
    stockId,
    handleClose,
    openPreviousForm,
    selectedStock,
    content,
  }: IProps) => {
    const theme = useTheme();

    useEffect(() => {
      const fetchAssetPrice = async () => {
        portfolioDetailStore.getStockInfoById(stockId.toUpperCase());
      };
      fetchAssetPrice();
    }, []);

    const handleComeback = () => {
      openPreviousForm({ curFormType: 'transaction', selectedType: 'stocks' });
    };

    const portfolioName = 'Portoflio';
    const assetName = selectedStock.name.toUpperCase();
    const currenPrice = portfolioDetailStore.searchedStockDetail?.c;

    const handleFormSubmit = async (data: NewStockAsset) => {
      const res: any = await portfolioDetailStore.addNewStock(data);
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
            {content.title}
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
            {assetName}: ${currenPrice}
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
          <BuyStockForm
            content={content}
            handleFormSubmit={handleFormSubmit}
            selectedStock={selectedStock}
          />
        </Box>
      </div>
    );
  },
);
