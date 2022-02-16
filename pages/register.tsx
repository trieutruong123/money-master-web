import { useRouter } from 'next/router';
import { Header, Layout, RegisterForm } from 'components';

export default function Register() {
  const router = useRouter();
  return (
    <Layout>
      <Header />
      <RegisterForm />
    </Layout>
  );
}
