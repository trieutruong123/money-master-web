import { lazy } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next/types';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DefaultLayout } from 'containers/layouts';
import LandingPage from 'containers/landing-page/landing-page-main';

const MainPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <LandingPage />
    </>
  );
};

MainPage.getLayout = (page: ReactJSXElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};

export default MainPage;
