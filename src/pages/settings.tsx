import Head from 'next/head';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from 'containers';
import { SettingsNotifications, SettingsPassword } from 'containers/settings';

const Settings = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = props.context;

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { settingsPage } = detail;
  return (
    <>
      <Head>
        <title>{settingsPage.title} | Money Master</title>
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
            {settingsPage.title}
          </Typography>
          <SettingsNotifications />
          <Box sx={{ pt: 3 }}>
            <SettingsPassword />
          </Box>
        </Container>
      </Box>
    </>
  );
};

//Setting.requireAuth = true;

Settings.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};

export default Settings;
