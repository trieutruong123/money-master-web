import { Header, Layout, Link } from 'components';

export default function Dashboard() {
  return (
    <Layout>
      <Header />
      <h1>Welcome to Money Master Documentation Page</h1>
      <Link href="/">
        <h1>Back to Homepage</h1>
      </Link>
    </Layout>
  );
}
