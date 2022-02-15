import Head from "next/head";
import { ReactNode } from "react";
interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  const FOOTER_HEIGHT_PX = "256px";
  return (
    <>
      <Head>
        <title>Money Master</title>
        <link rel='icon' href='images/app-icon.png' />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
        <div>{children}</div>
    </>
  );
}
