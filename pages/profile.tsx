import Head from 'next/head';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from 'components';
import { AccountProfile, AccountProfileDetails } from 'components/account';

const Profile = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = props.context;

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { profilePage } = detail;
  return (
    <>
      <Head>
        <title>{profilePage.title} | Money Master</title>
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
            {profilePage.title}
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile content = {profilePage}/>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails content = {profilePage.editProfile}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

//Profile.requireAuth = true;

Profile.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};

export default Profile;
