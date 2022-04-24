import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { DefaultLayout } from 'containers';
import { Link } from 'shared/components';
import { content } from 'i18n';

const Docs = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale, locales, defaultLocale } = props.context;

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { landingPage } = detail;

  return (
    <>
      <Head>
        <title>Docs | Money Master</title>
      </Head>
      <>
        <h1>Welcome to Money Master Documentation Page</h1>
        <Link href="/">
          <h1>Back to Homepage</h1>
        </Link>
      </>
    </>
  );
};
Docs.getLayout = (page: ReactJSXElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};

export default Docs;
