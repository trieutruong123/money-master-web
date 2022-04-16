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
import { cryptoVolatilityDetailStore } from 'shared/store';
import { AddNewTransactionModal } from './add-new-transaction-modal';
import { HistoricalMarketChart } from './historical-market-chart';
import { IntroSection } from './intro-section';
import { TransactionHistory } from './transaction-history';
interface IProps {
  coinCode: string;
}

export const CryptoVolatilityDetail = observer(({ coinCode }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    const fetchData = async () => {
      cryptoVolatilityDetailStore.setCoinId(coinCode);
      cryptoVolatilityDetailStore.fetchData({ code: coinCode });
      cryptoVolatilityDetailStore.fetchHistoricalMarketData();
    };
    fetchData();
  }, [coinCode]);

  const { isOpenAddNewTransactionModal, coinMarketData } =
    cryptoVolatilityDetailStore;
  const coinDetail = cryptoVolatilityDetailStore.getAssetDetail;
  const transactionHistoryData =
    cryptoVolatilityDetailStore.getTransactionHistoryData;
  const historicalMarketData =
    cryptoVolatilityDetailStore.historicalMarketData.slice();

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
          <Container sx={{ padding: isMobile ? '0px' : 'initial' }}>
            <Grid container display="flex" justifyContent="center">
              {coinDetail !== undefined && coinMarketData !== undefined ? (
                <IntroSection assetDetail={coinDetail} />
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
                <TransactionHistory
                  transactionHistoryData={transactionHistoryData}
                />
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
