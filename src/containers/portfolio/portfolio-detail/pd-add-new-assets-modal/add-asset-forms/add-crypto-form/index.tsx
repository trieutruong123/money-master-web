import { useEffect, useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NewCryptoCurrencyAsset } from 'shared/types';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { AssetTypeName, TransactionFormType } from 'shared/constants';
import { BuyCryptoForm } from './buy-cryto-form';

interface IProps {
  openPreviousForm: Function;
  handleClose: () => void;
  content: any;
}

export const AddNewCryptoForm = observer(
  ({
    openPreviousForm,
    handleClose,
    content,
  }: IProps) => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const theme = useTheme();
    const selectedAsset = portfolioDetailStore.selectedAsset;
    useEffect(() => {
      const fetchAssetPrice = async () => {
        portfolioDetailStore.getCryptoInfoById(selectedAsset?.cryptoCoinCode?.toLowerCase() || '');
      };
      fetchAssetPrice();
    }, []);

    const handleComeback = () => {
      portfolioDetailStore.setAddedAssetInfo({ ...selectedAsset, formType: TransactionFormType.transaction, assetType: AssetTypeName.cryptoCurrency });
      openPreviousForm();
    };

    const portfolioName = portfolioDetailStore.portfolioInfo?.name || '';
    const assetName = selectedAsset?.cryptoInfo?.name.toUpperCase() || '';
    const currentPrice = portfolioDetailStore.searchedCryptoDetail?.usd;

    const handleFormSubmit = async (data: NewCryptoCurrencyAsset) => {
      const res = await portfolioDetailStore.addNewCryptoCurrency(data);
      if (res.isError) {
        if (data.isUsingInvestFund || data.isUsingCash) {
          setErrorMessage(res.data);
        } else {
          rootStore.raiseError(res?.data.en);
          handleClose();
        }
      } else {
        rootStore.raiseNotification(res.data.en, 'success');
        if (data.isUsingInvestFund) {
          portfolioDetailStore.setUpdateInvestFund(true);
        } else if (data.isUsingCash) {
          portfolioDetailStore.setUpdateCashDetail(true);
        }
        portfolioDetailStore.setUpdateReport(true);
        handleClose();
      }
    };

    return (
      <Box sx={{ height: 'inherit' }}>
        <Box sx={{ mt: '1rem' }}>
          <Typography align="center" id="modal-modal-title" variant="h4">
            {content.title}
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
            {assetName}: {currentPrice ? '$' + currentPrice : ''}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          color="error"
          width="100%"
          align="center"
          height="1.5rem"
        >
          {errorMessage}
        </Typography>
        <Box
          sx={{
            [theme.breakpoints.down('sm')]: { height: '450px' },

            [theme.breakpoints.up('sm')]: {
              height: '510px',
            },
          }}
        >
          <BuyCryptoForm
            content={content}
            handleFormSubmit={handleFormSubmit}
          />
        </Box>
      </Box>
    );
  },
);
