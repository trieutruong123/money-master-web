import { Header, Layout, Link } from "components";


export default function Profile() {
  return (
    <Layout>
      <Header/>
      <h1>Welcome to dashboard</h1>
      <Link href = '/setting'>Settings</Link>
      <Link href = '/dashboard'>Dashboard</Link>
    </Layout>
  );
}

Profile.requireAuth = true;
