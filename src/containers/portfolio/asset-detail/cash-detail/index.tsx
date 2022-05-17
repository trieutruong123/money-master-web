import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { lazy, Suspense, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { cashDetailStore } from 'shared/store';
import { HypnosisLoading } from 'shared/components';
import { AddNewTransactionModal } from './add-new-transaction-modal';

const IntroSection = lazy(() => import('./intro-section'));
const HistoricalMarketChart = lazy(() => import('./historical-market-chart'));
const TransactionHistory = lazy(() => import('./transaction-history'));

interface IProps {}

export const CashDetail = observer(({}: IProps) => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');
  useEffect(() => {
    const fetchData = async () => {
      await cashDetailStore.fetchCashDetail();
      //currencyCode được gán từ fetchCashDetail rồi nha
      Promise.all([
        cashDetailStore.fetchData(),
        cashDetailStore.fetchHistoricalMarketData(),
        cashDetailStore.updateTransactionHistoryData()
      ]);
    };
    if (cashDetailStore.cashId && cashDetailStore.portfolioId) fetchData();
  }, [cashDetailStore.cashId, cashDetailStore.portfolioId]);

  const {
    isOpenAddNewTransactionModal,
    historicalMarketData,
    forexDetail,
    forexMarketData,
    transactionHistoryData
  } = cashDetailStore;

  const handleTimeIntervalChanged = useCallback((interval: number) => {
    cashDetailStore.setTimeInterval(interval);
    cashDetailStore.fetchHistoricalMarketData();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flex: '1 1 auto',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ overflow: 'hidden' }}>
          <Container sx={{ padding: isMobile ? '0px' : 'initial' }}>
            <Grid container display="flex" justifyContent="center">
              {forexDetail !== undefined && forexMarketData !== undefined ? (
                <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                  <IntroSection
                    assetDetail={forexDetail}
                    assetMarketData={forexMarketData}
                  />
                </Suspense>
              ) : (
                <></>
              )}
              {historicalMarketData !== undefined ? (
                <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                  <HistoricalMarketChart
                    data={historicalMarketData}
                    handleTimeIntervalChanged={handleTimeIntervalChanged}
                  />
                </Suspense>
              ) : (
                <></>
              )}
              {forexDetail !== undefined && forexMarketData !== undefined ? (
                <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                  <TransactionHistory assetMarketData={forexMarketData} transactionHistoryData={transactionHistoryData}/>
                </Suspense>

              ) : (
                <></>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
      <Box>
        <AddNewTransactionModal />
      </Box>
      <Tooltip title="Add new transaction">
        <IconButton
          onClick={() => {
            cashDetailStore.setOpenAddNewTransactionModal(
              !isOpenAddNewTransactionModal,
            );
          }}
          color="success"
          sx={{ position: 'absolute', right: '6vw', bottom: '6vh' }}
        >
          <AddCircleIcon sx={{ width: '4rem', height: '4rem' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
});
