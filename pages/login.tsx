import { useRouter } from 'next/router';
import { LoginForm, Layout } from 'components';

export default function Login() {
  const router = useRouter();
  return <LoginForm></LoginForm>;
}
