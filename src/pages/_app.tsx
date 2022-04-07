import React from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline, Slide } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { createEmotionCache } from 'utils/create-emotion-cache';
import { theme } from 'theme';
import { AuthGuard } from 'components';

import '../styles/globals.css';

type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
  getLayout?: any;
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
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <>
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
              <SnackbarProvider
                classes={{
                  variantSuccess: 'success.main',
                  variantError: 'error.main',
                  variantWarning: 'warning.main',
                  variantInfo: 'info.main',
                }}
                maxSnack={3}
                dense
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                iconVariant={{
                  success: '✅',
                  error: '✖️',
                  warning: '⚠️',
                  info: 'ℹ️',
                }}
                hideIconVariant={false}
              >
                {Component.requireAuth ? (
                  <AuthGuard>
                    {getLayout(<Component {...pageProps} />)}
                  </AuthGuard>
                ) : (
                  getLayout(<Component {...pageProps} />)
                )}
              </SnackbarProvider>
            </React.StrictMode>
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </>
  );
}
