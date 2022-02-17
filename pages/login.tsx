import { useRouter } from 'next/router';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DefaultNavbar, DefaultLayout, LoginForm } from 'components';

const Login = () => {
  const router = useRouter();
  return (
    <>
      <DefaultNavbar />
      <LoginForm />
    </>
  );
};
Login.getLayout = (page: ReactJSXElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);
export default Login;
