import Head from 'next/head';
import { useRouter } from 'next/router';
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
import { DashboardLayout } from 'containers';
import { rootStore, portfolioDetailStore } from 'shared/store';
import { BreadcrumbsLink, HypnosisLoading } from 'shared/components';
import { PDBreadcrumbTabs } from 'shared/constants';

const PortfolioDetail = lazy(
  () => import('containers/portfolio/portfolio-detail'),
);

const fetchData = async (portfolioId: string) => {
  rootStore.startLoading();

  portfolioDetailStore.setPortfolioId(portfolioId);
  portfolioDetailStore.setPortfolioName(portfolioId);

  rootStore.stopLoading();
};

const PortfolioDetailPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const { locale, query } = router;
  const portfolioId = Array.isArray(query['portfolioId'])
    ? query['portfolioId'][0]
    : query['portfolioId'] || '';

  const [selectedTab, setTab] = useState<string>('holdings');
  useEffect(() => {
    if (typeof locale !== 'undefined') rootStore.setLocale(locale as any);
    fetchData(portfolioId);
  }, [portfolioId]);

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { portfolioDetailPage } = detail;
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    portfolioDetailStore.setSelectedTabs(newValue);
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
                <Tab label="Holdings" value={PDBreadcrumbTabs.holdings} />
                <Tab label="Report" value={PDBreadcrumbTabs.report} />
                <Tab label="Invest Fund" value={PDBreadcrumbTabs.investFund} />
                <Tab label="Settings" value={PDBreadcrumbTabs.settings} />
              </TabList>
            </Box>
          </TabContext>
          <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
            <PortfolioDetail
              content={portfolioDetailPage}
              portfolioId={portfolioId}
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
