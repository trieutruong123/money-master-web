import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { SDBuyStockForm } from './sd-buy-stock-form';
import { SDSellStockForm } from './sd-sell-stock-form';
import SDTransferToFundForm from './sd-transfer-to-fund-form';
import SDWithdrawToOutside from './sd-withdraw-to-outside-form';
import { stockDetailStore } from 'shared/store';
import { ITransactionRequest, TransferToInvestFundType } from 'shared/types';
import { content as i18n } from 'i18n';
import { useRouter } from 'next/router';


interface IProps { }

export const SDStockForm = observer(({ }: IProps) => {
  const router = useRouter();
  const { locale, query } = router;
  const content = locale === 'vi' ? i18n['vi'].stockDetailPage : i18n['en'].stockDetailPage;

  const theme = useTheme();
  const [focusedButtonKey, setFocusedButtonKey] = useState(0);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchAssetPrice = async () => { };
    fetchAssetPrice();
    setSelectedForm(
      <SDBuyStockForm key={focusedButtonKey} content={content} handleFormSubmit={buyMoreStock} />,
    );
  }, []);

  const buttonLabels = [
    content.transactionForm.buy,
    content.transactionForm.sell,
    content.transactionForm.transfer,
    content.transactionForm.withdraw];

  const handleSelectionChanged = (key: number) => {
    setFocusedButtonKey(key);
    setErrorMessage('');
    setSelectedForm(formArray[key]);
  };

  const portfolioName = stockDetailStore.portfolioInfo?.name;
  const assetName = stockDetailStore.stockDetail?.stockCode;

  const buyMoreStock = async (payload: ITransactionRequest) => {
    const res = await stockDetailStore.createNewTransaction(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      stockDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  };

  const moveToFund = async (payload: TransferToInvestFundType) => {
    const res = await stockDetailStore.transferAssetToInvestFund(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      stockDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  };

  const sellStock = async (payload: ITransactionRequest) => {
    if (
      stockDetailStore.stockDetail &&
      stockDetailStore.marketData?.c &&
      payload.amount >
      stockDetailStore.stockDetail?.currentAmountHolding * stockDetailStore.marketData?.c
    ) {
      setErrorMessage('Amount is greater than your own shares');
      return;
    }
    const res = await stockDetailStore.createNewTransaction(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      stockDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  };

  const withdrawToOutside = async (payload: ITransactionRequest) => {
    if (
      payload.amountInDestinationAssetUnit &&
      stockDetailStore.stockDetail &&
      stockDetailStore.marketData?.c &&
      payload.amountInDestinationAssetUnit >
      stockDetailStore.stockDetail?.currentAmountHolding * stockDetailStore.marketData?.c
    ) {
      setErrorMessage('Amount is greater than your own shares');
      return;
    }
    const res = await stockDetailStore.createNewTransaction(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      stockDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  }

  const formArray = [
    <SDBuyStockForm key={focusedButtonKey} content={content} handleFormSubmit={buyMoreStock} />,
    <SDSellStockForm key={focusedButtonKey} content={content} handleFormSubmit={sellStock} />,
    <SDTransferToFundForm key={focusedButtonKey} content={content} handleFormSubmit={moveToFund} />,
    <SDWithdrawToOutside key={focusedButtonKey} content={content} handleFormSubmit={withdrawToOutside} />
  ];

  const handleClose = () => {
    stockDetailStore.setOpenAddNewTransactionModal(false);
  };

  return (
    <Box sx={{ height: 'inherit' }}>
      <Box sx={{ mt: '1rem' }}>
        <Typography align="center" id="modal-modal-title" variant="h4">
          Transaction
        </Typography>
      </Box>
      <Box sx={{ ml: '3rem', mt: '1rem' }}>
        <ButtonGroup aria-label="outlined primary button group">
          {buttonLabels.map((item: string, key: number) => {
            return (
              <Button
                key={key.toString()}
                variant={key === focusedButtonKey ? 'contained' : 'outlined'}
                onClick={() => handleSelectionChanged(key)}
              >
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
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
          {assetName}: &nbsp; ${stockDetailStore.marketData?.c}
        </Typography>
      </Box>
      <Typography variant="body1" color="error" align="center" height="1.5rem">
        {errorMessage}
      </Typography>
      <Box
        sx={{
          [theme.breakpoints.down('sm')]: { height: '390px' },
          [theme.breakpoints.up('sm')]: {
            height: '460px',
          },
        }}
      >
        {selectedForm}
      </Box>
    </Box>
  );
});
