import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DashboardLayout } from 'components/dashboard-layout';
import { CashToolbar } from 'components/portfolio';
import YourCash from 'components/portfolio/cash/your-cash';

const Cash = () => (
  <>
    <Head>
      <title>Cash | Money Master</title>
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
          Cash
        </Typography>
      </Container>
      <Container maxWidth={false}>
        <CashToolbar />
        <Box sx={{ mt: 3 }}>
          <YourCash />
        </Box>
      </Container>
    </Box>
  </>
);

//Cash.requireAuth = true;
Cash.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Cash;
