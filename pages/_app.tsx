import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { AuthGuard } from 'components';

import '../styles/globals.css';
import { useEffect } from 'react';
import { userService } from 'services';
import { Router } from '@mui/icons-material';

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

export default function MyApp(props: AppProps) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props;

  return (
    <>
      {Component.requireAuth ? (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
