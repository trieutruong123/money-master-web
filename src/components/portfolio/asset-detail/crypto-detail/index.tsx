import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { cryptoVolatilityDetailStore } from 'store';
import { AddNewTransactionModal } from './add-new-transaction-modal';
import { HistoricalMarketChart } from './historical-market-chart';

export const CryptoVolatilityDetail = observer(() => {
  useEffect(() => {
    cryptoVolatilityDetailStore.setCoinId('bitcoin');
    cryptoVolatilityDetailStore.fetchData();
    cryptoVolatilityDetailStore.fetchHistoricalMarketData();
  }, []);
  const { isOpenAddNewTransactionModal, historicalMarketData, timeInterval } =
    cryptoVolatilityDetailStore;

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
        <Box sx={{ overflow: 'auto' }}>
          <Container>
            <Grid container spacing={3} display="fex" justifyContent="center">
              {historicalMarketData !== undefined ? (
                <HistoricalMarketChart
                  data={historicalMarketData}
                  handleTimeIntervalChanged={handleTimeIntervalChanged}
                />
              ) : (
                <></>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
      <AddNewTransactionModal />
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
