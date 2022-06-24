import React, { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { createEmotionCache } from 'utils/create-emotion-cache';
import { theme } from 'shared/theme';
import { AuthGuard } from 'containers';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: AppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  }: {
    Component: NextApplicationPage;
    emotionCache?: EmotionCache;
    pageProps: any;
  } = props;

  const AnyComponent = Component as any;
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <div>
      <Head>
        <title>Money Master</title>
        <link rel="icon" href="/images/app-icon.png" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <CacheProvider value={emotionCache}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <React.StrictMode>
              {Component.requireAuth ? (
                <AuthGuard>
                  {getLayout(<AnyComponent {...pageProps} />)}
                </AuthGuard>
              ) : (
                getLayout(<AnyComponent {...pageProps} />)
              )}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </React.StrictMode>
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </div>
  );
}
