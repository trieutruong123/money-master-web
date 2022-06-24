import Head from 'next/head';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from 'containers';
import APAccountProfile from 'containers/account-profile/ap-account-profile-main';

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
          <APAccountProfile />
        </Container>
      </Box>
    </>
  );
};

Profile.requireAuth = true;
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
