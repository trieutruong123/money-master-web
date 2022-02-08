import Head from "next/head";
import type { AppProps } from "next/app";
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Money Master</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" type="image/png" href="images/app-icon.png" />
    
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
