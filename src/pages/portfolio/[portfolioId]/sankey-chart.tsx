import Head from 'next/head';
import { useEffect } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next/types';
import {
  useTheme,
  useMediaQuery,
  Box,
  Container,
  Typography,
} from '@mui/material';
import { portfolioDetailStore } from 'shared/store';
import { BreadcrumbsLink } from 'shared/components';
import { DashboardLayout } from 'containers';
import { Sankey } from 'containers/portfolio/portfolio-detail/pd-insight-chart/sankey-chart';
import { useRouter } from 'next/router';

const TestSankey = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const { locale, query } = router;
  const portfolioId = Array.isArray(query['portfolioId'])
    ? query['portfolioId'][0]
    : query['portfolioId'] || '';

  useEffect(() => {
    const fetchData = async () => {
      await portfolioDetailStore.fetchSankeyFlowData();
    };
    fetchData();
  }, [portfolioId]);

  const sankeyFlowData = portfolioDetailStore.sankeyFlowData;
  return (
    <>
      <Head>
        <title>Stock Detail | Money Master</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <BreadcrumbsLink
            urlArr={[
              '/portfolio',
              `/portfolio/${portfolioId}`,
              `/portfolio/${portfolioId}/sankey-chart`,
            ]}
            displayNameArr={['Portfolio', portfolioId, 'Sankey chart']}
          />
          <Typography sx={{ mb: 3 }} variant="h4">
            Sankey Chart
          </Typography>
        </Container>
        <Container sx={{ padding: isMobile ? '0px' : 'initial' }} maxWidth="lg">
          <Sankey sankeyFlowData={sankeyFlowData} />
        </Container>
      </Box>
    </>
  );
};

TestSankey.requireAuth = true;
TestSankey.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default TestSankey;
