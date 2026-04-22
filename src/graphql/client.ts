import { useMemo } from 'react';
import { ApolloClient, ApolloLink, concat, DefaultOptions, HttpLink, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { ENV } from '@configs/env';
import { createClient } from 'graphql-ws';

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
    }
};

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const httpLink = new HttpLink({
    uri: ENV.GRAPHQL_URL
});

const wsLink =
    typeof window !== 'undefined' && ENV.GRAPHQL_WS
        ? new GraphQLWsLink(
              createClient({
                  url: ENV.GRAPHQL_WS,
                  lazy: true,
                  retryAttempts: Infinity,
                  shouldRetry: () => true,
                  webSocketImpl: WebSocket
              })
          )
        : null;

const link =
    typeof window !== 'undefined' && wsLink
        ? split(
              ({ query }) => {
                  const definition = getMainDefinition(query);

                  return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
              },
              wsLink,
              httpLink
          )
        : httpLink;

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers
        }
    }));

    return forward(operation);
});

function createApolloClient() {
    const client = new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: concat(authMiddleware, link),
        cache: new InMemoryCache({}),
        defaultOptions
    });

    return client;
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
    const client = apolloClient ?? createApolloClient();

    if (initialState) {
        const existingCache = client.extract();

        client.cache.restore({
            ...existingCache,
            ...initialState
        });
    }

    if (typeof window === 'undefined') {
        return client;
    }

    if (!apolloClient) {
        apolloClient = client;
    }

    return client;
}

export function useApollo(initialState: NormalizedCacheObject | null) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);

    return store;
}
