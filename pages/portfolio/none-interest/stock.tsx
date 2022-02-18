import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DashboardLayout } from 'components/dashboard-layout';
import { StockToolbar, YourStock } from 'components/portfolio';

const Stock = () => (
  <>
    <Head>
      <title>Stock | Money Master</title>
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
          Stock
        </Typography>
      </Container>
      <Container maxWidth={false}>
        <StockToolbar />
        <Box sx={{ mt: 3 }}>
          <YourStock />
        </Box>
      </Container>
    </Box>
  </>
);

//Stock.requireAuth = true;
Stock.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Stock;
