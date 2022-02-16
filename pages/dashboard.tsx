import { Header, Layout, Link } from "components";


export default function Dashboard() {
  return (
    <Layout>
      <Header/>
      <h1>Welcome to dashboard</h1>
      <Link href = '/setting'>Settings</Link>
      <Link href = '/profile'>Profile</Link>
    </Layout>
  );
}

Dashboard.requireAuth = true;
