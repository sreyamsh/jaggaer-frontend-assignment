import { HttpLink } from '@apollo/client';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_ENDPOINT || '/api/graphql',
  credentials: 'same-origin',
});

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            cart: {
              merge: true,
            },
          },
        },
      },
    }),
    link: httpLink,
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
    },
  });
});
