import Head from 'next/head';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { content } from 'i18n';
import { DefaultLayout, RegisterForm } from 'containers';

const Register = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale, locales, defaultLocale } = props.context;

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { registerPage, landingPage } = detail;
  return (
    <>
      <Head>
        <title>{registerPage.register} | Money Master</title>
      </Head>
      <>
        <RegisterForm content={registerPage} />
      </>
    </>
  );
};

Register.getLayout = (page: ReactJSXElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};

export default Register;
