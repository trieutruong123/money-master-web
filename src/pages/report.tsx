import Head from 'next/head';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { DashboardLayout } from 'containers';
import { content } from 'i18n';
import { Box, Container, Typography } from '@mui/material';
import { BreadcrumbsLink } from 'shared/components';

const Report = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = props.context;

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { reportPage } = detail;
  return (
    <>
      <Head>
        <title>{reportPage.title} | Money Master</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <BreadcrumbsLink urlArr={['/report']} displayNameArr={['Report']} />
          <Typography sx={{ mb: 3 }} variant="h4">
            {reportPage.title}
          </Typography>
        </Container>
      </Box>
    </>
  );
};

Report.requireAuth = true;
Report.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};

export default Report;
