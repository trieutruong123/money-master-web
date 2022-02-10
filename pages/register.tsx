import { useRouter } from "next/router";
import { RegisterForm, Layout } from "components";

export default function Login() {
  const router = useRouter();
  return (
    <Layout>
      <RegisterForm></RegisterForm>
    </Layout>
  );
}
