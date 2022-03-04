import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { content } from 'i18n';
import { DashboardLayout } from 'components';
import { TransactionHitory } from 'components/portfolio/transactions';

const TransactionHistoryPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { locale } = props.context;
  const router = useRouter();
  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { portfolioDetailPage } = detail;

  return (
    // StyledEngineProvider allows CSS-in-JS to be used
    <>
      <Head>
        <title>Transaction | Money Master</title>
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
            Transaction History
          </Typography>
        </Container>
        <Container maxWidth="lg">
          <TransactionHitory />
        </Container>
      </Box>
    </>
  );
};

//TransactionHistoryPage.requireAuth = true;
TransactionHistoryPage.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};

export default TransactionHistoryPage;
