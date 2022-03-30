import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { stockVolatilityDetailStore } from 'store';
import { AddNewTransactionModal } from './add-new-transaction-modal';
import { HistoricalMarketChart } from './historical-market-chart';
import { IntroSection } from './intro-section';
import { TransactionHistory } from './transaction-history';
import dayjs from 'dayjs';
interface IProps {
  stockId: string;
}

export const StockVolatilityDetail = observer(({ stockId }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    stockVolatilityDetailStore.setStockId(stockId);
    stockVolatilityDetailStore.fetchData({ stockId });
    stockVolatilityDetailStore.fetchHistoricalMarketData({
      startDate: dayjs(Date.now()).subtract(2, 'year').unix(),
      endDate: dayjs(Date.now()).unix(),
      interval: 'W',
    });
  }, [stockId]);

  const { isOpenAddNewTransactionModal } = stockVolatilityDetailStore;
  const stockDetail = stockVolatilityDetailStore.getStockDetail;
  const transactionHistoryData =
    stockVolatilityDetailStore.getTransactionHistoryData;
  const historicalMarketData = stockVolatilityDetailStore.historicalMarketData;

  const handleDateSelectionChanged = useCallback((params: any) => {
    stockVolatilityDetailStore.setTimeInterval(params?.interval);
    stockVolatilityDetailStore.fetchHistoricalMarketData({
      startDate: params?.startDate,
      endDate: params?.endDate,
      interval: params?.interval,
    });
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
              {/* {stockDetail !== undefined && coinMarketData !== undefined ? (
                <IntroSection
                  assetDetail={stockDetail}
                />
              ) : (
                <></>
              )} */}
              {historicalMarketData !== undefined &&
              historicalMarketData !== [] ? (
                <HistoricalMarketChart
                  data={historicalMarketData}
                  handleDateSelectionChanged={handleDateSelectionChanged}
                />
              ) : (
                <></>
              )}
              {/* {stockDetail !== undefined && coinMarketData !== undefined ? (
                <TransactionHistory
                  transactionHistoryData={transactionHistoryData}
                />
              ) : (
                <></>
              )} */}
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
            stockVolatilityDetailStore.setOpenAddNewTransactionModal(
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
