import { useRouter } from 'next/router';
import { Header, Layout, LoginForm } from 'components';

export default function Login() {
  const router = useRouter();
  return (
    <Layout>
      <Header />
      <LoginForm />
    </Layout>
  );
}
