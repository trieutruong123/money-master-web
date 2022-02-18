import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DashboardLayout } from 'components/dashboard-layout';
import { RealEstateToolbar, YourRealEstate } from 'components/portfolio';

const RealEstate = () => (
  <>
    <Head>
      <title>Real Estate | Money Master</title>
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
          Real Estate
        </Typography>
      </Container>
      <Container maxWidth={false}>
        <RealEstateToolbar />
        <Box sx={{ mt: 3 }}>
          <YourRealEstate />
        </Box>
      </Container>
    </Box>
  </>
);

//RealEstate.requireAuth = true;
RealEstate.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default RealEstate;
