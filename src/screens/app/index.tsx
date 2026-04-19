import { AppProps } from '@/adapters/app/types';
import { useApollo } from '@/graphql/client';
import { ApolloProvider } from '@apollo/client';

import { Main } from './components';
import { useApp } from './hooks';

function App(props: AppProps) {
    useApp();
    const { pageProps } = props;
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <Main {...props} />
        </ApolloProvider>
    );
}

export default App;
