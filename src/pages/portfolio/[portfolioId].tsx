import Head from 'next/head';
import { useEffect, useState, Suspense, lazy } from 'react';
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Typography,
  Tab,
} from '@mui/material';
import { TabList, TabContext } from '@mui/lab';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { rootStore, portfolioDetailStore } from 'shared/store';
import { BreadcrumbsLink, HypnosisLoading } from 'shared/components';
import { DashboardLayout } from 'containers';
const PortfolioDetail = lazy(
  () => import('containers/portfolio/portfolio-detail'),
);

const fetchData = async (portfolioId: string) => {
  rootStore.startLoading();

  portfolioDetailStore.setPortfolioId(portfolioId);
  portfolioDetailStore.setPortfolioName(portfolioId);
  await portfolioDetailStore.fetchInitialData();

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
  const [selectedTab, setTab] = useState<string>('holdings');
  useEffect(() => {
    if (typeof locale !== 'undefined') rootStore.setLocale(locale);
    fetchData(portfolioId);
  }, []);

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { portfolioDetailPage } = detail;
  console.log(selectedTab);
  console.log(portfolioDetailStore.realEstateDetail);
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
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
          <BreadcrumbsLink
            urlArr={[
              '/portfolio',
              `/portfolio/${portfolioDetailStore.portfolioName || portfolioId}`,
            ]}
            displayNameArr={['Portfolio', portfolioId]}
          />
          <Typography sx={{ mb: 1 }} variant="h4">
            {portfolioDetailStore.portfolioName || portfolioDetailPage.header}
          </Typography>
        </Container>
        <Container sx={{ padding: isMobile ? '0px' : 'initial' }} maxWidth="lg">
          <TabContext value={selectedTab}>
            <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleTabChange}
                aria-label="basic tabs example"
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab label="Holdings" value="holdings" />
                <Tab label="Report" value="report" />
                <Tab label="Invest Fund" value="investFund" />
                <Tab label="Settings" value="settings" />
              </TabList>
            </Box>
          </TabContext>
          {portfolioDetailStore.pieChartData ? (
            <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
              <Box display={selectedTab === 'holdings' ? 'block' : 'none'}>
                <PortfolioDetail
                  content={portfolioDetailPage}
                  portfolioId={portfolioId}
                ></PortfolioDetail>{' '}
              </Box>
            </Suspense>
          ) : null}
          {portfolioDetailStore.pieChartData ? (
            <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
              <Box display={selectedTab === 'report' ? 'block' : 'none'}>
                <div>Report</div>
              </Box>
            </Suspense>
          ) : null}
          {portfolioDetailStore.pieChartData ? (
            <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
              <Box display={selectedTab === 'investFund' ? 'block' : 'none'}>
                <div>Invest Fund</div>\
              </Box>
            </Suspense>
          ) : null}
          {portfolioDetailStore.pieChartData ? (
            <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
              <Box display={selectedTab === 'settings' ? 'block' : 'none'}>
                <div>Settings</div>\
              </Box>
            </Suspense>
          ) : null}
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
