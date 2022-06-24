import { useEffect, useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ITransactionListRequest, ITransactionRequest, NewCashAsset } from 'shared/types';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { AssetTypeName, TransactionFormType, TransactionRequestType, UsingMoneySource } from 'shared/constants';
import { BuyCashForm } from './buy-cash-form';
import { CashItem } from 'shared/models';

interface IProps {
  openPreviousForm: Function;
  handleClose: () => void;
  content: any;
}

export const AddNewCashForm = observer(
  ({ handleClose, openPreviousForm, content }: IProps) => {
    const selectedAsset = portfolioDetailStore.selectedAsset;
    const [errorMessage, setErrorMessage] = useState<string>('');
    const theme = useTheme();

    useEffect(() => {
      const fetchAssetPrice = async () => { };
      fetchAssetPrice();
    }, []);

    const handleComeback = () => {
      portfolioDetailStore.setAddedAssetInfo({ ...selectedAsset, formType: TransactionFormType.transaction, assetType: AssetTypeName.cash });
      openPreviousForm();
    };

    const portfolioName = portfolioDetailStore.portfolioInfo?.name || '';

    const handleFormSubmit = async (data: NewCashAsset) => {
      if (data.isUsingCash) {
        const cashId = data.usingCashId;
        const cashDetail = portfolioDetailStore.cashDetail?.find(item => item.id === cashId);
        if (cashDetail && cashDetail.currencyCode === data.currencyCode) {
          setErrorMessage("Can't buy cash by using money from itself");
          return;
        }
      }
      if (isExistedCash(data)) {
        await addMoreValue(data);
      }
      else {
        await addNewCash(data);
      }
    };

    const addMoreValue = async (data: NewCashAsset) => {
      const cashItem = portfolioDetailStore.cashDetail?.find((item: CashItem) => {
        if (item.currencyCode === data.currencyCode) {
          return true;
        }
      })
      if (!cashItem) {
        return;
      }
      const moneySource = portfolioDetailStore.selectedAsset?.moneySource
      const valueOfReferentialAsset = moneySource === UsingMoneySource.usingFund
                                      ? portfolioDetailStore.investFundDetail?.currentAmount
                                      : moneySource === UsingMoneySource.usingCash
                                      ? portfolioDetailStore.cashDetail?.find(item=>item.id===data.usingCashId)?.amount||0
                                      :0;
      const payload :ITransactionRequest= {
        amount: data.amount,
        valueOfReferentialAssetBeforeCreatingTransaction: valueOfReferentialAsset||0,
        amountInDestinationAssetUnit: data.amount,
        currencyCode: data.currencyCode || 'USD',
        transactionType: TransactionRequestType.addValue,
        destinationAssetId: cashItem.id,
        destinationAssetType: AssetTypeName.cash,
        referentialAssetId: moneySource === UsingMoneySource.usingCash ? data.usingCashId : null,
        referentialAssetType: moneySource === UsingMoneySource.usingCash ? AssetTypeName.cash : (moneySource === UsingMoneySource.usingFund ? 'fund' : ''),
        isTransferringAll: false,
        isUsingFundAsSource: data.isUsingInvestFund,
        fee: data.fee,
        tax: data.tax,
      };
      const res = await portfolioDetailStore.createNewTransaction(payload);
      if (res.isError) {
        if (data.isUsingCash || data.isUsingInvestFund) {
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
        portfolioDetailStore.fetchCash();
        handleClose();
      }
    }

    const addNewCash = async (data: NewCashAsset) => {
      const res = await portfolioDetailStore.addNewCash(data);
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
    }

    const isExistedCash = (payload: NewCashAsset) => {
      const cashDetail = portfolioDetailStore.cashDetail;
      if (!cashDetail) {
        return false;
      }
      const isExisted = cashDetail?.some((item: CashItem) => {
        if (item.currencyCode === payload.currencyCode) {
          return true;
        }
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
              height: '530px',
            },
          }}
        >
          <BuyCashForm content={content} handleFormSubmit={handleFormSubmit} />
        </Box>
      </div>
    );
  },
);
