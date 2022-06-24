import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { CDBuyCryptoForm } from './cd-buy-crypto-form';
import { CDSellCryptoForm } from './cd-sell-crypto-form';
import { ITransactionRequest, TransferToInvestFundType } from 'shared/types';
import CDMoveToFundForm from './cd-transfer-to-fund-form';
import { cryptoDetailStore } from 'shared/store';
import CDWithdrawToOutsideForm from './cd-withdraw-to-outside-form';
import { useRouter } from 'next/router';
import { content as i18n } from 'i18n';

interface IProps { }

export const CDCryptoForm = observer(({ }: IProps) => {
  const [focusedButtonKey, setFocusedButtonKey] = useState(0);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [assetPrice, setAssetPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const theme = useTheme();

  const router = useRouter();
  const { locale, query } = router;
  const content = locale === 'vi' ? i18n['vi'].cryptoDetailPage : i18n['en'].cryptoDetailPage;

  useEffect(() => {
    const fetchAssetPrice = async () => { };
    fetchAssetPrice();
    setSelectedForm(
      <CDBuyCryptoForm
        content={content}
        key={focusedButtonKey}
        handleFormSubmit={buyMoreCrypto}
      />,
    );
  }, []);

  const buttonLabels = [content.transactionForm.buy, content.transactionForm.sell, content.transactionForm.transfer, content.transactionForm.withdraw];

  const handleSelectionChanged = (key: number) => {
    setFocusedButtonKey(key);
    setErrorMessage('');
    setSelectedForm(formArray[key]);
  };

  const portfolioName = cryptoDetailStore.portfolioInfo?.name;
  const assetName = cryptoDetailStore.cryptoDetail?.cryptoCoinCode;

  const buyMoreCrypto = async (payload: ITransactionRequest) => {
    const res = await cryptoDetailStore.createNewTransaction(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      cryptoDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  };

  const moveToFund = async (payload: TransferToInvestFundType) => {
    const res = await cryptoDetailStore.transferAssetToInvestFund(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      cryptoDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  };

  const sellCrypto = async (payload: ITransactionRequest) => {
    if (
      payload.amountInDestinationAssetUnit &&
      cryptoDetailStore.cryptoDetail &&
      cryptoDetailStore.marketData?.c &&
      payload.amountInDestinationAssetUnit > cryptoDetailStore.cryptoDetail?.currentAmountHolding * cryptoDetailStore.marketData.c
    ) {
      setErrorMessage('Amount is greater than your own shares');
      return;
    }
    const res = await cryptoDetailStore.createNewTransaction(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      cryptoDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  };

  const withdrawToOutside = async (payload: ITransactionRequest) => {
    if (payload.amountInDestinationAssetUnit &&
      cryptoDetailStore.cryptoDetail &&
      cryptoDetailStore.marketData?.c &&
      payload.amountInDestinationAssetUnit >
      cryptoDetailStore.cryptoDetail?.currentAmountHolding * cryptoDetailStore.marketData.c
    ) {
      setErrorMessage('Amount is greater than your own shares');
      return;
    }
    const res = await cryptoDetailStore.createNewTransaction(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      cryptoDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  }

  const formArray = [
    <CDBuyCryptoForm content={content} key={focusedButtonKey} handleFormSubmit={buyMoreCrypto} />,
    <CDSellCryptoForm content={content} key={focusedButtonKey} handleFormSubmit={sellCrypto} />,
    <CDMoveToFundForm content={content} key={focusedButtonKey} handleFormSubmit={moveToFund} />,
    <CDWithdrawToOutsideForm content={content} key={focusedButtonKey} handleFormSubmit={withdrawToOutside} />
  ];

  const handleClose = () => {
    cryptoDetailStore.setOpenAddNewTransactionModal(false);
  };

  return (
    <Box sx={{ height: 'inherit' }}>
      <Box sx={{ mt: '1rem' }}>
        <Typography align="center" id="modal-modal-title" variant="h4">
          {content.transactionForm.transaction}
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
          {assetName}: &nbsp; ${cryptoDetailStore.marketData?.c}
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
