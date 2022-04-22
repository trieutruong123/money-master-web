import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { Box } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { content } from 'i18n';
import {
  LandingBrandIntro,
  LandingFooter,
  LandingFeatures,
  DefaultLayout,
} from 'containers';

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = props.context;

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { landingPage } = detail;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <LandingBrandIntro content={landingPage.body.intro} />
      <LandingFeatures content={landingPage.body.service} />
      <LandingFooter content={landingPage.footer} />
    </Box>
  );
};

Home.getLayout = (page: ReactJSXElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};

export default Home;
