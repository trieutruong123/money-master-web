import { lazy, Suspense, useEffect } from 'react';
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
import { content } from 'i18n';
import { DashboardLayout } from 'containers';
import { HypnosisLoading } from 'shared/components';

const BankSavingsDetail = lazy(() => import('containers/portfolio/asset-detail/bank-savings-detail/bs-bank-savings-detail'));

const AssetDetailPage = () => {
  const router = useRouter();
  const { locale, query } = router;

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  //const { assetVolatilityDetailPage } = detail;
  return (
    <>
      <Head>
        <title>Bank Savings | Money Master</title>
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

            <BankSavingsDetail />
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
