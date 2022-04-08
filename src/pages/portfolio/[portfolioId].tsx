import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { content } from 'i18n';
import { DashboardLayout } from 'components';
import { PortfolioDetail } from 'components/portfolio/portfolio-detail';

const PortfolioDetailPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    locales,
    locale,
    defaultLocale,
    params: { portfolioId },
  } = props;
  const router = useRouter();
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
