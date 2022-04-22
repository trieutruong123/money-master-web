import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { DashboardLayout } from 'components';
import { rootStore ,cryptoVolatilityDetailStore} from 'shared/store';
import { CryptoVolatilityDetail } from 'components/portfolio';


const fetchData = async (portfolioId: string, assetId: string) => {
  rootStore.startLoading();

  cryptoVolatilityDetailStore.setCoinId(assetId);
  cryptoVolatilityDetailStore.setPortfolioId(portfolioId);

  await cryptoVolatilityDetailStore.fetchCoinDetail();
  await cryptoVolatilityDetailStore.fetchHistoricalMarketData();

  rootStore.stopLoading();
};

const AssetVolatilityDetailPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const {
    locales,
    locale,
    defaultLocale,
    params: { portfolioId, assetId },
  } = props;

  useEffect(() => {
    if (typeof assetId === 'undefined') router.push('/404');

    fetchData(portfolioId, assetId);
  }, []);

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  //const { assetVolatilityDetailPage } = detail;
  return (
    <>
      <Head>
        <title>Crypto Currency | Money Master</title>
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
            Crypto Currency
          </Typography>
        </Container>
        <Container sx={{ padding: isMobile ? '0px' : 'initial' }} maxWidth="lg">
          <CryptoVolatilityDetail coinCode={assetId} />
        </Container>
      </Box>
    </>
  );
};

AssetVolatilityDetailPage.requireAuth = true;
AssetVolatilityDetailPage.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getStaticPaths: GetStaticPaths<{
  portoflioId: string;
  assetId: string;
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

export default AssetVolatilityDetailPage;
