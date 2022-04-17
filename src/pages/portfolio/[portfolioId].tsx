import Head from 'next/head';
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { DashboardLayout } from 'components';
import { PortfolioDetail } from 'components/portfolio/portfolio-detail';
import { rootStore, portfolioDetailStore } from 'shared/store';
import { useEffect } from 'react';

const fetchData = async (portfolioId: string) => {
  rootStore.startLoading();

  portfolioDetailStore.setPortfolioId(portfolioId);

  await portfolioDetailStore.fetchPortfolioDetailData();
  await portfolioDetailStore.fetchRealEstate();
  await portfolioDetailStore.fetchBankSaving();
  await portfolioDetailStore.fetchCash();
  await portfolioDetailStore.fetchStock();
  await portfolioDetailStore.fetchCryptoCurrency();

  rootStore.stopLoading();
};

const PortfolioDetailPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    locale,
    params: { portfolioId },
  } = props;

  useEffect(() => {
    fetchData(portfolioId);
  },[]);
  
  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { portfolioDetailPage } = detail;

  return (
    // StyledEngineProvider allows CSS-in-JS to be used
    <>
      <Head>
        <title>{portfolioDetailPage.title} | Money Master</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Portfolio Detail
          </Typography>
        </Container>
        <Container sx={{ padding: isMobile ? '0px' : 'initial' }} maxWidth="lg">
          <PortfolioDetail portfolioId={portfolioId}></PortfolioDetail>
        </Container>
      </Box>
    </>
  );
};

PortfolioDetailPage.requireAuth = true;
PortfolioDetailPage.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getStaticPaths: GetStaticPaths<{
  portoflioId: string;
}> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params, locales, locale, defaultLocale } = context;
  return {
    props: {
      context,
      params,
      locales,
      locale,
      defaultLocale,
    },
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { query, params, locales, locale, defaultLocale, resolvedUrl } =
//     context;
//   return {
//     props: {
//       query,
//       params,
//       locales,
//       locale,
//       defaultLocale,
//       resolvedUrl,
//     },
//   };
// };

export default PortfolioDetailPage;
