import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { Procedure } from 'generated/graphql';
import { authLinkAfterware, authLinkMiddleware } from './Auth';
import { versionLinkMiddleware } from './Version';

const httpLink: any = new HttpLink({
  uri: 'https://internal.api.democracy-app.de',
});

const link = ApolloLink.from([
  // retryLink,
  // errorLink,
  versionLinkMiddleware,
  authLinkMiddleware,
  authLinkAfterware,
  httpLink,
]);

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link,
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
      Procedure: {
        keyFields: ['procedureId'],
      },
      CommunityConstituencyVotes: {
        keyFields: ['constituency'],
      },
    },
  }),
});
