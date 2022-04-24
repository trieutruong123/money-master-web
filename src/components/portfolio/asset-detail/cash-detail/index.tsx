import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { cashDetailStore } from 'shared/store';
import { AddNewTransactionModal } from './add-new-transaction-modal';
import { HistoricalMarketChart } from './historical-market-chart';
import { IntroSection } from './intro-section';
import { TransactionHistory } from './transaction-history';
interface IProps {
  currencyCode: string;
}

export const CashDetail = observer(({ currencyCode }: IProps) => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');
  useEffect(() => {
    cashDetailStore.setCurrencyId(currencyCode);
    cashDetailStore.fetchData();
    cashDetailStore.fetchHistoricalMarketData();
  }, []);
  const {
    isOpenAddNewTransactionModal,
    historicalMarketData,
    forexDetail,
    forexMarketData,
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
            <Grid container display="fex" justifyContent="center">
              {forexDetail !== undefined && forexMarketData !== undefined ? (
                <IntroSection
                  assetDetail={forexDetail}
                  assetMarketData={forexMarketData}
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
              {/* {forexDetail !== undefined && forexMarketData !== undefined ? (
                <TransactionHistory assetMarketData={forexMarketData} />
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
