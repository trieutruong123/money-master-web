import { useEffect } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { rootStore, stockVolatilityDetailStore } from 'shared/store';
import { BreadcrumbsLink } from 'shared/components';
import { DashboardLayout } from 'containers';
import { StockVolatilityDetail } from 'containers/portfolio';

const fetchData = async (portfolioId: string, assetId: string) => {
  rootStore.startLoading();

  stockVolatilityDetailStore.setStockId(assetId);
  stockVolatilityDetailStore.setPortfolioId(portfolioId);

  await stockVolatilityDetailStore.fetchStockDetail({ stockId: assetId });
  await stockVolatilityDetailStore.fetchHistoricalMarketData({
    startDate: dayjs(Date.now()).subtract(2, 'year').unix(),
    endDate: dayjs(Date.now()).unix(),
    interval: 'W',
  });

  rootStore.stopLoading();
};

const AssetVolatilityDetailPage = () => {
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

    fetchData(portfolioId, assetId);
  }, []);

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  //const { assetVolatilityDetailPage } = detail;
  return (
    <>
      <Head>
        <title>Stock Detail | Money Master</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <BreadcrumbsLink
            urlArr={[
              '/portfolio',
              `/portfolio/${portfolioId}`,
              `/portfolio/${portfolioId}/stock/${assetId}`,
            ]}
            displayNameArr={[
              'Portfolio',
              portfolioId,
              stockVolatilityDetailStore.stockName || assetId.toString(),
            ]}
          />
          <Typography sx={{ mb: 3 }} variant="h4">
            Stock Detail
          </Typography>
        </Container>
        <Container sx={{ padding: isMobile ? '0px' : 'initial' }} maxWidth="lg">
          <StockVolatilityDetail stockId={assetId} />
        </Container>
      </Box>
    </>
  );
};

AssetVolatilityDetailPage.requireAuth = true;
AssetVolatilityDetailPage.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AssetVolatilityDetailPage;
