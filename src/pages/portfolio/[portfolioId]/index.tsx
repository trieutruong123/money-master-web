import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, Suspense, lazy } from 'react';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { content as i18n } from 'i18n';
import { DashboardLayout } from 'containers';
import { HypnosisLoading } from 'shared/components';

const PortfolioDetail = lazy(
  () => import('containers/portfolio/portfolio-detail/pd-portfolio-detail'),
);


const PortfolioDetailPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const { locale } = router;
  const content = locale === 'vi' ? i18n['vi'].portfolioDetailPage : i18n['en'].portfolioDetailPage;


  return (
    <>
      <Head>
        <title>{content.title} | Money Master</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
            <PortfolioDetail
            ></PortfolioDetail>
          </Suspense>
        </Container>
      </Box>
    </>
  );
};

PortfolioDetailPage.requireAuth = true;
PortfolioDetailPage.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default PortfolioDetailPage;
