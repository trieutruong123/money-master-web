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
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { realEstateDetailStore, rootStore } from 'shared/store';
import { BreadcrumbsLink } from 'shared/components';
import { DashboardLayout } from 'containers';
import { RealEstateDetail } from 'containers/portfolio';

const fetchData = async (portfolioId: string, assetId: string) => {
  rootStore.startLoading();

  realEstateDetailStore.setAssetId(assetId);
  realEstateDetailStore.setPortfolioId(portfolioId);
  await realEstateDetailStore.fetchRealEstateDetail({ portfolioId, assetId });

  rootStore.stopLoading();
};

const AssetDetailPage = () => {
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
        <title>Real Estate | Money Master</title>
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
              `/portfolio/${portfolioId}/real-estate/${assetId}`,
            ]}
            displayNameArr={[
              'Portfolio',
              portfolioId,
              realEstateDetailStore.realEstateName || assetId.toString(),
            ]}
          />
          <Typography sx={{ mb: 3 }} variant="h4">
            Real Estate
          </Typography>
        </Container>
        <Container sx={{ padding: isMobile ? '0px' : 'initial' }} maxWidth="lg">
          <RealEstateDetail portfolioId={portfolioId} assetId={assetId} />
        </Container>
      </Box>
    </>
  );
};

AssetDetailPage.requireAuth = true;
AssetDetailPage.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AssetDetailPage;
