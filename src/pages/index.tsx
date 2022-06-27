import { lazy, Suspense } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next/types';
import { HypnosisLoading } from 'shared/components';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DefaultLayout } from 'containers/layouts';

const LandingPage = lazy(
  () => import('containers/landing-page/landing-page-main'),
);

const MainPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Suspense fallback={<HypnosisLoading />}>
      <LandingPage />
    </Suspense>
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
