import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DashboardLayout } from 'components/dashboard-layout';
import { CryptoCurrencyListResults, CryptoCurrencyToolbar, YourCoin } from 'components/portfolio';

const Coin = () => (
  <>
    <Head>
      <title>Coin | Money Master</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Coin
        </Typography>
      </Container>
      <Container maxWidth={false}>
        <CryptoCurrencyToolbar />
        <Box sx={{ mt: 3 }}>
          <YourCoin />
        </Box>
        <Box sx={{ mt: 3 }}>
          <CryptoCurrencyListResults />
        </Box>
      </Container>
    </Box>
  </>
);

//Coin.requireAuth = true;
Coin.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Coin;
