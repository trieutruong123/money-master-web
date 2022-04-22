import Head from 'next/head';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from 'containers';
import {
  TotalAssets,
  TotalProfit,
  InvestmentChannel,
  PlanProgress,
  RecentlyAdded,
  YourWallet,
} from 'containers/dashboard';
import { BreadcrumbsLink } from 'shared/components';

const Dashboard = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = props.context;
  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { dashboardPage } = detail;

  return (
    <>
      <Head>
        <title>{dashboardPage.title} | Money Mater</title>
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
            urlArr={['/dashboard']}
            displayNameArr={['Dashboard']}
          />
          <Typography sx={{ mb: 3 }} variant="h4">
            {dashboardPage.title}
          </Typography>
        </Container>
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <YourWallet sx={{ height: '100%' }} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit sx={{ height: '100%' }} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <PlanProgress sx={{ height: '100%' }} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalAssets sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <InvestmentChannel sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <RecentlyAdded sx={{ height: '100%' }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

//Dashboard.requireAuth = true;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};
export default Dashboard;
