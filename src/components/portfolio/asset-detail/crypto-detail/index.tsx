import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { cryptoVolatilityDetailStore } from 'store';
import { AddNewTransactionModal } from './add-new-transaction-modal';
import { HistoricalMarketChart } from './historical-market-chart';
import { IntroSection } from './intro-section';
import { TransactionHistory } from './transaction-history';
interface IProps {
  coinCode: string;
}

export const CryptoVolatilityDetail = observer(({ coinCode }: IProps) => {
  useEffect(() => {
    cryptoVolatilityDetailStore.setCoinId(coinCode);
    cryptoVolatilityDetailStore.fetchData();
    cryptoVolatilityDetailStore.fetchHistoricalMarketData();
  }, []);
  const {
    isOpenAddNewTransactionModal,
    historicalMarketData,
    coinDetail,
    coinMarketData,
  } = cryptoVolatilityDetailStore;

  const handleTimeIntervalChanged = useCallback((interval: number) => {
    cryptoVolatilityDetailStore.setTimeInterval(interval);
    cryptoVolatilityDetailStore.fetchHistoricalMarketData();
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
          <Container>
            <Grid container spacing={3} display="fex" justifyContent="center">
              {coinDetail !== undefined && coinMarketData !== undefined ? (
                <IntroSection
                  assetDetail={coinDetail}
                  assetMarketData={coinMarketData}
                />
              ) : (
                <></>
              )}
              {historicalMarketData !== undefined ? (
                <HistoricalMarketChart
                  data={historicalMarketData}
                  handleTimeIntervalChanged={handleTimeIntervalChanged}
                />
              ) : (
                <></>
              )}
              {coinDetail !== undefined && coinMarketData !== undefined ? (
                <TransactionHistory assetMarketData={coinMarketData} />
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
            cryptoVolatilityDetailStore.setOpenAddNewTransactionModal(
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
