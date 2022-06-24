import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { bankSavingsDetailStore, rootStore } from 'shared/store';
import { BreadcrumbsLink } from 'shared/components';
import React from 'react';
import { useRouter } from 'next/router';
import { AddNewTransactionModal } from './bs-transaction-modal/bs-transaction-modal-main.tsx';
import { content as i18n } from 'i18n';

const BSTransactionHistory = lazy(
  () => import('./bs-transaction-history/bs-transaction-history-main'),
);
const BSIntroSection = lazy(
  () => import('./bs-intro-section/bs-intro-section-main'),
);
const BSProfitLossChart = lazy(
  () => import('./bs-profit-loss-chart/bs-profit-loss-chart'),
);

interface IProps {}

const BankSavingsDetail = observer(({}: IProps) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const { locale, query } = router;
  const content =
    locale === 'vi'
      ? i18n['vi'].bankSavingDetailPage
      : i18n['en'].bankSavingDetailPage;

  const portfolioId = Array.isArray(query['portfolioId'])
    ? query['portfolioId'][0]
    : query['portfolioId'] || '';
  const assetId = Array.isArray(query['assetId'])
    ? query['assetId'][0]
    : query['assetId'] || '';

  useEffect(() => {
    const fetchData = async () => {
      await bankSavingsDetailStore.resetInitialState();
      await bankSavingsDetailStore.resetTransaction();
      await bankSavingsDetailStore.fetchBankSavingProfitLoss('day');
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (typeof assetId === 'undefined') router.push('/404');

    bankSavingsDetailStore.setAssetId(assetId);
    bankSavingsDetailStore.setPortfolioId(portfolioId);
  }, [assetId, portfolioId, router, bankSavingsDetailStore]);

  useEffect(() => {
    const fetchData = async () => {
      rootStore.startLoading();
      Promise.all([bankSavingsDetailStore.fetchOverviewData()]);
      await bankSavingsDetailStore.refreshTransactionHistory();
      rootStore.stopLoading();
    };
    if (
      portfolioId &&
      assetId &&
      bankSavingsDetailStore.needUpdateOverviewData
    ) {
      fetchData();
      bankSavingsDetailStore.setUpdateOverviewData(false);
    }
  }, [portfolioId, assetId, bankSavingsDetailStore.needUpdateOverviewData]);

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
                content.breadCurmbs.portfolio,
                `/portfolio/${bankSavingsDetailStore.portfolioId}`,
                `/portfolio/${bankSavingsDetailStore.portfolioId}/bank-savings/${bankSavingsDetailStore.assetDetail}`,
              ]}
              displayNameArr={[
                'Portfolio',
                bankSavingsDetailStore.portfolioInfo?.name ||
                  bankSavingsDetailStore.portfolioId.toString(),
                bankSavingsDetailStore.assetDetail?.name ||
                  bankSavingsDetailStore.assetId.toString(),
              ]}
            />
            <Typography sx={{ mb: 3 }} variant="h4">
              {bankSavingsDetailStore.assetDetail?.name || ''}
            </Typography>
          </Container>
          <Box sx={{ overflow: 'hidden', width: '100%' }}>
            <Container sx={{ padding: isMobile ? '0px' : 'initial' }}>
              <Grid
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
                  <Suspense fallback={<></>}>
                    <BSIntroSection />
                  </Suspense>
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
                  <Suspense fallback={<></>}>
                    <BSProfitLossChart />
                  </Suspense>
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
                  <Suspense fallback={<></>}>
                    <BSTransactionHistory
                      transactionHistoryData={
                        bankSavingsDetailStore.transactionHistory
                      }
                    />
                  </Suspense>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>
      <Box>
        <AddNewTransactionModal />
      </Box>
      <Tooltip title={content.addNewTransaction}>
        <IconButton
          onClick={() => {
            bankSavingsDetailStore.setOpenAddNewTransactionModal(
              !bankSavingsDetailStore.isOpenAddNewTransactionModal,
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

export default BankSavingsDetail;
