import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import {
  DeputyProcedure,
  Procedure,
  ProceduresHavingVoteResults,
} from 'generated/graphql';
import { authLinkAfterware, authLinkMiddleware } from './Auth';
import { versionLinkMiddleware } from './Version';
import { uniqBy } from 'lodash';

const httpLink: any = new HttpLink({
  // uri: 'http://192.168.0.237:3001',
  // uri: 'https://internal.api.democracy-app.de',
  uri: 'https://api.democracy-app.de',
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
            keyArgs: ['listTypes', 'filter'],
            merge(existing: Procedure[] = [], incoming: Procedure[]) {
              return uniqBy([...existing, ...incoming], (procedure) => {
                return procedure.procedureId || (procedure as any).__ref;
              });
            },
          },
          proceduresByIdHavingVoteResults: {
            keyArgs: ['procedureIds'],
            merge(
              existing: ProceduresHavingVoteResults,
              incoming: ProceduresHavingVoteResults,
            ): ProceduresHavingVoteResults {
              return {
                ...existing,
                ...incoming,
                procedures: uniqBy(
                  [...(existing?.procedures || []), ...incoming.procedures],
                  (procedure) => {
                    return procedure.procedureId || (procedure as any).__ref;
                  },
                ),
              };
            },
          },
        },
      },
      Procedure: {
        keyFields: ['procedureId'],
        fields: {
          communityVotes: {
            merge(existing, incoming: any) {
              if (!existing && !incoming) {
                return null;
              }
              return { ...existing, ...incoming };
            },
          },
          voteResults: {
            merge(existing, incoming: any) {
              if (!existing && !incoming) {
                return null;
              }
              return { ...existing, ...incoming };
            },
          },
        },
      },
      CommunityConstituencyVotes: {
        keyFields: ['constituency'],
      },
      Deputy: {
        keyFields: ['_id'],
        fields: {
          procedures: {
            keyArgs: ['procedureIds'],
            merge(
              existing: DeputyProcedure[] = [],
              incoming: DeputyProcedure[],
            ) {
              return uniqBy([...existing, ...incoming], (deputyProcedure) => {
                return (
                  deputyProcedure.procedure.procedureId ||
                  (deputyProcedure.procedure as any).__ref
                );
              });
            },
          },
        },
      },
    },
  }),
});
