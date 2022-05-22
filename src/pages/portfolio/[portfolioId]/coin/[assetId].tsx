import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { BreadcrumbsLink } from 'shared/components';
import { DashboardLayout } from 'containers';
import { CryptoVolatilityDetail } from 'containers/portfolio';
import { rootStore ,cryptoVolatilityDetailStore} from 'shared/store';


const fetchData = async (portfolioId: string, assetId: string) => {
  rootStore.startLoading();

  cryptoVolatilityDetailStore.setCoinId(assetId);
  cryptoVolatilityDetailStore.setPortfolioId(portfolioId);

  await cryptoVolatilityDetailStore.fetchCoinDetail();
  await cryptoVolatilityDetailStore.fetchHistoricalMarketData();

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
  }, [assetId, portfolioId, router]);

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  //const { assetVolatilityDetailPage } = detail;
  return (
    <>
      <Head>
        <title>Crypto Currency | Money Master</title>
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
              `/portfolio/${portfolioId}/coin/${assetId}`,
            ]}
            displayNameArr={[
              'Portfolio',
              portfolioId,
              cryptoVolatilityDetailStore.cryptoName || assetId.toString(),
            ]}
          />
          <Typography sx={{ mb: 3 }} variant="h4">
            Crypto Currency
          </Typography>
        </Container>
        <Container sx={{ padding: isMobile ? '0px' : 'initial' }} maxWidth="lg">
          <CryptoVolatilityDetail coinCode={assetId} />
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
