import { lazy, useEffect, Suspense } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
} from '@mui/material';
import { useRouter } from 'next/router';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { content } from 'i18n';
import { DashboardLayout } from 'containers';
import { HypnosisLoading } from 'shared/components';

const RealEstateDetail = lazy(() => import('containers/portfolio/asset-detail/real-estate-detail/re-real-estate-detail-main'));

const AssetDetailPage = () => {
  const router = useRouter();
  const { locale, query } = router;

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
          <Suspense fallback={<HypnosisLoading />}>
            <RealEstateDetail />

          </Suspense>
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
