import { useRouter } from 'next/router';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DefaultNavbar, DefaultLayout, LoginForm } from 'components';
import Head from 'next/head';

const Login = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Login | Money Master</title>
      </Head>
      <>
        <DefaultNavbar />
        <LoginForm />
      </>
    </>
  );
};
Login.getLayout = (page: ReactJSXElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);
export default Login;
