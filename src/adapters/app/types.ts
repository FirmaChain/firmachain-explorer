import { ComponentType } from 'react';

export type AppProps = {
    Component: ComponentType<unknown>;
    pageProps: any;
    router?: any;
};
