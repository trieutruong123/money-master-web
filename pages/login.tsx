import { useRouter } from "next/router";
import { LoginForm, Link } from "components";

export default function Login() {
  const router =useRouter();
  return <LoginForm></LoginForm>;

}