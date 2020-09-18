import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { Procedure } from 'generated/graphql';

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'https://internal.api.democracy-app.de',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          procedures: {
            keyArgs: ['listTypes'],
            merge(existing = [], incoming: Procedure[]) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});
