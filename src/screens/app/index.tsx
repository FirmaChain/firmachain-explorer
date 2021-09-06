import React from 'react';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@src/graphql/client';
import {
  SettingsProvider,
  NetworksProvider,
  ChainProvider,
} from '@contexts';
import Countdown from '@screens/countdown';
import { chainConfig } from '@configs';
import { InnerApp } from './components';
import {
  useApp,
  useGenesis,
} from './hooks';

function App(props: AppProps) {
  useApp();
  const { pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);
  const {
    genesisStarted,
    startGenesis,
  } = useGenesis();
  const { t } = useTranslation();

  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | ${chainConfig.title}`}
        title={t('common:chainName')}
        description={t('common:description')}
        openGraph={{
          title: `${t('common:chainName')} | ${chainConfig.title}`,
          type: 'website',
          site_name: 'FirmaChain Block Explorer',
          url: process.env.NEXT_PUBLIC_URL,
          description: t('common:description'),
          images: [
            {
              url: 'https://s3.ap-northeast-2.amazonaws.com/file.firmachain.org/ogimage.png',
              width: 1100,
              height: 640,
              alt: 'Preview Photo',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          {
            rel: 'apple-touch-icon',
            href: '/icons/apple-touch-icon.png',
            sizes: '180x180',
          },
          {
            rel: 'icon',
            type: 'image/png',
            href: '/icons/favicon-32x32.png',
            sizes: '32x32',
          },
          {
            rel: 'icon',
            type: 'image/png',
            href: '/icons/favicon-16x16.png',
            sizes: '16x16',
          },
          {
            rel: 'manifest',
            href: '/icons/site.webmanifest',
          },
          {
            rel: 'mask-icon',
            href: '/icons/safari-pinned-tab.svg',
            color: '#000000',
          },
          {
            rel: 'shortcut icon',
            href: '/icons/favicon.ico',
          },
        ]}
        additionalMetaTags={[
          {
            property: 'viewport',
            content: 'minimum-scale=1, initial-scale=1, width=device-width',
          },
          {
            property: 'msapplication-TileColor',
            content: '#000000',
          },
          {
            name: 'msapplication-config',
            content: '/icons/browserconfig.xml',
          },
          {
            name: 'theme-color',
            content: '#000000',
          },
        ]}
      />
      <ApolloProvider
        client={apolloClient}
      >
        <SettingsProvider>
          {({ muiTheme }) => {
            return (
              <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                {
                genesisStarted ? (
                  <NetworksProvider>
                    <ChainProvider>
                      <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        hideProgressBar
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                      />
                      <InnerApp {...props} />
                    </ChainProvider>
                  </NetworksProvider>
                ) : (
                  <Countdown startGenesis={startGenesis} />
                )
              }
              </ThemeProvider>
            );
          }}
        </SettingsProvider>
      </ApolloProvider>
    </>
  );
}

export default App;