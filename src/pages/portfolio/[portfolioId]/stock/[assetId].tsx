import Head from 'next/head';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { content } from 'i18n';
import { DashboardLayout } from 'components';
import { StockVolatilityDetail } from 'components/portfolio';

const AssetVolatilityDetailPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    locale,
    resolvedUrl,
    params: { portfolioId, assetId },
  } = props;
  const router = useRouter();
  const detail = locale === 'vi' ? content['vi'] : content['en'];
  //const { assetVolatilityDetailPage } = detail;
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
          <StockVolatilityDetail stockId={assetId} />
        </Container>
      </Box>
    </>
  );
};

//AssetVolatilityDetailPage.requireAuth = true;
AssetVolatilityDetailPage.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, params, locales, locale, defaultLocale, resolvedUrl } =
    context;
  return {
    props: {
      query,
      params,
      locales,
      locale,
      defaultLocale,
      resolvedUrl,
    },
  };
};

export default AssetVolatilityDetailPage;
