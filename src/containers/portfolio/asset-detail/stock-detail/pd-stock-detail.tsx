import { Suspense, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Typography,
  Tab,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { rootStore, stockVolatilityDetailStore } from 'shared/store';
import { AddNewTransactionModal } from './add-new-transaction-modal';
import { HistoricalMarketChart } from './historical-market-chart';
import { IntroSection } from './intro-section';
import { TransactionHistory } from './transaction-history';
import dayjs from 'dayjs';
import { BreadcrumbsLink, HypnosisLoading } from 'shared/components';
import { PAStockBreadcrumbTabs } from 'shared/constants/portfolio-asset';
import { TabContext, TabList } from '@mui/lab';

interface IProps { }

const StockVolatilityDetail = observer(({ }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const { locale, query } = router;
  const portfolioId = Array.isArray(query['portfolioId'])
    ? query['portfolioId'][0]
    : query['portfolioId'] || '';
  const assetId = Array.isArray(query['assetId'])
    ? query['assetId'][0]
    : query['assetId'] || '';

  useEffect(() => {
    if (typeof assetId === 'undefined') router.push('/404');
    stockVolatilityDetailStore.setStockId(assetId);
    stockVolatilityDetailStore.setPortfolioId(portfolioId);
  }, [router, stockVolatilityDetailStore, portfolioId, assetId]);


  useEffect(() => {
    const { portfolioId, stockId } = stockVolatilityDetailStore;
    const fetchData = async () => {
      await stockVolatilityDetailStore.fetchData();
      await stockVolatilityDetailStore.fetchFinhubService();
    };
    rootStore.startLoading();
    if (portfolioId && stockId) {
      fetchData();
    }
    rootStore.stopLoading();
  }, [
    stockVolatilityDetailStore.portfolioId,
    stockVolatilityDetailStore.stockId,
  ]);

  const handleDateSelectionChanged = useCallback((params: any) => {
    stockVolatilityDetailStore.setTimeInterval(params?.interval);
    stockVolatilityDetailStore.fetchHistoricalMarketData({
      startDate: params?.startDate,
      endDate: params?.endDate,
      interval: params?.interval,
    });
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    stockVolatilityDetailStore.setSelectedTab(newValue);
  };

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
        <Box sx={{ overflow: 'auto', width: '100%' }}>
          <Container>
            <BreadcrumbsLink
              urlArr={[
                '/portfolio',
                `/portfolio/${stockVolatilityDetailStore.portfolioId}`,
                `/portfolio/${stockVolatilityDetailStore.portfolioId}/stock/${stockVolatilityDetailStore.stockId}`,
              ]}
              displayNameArr={[
                'Portfolio',
                stockVolatilityDetailStore.portfolioInfo?.name ||
                stockVolatilityDetailStore.portfolioId.toString(),
                stockVolatilityDetailStore.stockDetail?.stockCode ||
                stockVolatilityDetailStore.stockId.toString(),
              ]}
            />
            <Typography sx={{ mb: 3 }} variant="h4">
              {stockVolatilityDetailStore.stockCode}
            </Typography>
          </Container>

          <Container
            sx={{ padding: isMobile ? '0px' : 'initial' }}
            maxWidth="lg"
          >
            <TabContext value={stockVolatilityDetailStore.selectedTab}>
              <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleTabChange}
                  aria-label="basic tabs example"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  <Tab
                    label={PAStockBreadcrumbTabs.overview}
                    value={PAStockBreadcrumbTabs.overview}
                  />
                  <Tab
                    label={PAStockBreadcrumbTabs.insight}
                    value={PAStockBreadcrumbTabs.insight}
                  />
                  <Tab
                    label={PAStockBreadcrumbTabs.settings}
                    value={PAStockBreadcrumbTabs.settings}
                  />
                </TabList>
              </Box>
            </TabContext>
          </Container>
          <Box sx={{ overflow: 'hidden' }}>
            <Container sx={{ padding: isMobile ? '0px' : 'initial' }}>
              <Grid display="flex" justifyContent="center" flexDirection='column' >
                {stockVolatilityDetailStore.selectedTab ===
                  PAStockBreadcrumbTabs.overview ? (
                  <Suspense fallback={<HypnosisLoading />}>
                    <IntroSection
                      assetDetail={stockVolatilityDetailStore.stockDetail}
                    />
                    <TransactionHistory
                      transactionHistoryData={
                        stockVolatilityDetailStore.transactionList?.slice()
                      }
                    />
                  </Suspense>
                ) : null}
                {stockVolatilityDetailStore.selectedTab ===
                  PAStockBreadcrumbTabs.insight ? (
                  <Suspense fallback={<HypnosisLoading />}>
                    <HistoricalMarketChart
                      data={stockVolatilityDetailStore.historicalMarketData?.slice()}
                      handleDateSelectionChanged={handleDateSelectionChanged}
                    />
                  </Suspense>
                ) : null}
                {stockVolatilityDetailStore.selectedTab ===
                  PAStockBreadcrumbTabs.settings ? (
                  <Suspense fallback={<HypnosisLoading />}>
                    <h1>You are in setting tab</h1>
                  </Suspense>
                ) : null}
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
                !stockVolatilityDetailStore.isOpenAddNewTransactionModal,
              );
            }}
            color="success"
            sx={{ position: 'absolute', right: '6vw', bottom: '6vh' }}
          >
            <AddCircleIcon sx={{ width: '4rem', height: '4rem' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
});

export default StockVolatilityDetail;
