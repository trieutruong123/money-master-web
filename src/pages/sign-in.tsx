import Head from 'next/head';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { DefaultLayout, LoginForm } from 'containers';

const Login = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale, locales, defaultLocale } = props.context;

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { signInPage, landingPage } = detail;
  return (
    <>
      <Head>
        <title>{signInPage.signIn} | Money Master</title>
      </Head>
      <>
        <LoginForm content={signInPage} />
      </>
    </>
  );
};

Login.getLayout = (page: ReactJSXElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};
export default Login;
