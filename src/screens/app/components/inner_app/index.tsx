import React from 'react';
import { AppProps } from '@src/adapters/app/types';
import { useChainHealthCheck } from './hooks';

function InnerApp({
  Component, pageProps,
}: AppProps) {
  useChainHealthCheck();
  return (
    <Component {...pageProps} />
  );
}

export default InnerApp;
