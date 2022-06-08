import { lazy, Suspense } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  useTheme,
} from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { content } from 'i18n';
import { DashboardLayout } from 'containers';

const CDCashDetail = lazy(() => import('containers/portfolio/asset-detail/cash-detail/cd-cash-detail-main'));

const AssetVolatilityDetailPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const { locale } = router;
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
          <Suspense fallback={<></>}>
            <CDCashDetail />
          </Suspense>
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
