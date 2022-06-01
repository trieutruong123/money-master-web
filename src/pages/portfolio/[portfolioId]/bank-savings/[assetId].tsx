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
import { content } from 'i18n';
import { DashboardLayout } from 'containers';
import { BankSavingsDetail } from 'containers/portfolio';
import { bankSavingsDetailStore, rootStore } from 'shared/store';
import { BreadcrumbsLink } from 'shared/components';

const fetchData = async (portfolioId: string, assetId: string) => {
  rootStore.startLoading();

  bankSavingsDetailStore.setAssetId(assetId);
  bankSavingsDetailStore.setPortfolioId(portfolioId);
  await bankSavingsDetailStore.fetchBankSavingsDetail({ portfolioId, assetId });

  rootStore.stopLoading();
};

const AssetDetailPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const { locale, query } = router;
  const portfolioId = Array.isArray(query['portfolioId'])
    ? query['portfolioId'][0]
    : query['portfolioId'] || '';
  const assetId = Array.isArray(query['assetId'])
    ? query['assetId'][0]
    : query['assetId'] || '';


  useEffect(() => {
    if (typeof assetId === 'undefined') router.push('/404');

    fetchData(portfolioId, assetId);
  }, [assetId, portfolioId, router]);

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  //const { assetVolatilityDetailPage } = detail;
  return (
    <>
      <Head>
        <title>Bank Savings | Money Master</title>
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
              `/portfolio/${portfolioId}`,
              `/portfolio/${portfolioId}/bank-savings/${assetId}`,
            ]}
            displayNameArr={[
              'Portfolio',
              portfolioId,
              bankSavingsDetailStore.bankSavingsName || assetId.toString(),
            ]}
          />
          <Typography sx={{ mb: 3 }} variant="h4">
            Bank Savings
          </Typography>
        </Container>
        <Container sx={{ padding: isMobile ? '0px' : 'initial' }} maxWidth="lg">
          <BankSavingsDetail portfolioId={portfolioId} assetId={assetId} />
        </Container>
      </Box>
    </>
  );
};

AssetDetailPage.requireAuth = true;
AssetDetailPage.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AssetDetailPage;
