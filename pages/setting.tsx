import { Header, Layout, Link } from 'components';

export default function Setting() {
  return (
    <Layout>
      <Header />
      <h1>Welcome to dashboard</h1>
      <Link href="/profile">Profile</Link>
      <Link href="/dashboard">Dashboard</Link>
    </Layout>
  );
}

Setting.requireAuth = true;
