import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
} from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { cashDetailStore, rootStore } from 'shared/store';
import { BreadcrumbsLink } from 'shared/components';
import { CashDetail } from 'containers/portfolio';
import { DashboardLayout } from 'containers';

const fetchData = async (portfolioId: string, assetId: string) => {
  rootStore.startLoading();

  cashDetailStore.setCashId(assetId);
  cashDetailStore.setPortfolioId(portfolioId);

  cashDetailStore.fetchCash();

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
        <title>Cash | Money Master</title>
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
              `/portfolio/${portfolioId}/cash/${assetId}`,
            ]}
            displayNameArr={[
              'Portfolio',
              portfolioId,
              cashDetailStore.cashName || assetId.toString(),
            ]}
          />
          <Typography sx={{ mb: 3 }} variant="h4">
            Cash
          </Typography>
        </Container>

        <Container sx={{ padding: isMobile ? '0px' : 'initial' }} maxWidth="lg">
          <CashDetail cashId={assetId} />
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
