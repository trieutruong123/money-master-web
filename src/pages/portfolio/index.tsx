import Head from 'next/head';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DashboardLayout } from 'containers/layouts';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { BreadcrumbsLink } from 'shared/components';
import { portfolioStore } from 'shared/store';
import { PortfolioList } from 'containers/portfolio';

const fetchData = async () => {
  await portfolioStore.fetchPortfolioData();
};

export const Portfolio = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Head>
        <title>Portfolio | Money Master</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <BreadcrumbsLink urlArr={['/portfolio']} displayNameArr={['Portfolio']} />
        </Container>
        <PortfolioList context={props.context} />
      </Box>
    </>
  );
};

Portfolio.requireAuth = true;
Portfolio.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};

export default Portfolio;
