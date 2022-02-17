import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DashboardLayout } from 'components/dashboard-layout';


const InterestBearingAssets = () => (
  <>
    <Head>
      <title>Interest-bearing Assets | Money Master</title>
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
        Interest-bearing Assets
        </Typography>
      </Container>
      
    </Box>
  </>
);

//InterestBearingAssets.requireAuth = true;
InterestBearingAssets.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default InterestBearingAssets;
