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
import { StockVolatilityDetail } from 'components/portfolio';

const AssetVolatilityDetailPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { locale } = props.context;

  const router = useRouter();
  const detail = locale === 'vi' ? content['vi'] : content['en'];
  //const { assetVolatilityDetailPage } = detail;
  const stockId = 'AAPL';
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
          <Typography sx={{ mb: 3 }} variant="h4">
            Stock Detail
          </Typography>
        </Container>
        <Container sx={{ padding: isMobile ? '0px' : 'initial' }} maxWidth="lg">
          <StockVolatilityDetail stockId={stockId} />
        </Container>
      </Box>
    </>
  );
};

//AssetVolatilityDetailPage.requireAuth = true;
AssetVolatilityDetailPage.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};

export default AssetVolatilityDetailPage;
