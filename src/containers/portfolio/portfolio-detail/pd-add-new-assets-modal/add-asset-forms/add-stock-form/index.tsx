import { useEffect, useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ITransactionRequest, NewStockAsset } from 'shared/types';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { AssetTypeName, TransactionFormType, UsingMoneySource } from 'shared/constants';
import { BuyStockForm } from './buy-stock-form';
import { AddMoreValueForm } from './add-more-value-form';

interface IProps {
  openPreviousForm: Function;
  handleClose: () => void;
  content: any;
}

export const AddNewStockForm = observer(
  ({
    handleClose,
    openPreviousForm,
    content,
  }: IProps) => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const theme = useTheme();

    const selectedAsset = portfolioDetailStore.selectedAsset;

    const portfolioName = portfolioDetailStore.portfolioInfo?.name || '';
    const assetName = selectedAsset?.stockInfo?.name.toUpperCase();
    const currenPrice = portfolioDetailStore.searchedStockDetail?.c;

    useEffect(() => {
      const fetchAssetPrice = async () => {
        portfolioDetailStore.getStockInfoById(selectedAsset?.stockCode?.toUpperCase() || '');
      };
      fetchAssetPrice();
    }, []);

    useEffect(() => {
      const isExisted = isExistedStockCode();
      portfolioDetailStore.setAddedAssetInfo({ ...selectedAsset, addMoreValue: isExisted });
    }, [])

    const handleComeback = () => {
      portfolioDetailStore.setAddedAssetInfo({ ...selectedAsset, formType: TransactionFormType.transaction, assetType: AssetTypeName.stock });
      openPreviousForm();
    };

    const addNewStock = async (data: NewStockAsset) => {
      const res: any = await portfolioDetailStore.addNewStock(data);
      if (res.isError) {
        if (data.isUsingInvestFund || data.isUsingCash) {
          setErrorMessage(res.data);
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

    const addMoreValue = async (data: ITransactionRequest) => {
      const res = await portfolioDetailStore.createNewTransaction(data);
      if (res.isError) {
        if (data.isUsingFundAsSource || portfolioDetailStore?.selectedAsset?.moneySource === UsingMoneySource.usingCash) {
          setErrorMessage(res.data);
        } else {
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
        portfolioDetailStore.fetchStock();
        handleClose();
      }
    }

    const isExistedStockCode = () => {
      const stockDetail = portfolioDetailStore.stockDetail;
      const selectedStockCode = portfolioDetailStore?.selectedAsset?.stockCode;
      if (!stockDetail || !selectedStockCode) {
        return false;
      }
      const isExisted = stockDetail.some((item) => {
        if (selectedStockCode === item.stockCode) {
          return true;
        }
        return false;
      })

      return isExisted;
    }


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
          {isExistedStockCode() ?
            <AddMoreValueForm
              handleFormSubmit={addMoreValue}
              content={content} /> :
            <BuyStockForm
              content={content}
              handleFormSubmit={addNewStock}
            />
          }
        </Box>
      </div>
    );
  },
);
