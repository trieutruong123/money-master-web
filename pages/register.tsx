import { useRouter } from 'next/router';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DefaultNavbar, DefaultLayout, RegisterForm } from 'components';

const  Register = () => {
  const router = useRouter();
  return (
    <>
      <DefaultNavbar />
      <RegisterForm />
    </>
  );
}

Register.getLayout = (page: ReactJSXElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default Register;