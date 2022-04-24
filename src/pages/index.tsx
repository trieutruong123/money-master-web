import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { Box } from '@mui/material';
import { DefaultLayout } from 'containers';
import {
  BrandIntro,
  Footer,
  DefaultNavbar,
  Service,
} from 'containers/landing-page';
import { content } from 'i18n';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

const Home = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { locale } = props.context;

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { landingPage } = detail;

  return (
    <Box >
      <BrandIntro content={landingPage.body.intro} />
      <Service content={landingPage.body.service} />
      <Footer content={landingPage.footer} />
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
