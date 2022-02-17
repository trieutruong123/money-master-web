import { useRouter } from 'next/router';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DefaultNavbar, DefaultLayout, RegisterForm } from 'components';
import { Head } from 'next/head';

const Register = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Register | Money Master</title>
      </Head>
      <>
        <DefaultNavbar />
        <RegisterForm />
      </>
    </>
  );
};

Register.getLayout = (page: ReactJSXElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default Register;
