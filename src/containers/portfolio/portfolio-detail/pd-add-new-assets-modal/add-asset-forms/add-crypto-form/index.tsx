import { useEffect, useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ITransactionRequest, NewCryptoCurrencyAsset } from 'shared/types';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { AssetTypeName, TransactionFormType, UsingMoneySource } from 'shared/constants';
import { BuyCryptoForm } from './buy-cryto-form';
import { AddMoreValueForm } from './add-more-value-form';

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

    useEffect(() => {
      const isExisted = isExistedCryptoCoinCode();
      portfolioDetailStore.setAddedAssetInfo({ ...selectedAsset, addMoreValue: isExisted });
    }, []);

    const portfolioName = portfolioDetailStore.portfolioInfo?.name || '';
    const assetName = selectedAsset?.cryptoInfo?.name.toUpperCase() || '';
    const currentPrice = portfolioDetailStore.searchedCryptoDetail?.usd;

    const addMoreValue = async (data: ITransactionRequest) => {
      const res = await portfolioDetailStore.createNewTransaction(data);
      if (res.isError) {
        if (data.isUsingFundAsSource || portfolioDetailStore?.selectedAsset?.moneySource === UsingMoneySource.usingCash) {
          setErrorMessage(res.data.data);
        }
        else {
          rootStore.raiseError('Error');
          handleClose();
        }
      } else {
        rootStore.raiseNotification(res.data.en, 'success');
        if (data.isUsingFundAsSource) {
          portfolioDetailStore.setUpdateInvestFund(true);
        } else if (portfolioDetailStore?.selectedAsset?.moneySource === 'cash') {
          portfolioDetailStore.setUpdateCashDetail(true);
        }
        portfolioDetailStore.setUpdateReport(true);
        portfolioDetailStore.fetchCryptoCurrency();
        handleClose();
      }
    }

    const addNewCrypto = async (data: NewCryptoCurrencyAsset) => {
      const res = await portfolioDetailStore.addNewCryptoCurrency(data);
      if (res.isError) {
        if (data.isUsingInvestFund || data.isUsingCash) {
          setErrorMessage(res.data.data);
        } else {
          rootStore.raiseError('Error');
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

    const handleComeback = () => {
      portfolioDetailStore.setAddedAssetInfo({ ...selectedAsset, formType: TransactionFormType.transaction, assetType: AssetTypeName.cryptoCurrency });
      openPreviousForm();
    };

    const isExistedCryptoCoinCode = () => {
      const cryptoDetail = portfolioDetailStore.cryptoDetail;
      const selectedCryptoCode = portfolioDetailStore?.selectedAsset?.cryptoCoinCode;
      if (!cryptoDetail || !selectedCryptoCode) {
        return false;
      }
      const isExisted = cryptoDetail.some((item) => {
        if (selectedCryptoCode === item.cryptoCoinCode) {
          return true;
        }
        return false;
      })

      return isExisted;
    }


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
        >{isExistedCryptoCoinCode() ?
          <AddMoreValueForm handleFormSubmit={addMoreValue} content={content} /> :
          <BuyCryptoForm
            content={content}
            handleFormSubmit={addNewCrypto}
          />}
        </Box>
      </Box>
    );
  },
);
