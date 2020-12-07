import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import introspection from 'generated/possible-types';
import { authLinkAfterware, authLinkMiddleware } from './Auth';
import { typePolicies } from './typePolicies';
import { versionLinkMiddleware } from './Version';

const httpLink: any = new HttpLink({
  // uri: 'http://192.168.0.237:3001',
  uri: 'https://internal.api.democracy-app.de',
  // uri: 'https://api.democracy-app.de',
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
    possibleTypes: introspection.possibleTypes,
    typePolicies,
  }),
});
