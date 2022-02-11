import Head from "next/head";
import type { AppProps } from "next/app";
import { Layout } from "components";
import "../styles/globals.css";

function MyApp({ Component, pageProps}: AppProps) {
  const FOOTER_HEIGHT_PX = "256px";
  return (
    <>
      <Head>
        <title>Money Master</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" type="image/png" href="images/app-icon.png" />
      </Head>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
