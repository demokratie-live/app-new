import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  activityIndex?: Maybe<ActivityIndex>;
  currentConferenceWeek: ConferenceWeek;
  deputiesOfConstituency: Array<Deputy>;
  notificationSettings?: Maybe<NotificationSettings>;
  procedure: Procedure;
  procedures: Array<Procedure>;
  proceduresById: Array<Procedure>;
  proceduresByIdHavingVoteResults: ProceduresHavingVoteResults;
  notifiedProcedures: Array<Procedure>;
  /** @deprecated use searchProceduresAutocomplete */
  searchProcedures: Array<Procedure>;
  searchProceduresAutocomplete: SearchProcedures;
  votedProcedures: Array<Procedure>;
  proceduresWithVoteResults: Array<Procedure>;
  mostSearched: Array<SearchTerm>;
  me?: Maybe<User>;
  votes?: Maybe<Vote>;
  communityVotes?: Maybe<CommunityVotes>;
  voteStatistic?: Maybe<VoteStatistic>;
};


export type QueryActivityIndexArgs = {
  procedureId: Scalars['String'];
};


export type QueryDeputiesOfConstituencyArgs = {
  constituency: Scalars['String'];
  directCandidate?: Maybe<Scalars['Boolean']>;
};


export type QueryProcedureArgs = {
  id: Scalars['ID'];
};


export type QueryProceduresArgs = {
  listTypes?: Maybe<Array<ListType>>;
  type?: Maybe<ProcedureType>;
  pageSize?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  filter?: Maybe<ProcedureFilter>;
};


export type QueryProceduresByIdArgs = {
  ids: Array<Scalars['String']>;
  pageSize?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryProceduresByIdHavingVoteResultsArgs = {
  procedureIds?: Maybe<Array<Scalars['String']>>;
  timespan?: Maybe<VotedTimeSpan>;
  pageSize?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  filter?: Maybe<ProcedureWomFilter>;
};


export type QuerySearchProceduresArgs = {
  term: Scalars['String'];
};


export type QuerySearchProceduresAutocompleteArgs = {
  term: Scalars['String'];
};


export type QueryProceduresWithVoteResultsArgs = {
  procedureIds: Array<Scalars['String']>;
};


export type QueryVotesArgs = {
  procedure: Scalars['ID'];
  constituencies?: Maybe<Array<Scalars['String']>>;
};


export type QueryCommunityVotesArgs = {
  procedure: Scalars['ID'];
  constituencies?: Maybe<Array<Scalars['String']>>;
};

export type ActivityIndex = {
  __typename?: 'ActivityIndex';
  activityIndex: Scalars['Int'];
  active?: Maybe<Scalars['Boolean']>;
};

export type ConferenceWeek = {
  __typename?: 'ConferenceWeek';
  start: Scalars['Date'];
  end: Scalars['Date'];
  calendarWeek: Scalars['Int'];
};


export type Deputy = {
  __typename?: 'Deputy';
  _id: Scalars['ID'];
  webId: Scalars['String'];
  imgURL: Scalars['String'];
  name: Scalars['String'];
  party?: Maybe<Scalars['String']>;
  job?: Maybe<Scalars['String']>;
  biography?: Maybe<Scalars['String']>;
  constituency?: Maybe<Scalars['String']>;
  directCandidate?: Maybe<Scalars['Boolean']>;
  contact?: Maybe<DeputyContact>;
  totalProcedures?: Maybe<Scalars['Int']>;
  procedures: Array<DeputyProcedure>;
};


export type DeputyProceduresArgs = {
  procedureIds?: Maybe<Array<Scalars['String']>>;
  pageSize?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeputyContact = {
  __typename?: 'DeputyContact';
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  links: Array<DeputyLink>;
};

export type DeputyLink = {
  __typename?: 'DeputyLink';
  name: Scalars['String'];
  URL: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type DeputyProcedure = {
  __typename?: 'DeputyProcedure';
  decision: VoteSelection;
  procedure: Procedure;
};

export enum VoteSelection {
  Yes = 'YES',
  No = 'NO',
  Abstination = 'ABSTINATION',
  Notvoted = 'NOTVOTED'
}

export type Procedure = {
  __typename?: 'Procedure';
  _id: Scalars['ID'];
  title: Scalars['String'];
  procedureId: Scalars['String'];
  type: Scalars['String'];
  period?: Maybe<Scalars['Int']>;
  currentStatus?: Maybe<Scalars['String']>;
  currentStatusHistory: Array<Scalars['String']>;
  abstract?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  voteDate?: Maybe<Scalars['Date']>;
  voteEnd?: Maybe<Scalars['Date']>;
  voteWeek?: Maybe<Scalars['Int']>;
  voteYear?: Maybe<Scalars['Int']>;
  sessionTOPHeading?: Maybe<Scalars['String']>;
  subjectGroups: Array<Scalars['String']>;
  submissionDate?: Maybe<Scalars['Date']>;
  activityIndex: ActivityIndex;
  votes: Scalars['Int'];
  importantDocuments: Array<Document>;
  voteResults?: Maybe<VoteResult>;
  communityVotes?: Maybe<CommunityVotes>;
  voted: Scalars['Boolean'];
  votedGovernment?: Maybe<Scalars['Boolean']>;
  completed?: Maybe<Scalars['Boolean']>;
  notify?: Maybe<Scalars['Boolean']>;
  /** @deprecated Use listTypes instead of type */
  listType?: Maybe<ProcedureType>;
  list?: Maybe<ListType>;
  verified?: Maybe<Scalars['Boolean']>;
};


export type ProcedureCommunityVotesArgs = {
  constituencies?: Maybe<Array<Scalars['String']>>;
};

export type Document = {
  __typename?: 'Document';
  editor: Scalars['String'];
  number: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type VoteResult = {
  __typename?: 'VoteResult';
  procedureId: Scalars['String'];
  yes: Scalars['Int'];
  no: Scalars['Int'];
  abstination: Scalars['Int'];
  notVoted?: Maybe<Scalars['Int']>;
  /** @deprecated Field no longer supported */
  notVote?: Maybe<Scalars['Int']>;
  governmentDecision: VoteSelection;
  decisionText?: Maybe<Scalars['String']>;
  namedVote: Scalars['Boolean'];
  partyVotes: Array<PartyVote>;
  deputyVotes: Array<DeputyVote>;
};


export type VoteResultDeputyVotesArgs = {
  constituencies?: Maybe<Array<Scalars['String']>>;
  directCandidate?: Maybe<Scalars['Boolean']>;
};

export type PartyVote = {
  __typename?: 'PartyVote';
  party: Scalars['String'];
  main: VoteSelection;
  deviants: Deviants;
};

export type Deviants = {
  __typename?: 'Deviants';
  yes: Scalars['Int'];
  abstination: Scalars['Int'];
  no: Scalars['Int'];
  notVoted?: Maybe<Scalars['Int']>;
};

export type DeputyVote = {
  __typename?: 'DeputyVote';
  deputy: Deputy;
  decision: VoteSelection;
};

export type CommunityVotes = {
  __typename?: 'CommunityVotes';
  yes: Scalars['Int'];
  no: Scalars['Int'];
  abstination: Scalars['Int'];
  total: Scalars['Int'];
  constituencies: Array<CommunityConstituencyVotes>;
};

export type CommunityConstituencyVotes = {
  __typename?: 'CommunityConstituencyVotes';
  constituency: Scalars['String'];
  yes: Scalars['Int'];
  no: Scalars['Int'];
  abstination: Scalars['Int'];
  total: Scalars['Int'];
};

export enum ProcedureType {
  InVote = 'IN_VOTE',
  Preparation = 'PREPARATION',
  Voting = 'VOTING',
  Past = 'PAST',
  Hot = 'HOT'
}

export enum ListType {
  Preparation = 'PREPARATION',
  InVote = 'IN_VOTE',
  Past = 'PAST',
  Hot = 'HOT',
  Top100 = 'TOP100',
  ConferenceweeksPlanned = 'CONFERENCEWEEKS_PLANNED'
}

export type NotificationSettings = {
  __typename?: 'NotificationSettings';
  enabled?: Maybe<Scalars['Boolean']>;
  /** @deprecated <= 1.22 Notification Settings */
  newVote?: Maybe<Scalars['Boolean']>;
  /** @deprecated <= 1.22 Notification Settings */
  newPreperation?: Maybe<Scalars['Boolean']>;
  conferenceWeekPushs?: Maybe<Scalars['Boolean']>;
  voteConferenceWeekPushs?: Maybe<Scalars['Boolean']>;
  voteTOP100Pushs?: Maybe<Scalars['Boolean']>;
  outcomePushs?: Maybe<Scalars['Boolean']>;
  disableUntil?: Maybe<Scalars['Date']>;
  procedures?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ProcedureFilter = {
  subjectGroups?: Maybe<Array<Scalars['String']>>;
  status?: Maybe<Array<Scalars['String']>>;
  type?: Maybe<Array<Scalars['String']>>;
  activity?: Maybe<Array<Scalars['String']>>;
};

export enum VotedTimeSpan {
  CurrentSittingWeek = 'CurrentSittingWeek',
  LastSittingWeek = 'LastSittingWeek',
  CurrentQuarter = 'CurrentQuarter',
  LastQuarter = 'LastQuarter',
  CurrentYear = 'CurrentYear',
  LastYear = 'LastYear',
  Period = 'Period'
}

export type ProcedureWomFilter = {
  subjectGroups: Array<Scalars['String']>;
};

export type ProceduresHavingVoteResults = {
  __typename?: 'ProceduresHavingVoteResults';
  total: Scalars['Int'];
  procedures: Array<Procedure>;
};

export type SearchProcedures = {
  __typename?: 'SearchProcedures';
  procedures: Array<Procedure>;
  autocomplete: Array<Scalars['String']>;
};

export type SearchTerm = {
  __typename?: 'SearchTerm';
  term: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  verified: Scalars['Boolean'];
  /** @deprecated Field no longer supported */
  deviceHash?: Maybe<Scalars['String']>;
};

export type Vote = {
  __typename?: 'Vote';
  _id: Scalars['ID'];
  voted: Scalars['Boolean'];
  voteResults?: Maybe<CommunityVotes>;
};

export type VoteStatistic = {
  __typename?: 'VoteStatistic';
  proceduresCount: Scalars['Int'];
  votedProcedures: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  increaseActivity?: Maybe<ActivityIndex>;
  requestCode: CodeResult;
  requestVerification: VerificationResult;
  addToken: TokenResult;
  updateNotificationSettings?: Maybe<NotificationSettings>;
  toggleNotification?: Maybe<Procedure>;
  finishSearch: SearchTerm;
  signUp?: Maybe<Auth>;
  vote: Vote;
};


export type MutationIncreaseActivityArgs = {
  procedureId: Scalars['String'];
};


export type MutationRequestCodeArgs = {
  newPhone: Scalars['String'];
  oldPhoneHash?: Maybe<Scalars['String']>;
};


export type MutationRequestVerificationArgs = {
  code: Scalars['String'];
  newPhoneHash: Scalars['String'];
  newUser?: Maybe<Scalars['Boolean']>;
};


export type MutationAddTokenArgs = {
  token: Scalars['String'];
  os: Scalars['String'];
};


export type MutationUpdateNotificationSettingsArgs = {
  enabled?: Maybe<Scalars['Boolean']>;
  newVote?: Maybe<Scalars['Boolean']>;
  newPreperation?: Maybe<Scalars['Boolean']>;
  conferenceWeekPushs?: Maybe<Scalars['Boolean']>;
  voteConferenceWeekPushs?: Maybe<Scalars['Boolean']>;
  voteTOP100Pushs?: Maybe<Scalars['Boolean']>;
  outcomePushs?: Maybe<Scalars['Boolean']>;
  outcomePushsEnableOld?: Maybe<Scalars['Boolean']>;
  disableUntil?: Maybe<Scalars['Date']>;
  procedures?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationToggleNotificationArgs = {
  procedureId: Scalars['String'];
};


export type MutationFinishSearchArgs = {
  term: Scalars['String'];
};


export type MutationSignUpArgs = {
  deviceHashEncrypted: Scalars['String'];
};


export type MutationVoteArgs = {
  procedure: Scalars['ID'];
  selection: VoteSelection;
  constituency?: Maybe<Scalars['String']>;
};

export type CodeResult = {
  __typename?: 'CodeResult';
  reason?: Maybe<Scalars['String']>;
  allowNewUser?: Maybe<Scalars['Boolean']>;
  succeeded: Scalars['Boolean'];
  resendTime?: Maybe<Scalars['Date']>;
  expireTime?: Maybe<Scalars['Date']>;
};

export type VerificationResult = {
  __typename?: 'VerificationResult';
  reason?: Maybe<Scalars['String']>;
  succeeded: Scalars['Boolean'];
};

export type TokenResult = {
  __typename?: 'TokenResult';
  succeeded?: Maybe<Scalars['Boolean']>;
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['String'];
};

export type Device = {
  __typename?: 'Device';
  notificationSettings?: Maybe<NotificationSettings>;
};

export type Schema = {
  __typename?: 'Schema';
  query?: Maybe<Query>;
};

export type ListItemFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId' | 'title' | 'sessionTOPHeading'>
  & VoteIndexFragment
  & VoteDateFragment
);

export type VoteDateFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'voteDate' | 'voteEnd'>
);

export type VoteIndexFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'votes' | 'voted'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'verified'>
  )> }
);

export type CommunityVoteResultsQueryVariables = Exact<{
  procedureId: Scalars['ID'];
  constituencies?: Maybe<Array<Scalars['String']>>;
}>;


export type CommunityVoteResultsQuery = (
  { __typename?: 'Query' }
  & { procedure: (
    { __typename?: 'Procedure' }
    & Pick<Procedure, 'procedureId' | 'voted'>
    & { communityVotes?: Maybe<(
      { __typename?: 'CommunityVotes' }
      & Pick<CommunityVotes, 'yes' | 'no' | 'abstination' | 'total'>
      & { constituencies: Array<(
        { __typename?: 'CommunityConstituencyVotes' }
        & Pick<CommunityConstituencyVotes, 'yes' | 'no' | 'abstination' | 'total' | 'constituency'>
      )> }
    )> }
  ) }
);

export type ImportantDocumentFragment = (
  { __typename?: 'Document' }
  & Pick<Document, 'editor' | 'type' | 'url' | 'number'>
);

export type ImportantDocumentsFragment = (
  { __typename?: 'Procedure' }
  & { importantDocuments: Array<(
    { __typename?: 'Document' }
    & ImportantDocumentFragment
  )> }
);

export type DetailGovernmentPieChartFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId'>
  & { voteResults?: Maybe<(
    { __typename?: 'VoteResult' }
    & Pick<VoteResult, 'yes' | 'abstination' | 'no' | 'notVoted' | 'namedVote'>
    & { partyVotes: Array<(
      { __typename?: 'PartyVote' }
      & Pick<PartyVote, 'party'>
    )> }
  )> }
);

export type DetailFractionChartFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId'>
  & { voteResults?: Maybe<(
    { __typename?: 'VoteResult' }
    & Pick<VoteResult, 'namedVote'>
    & { partyVotes: Array<(
      { __typename?: 'PartyVote' }
      & Pick<PartyVote, 'party'>
      & { deviants: (
        { __typename?: 'Deviants' }
        & Pick<Deviants, 'yes' | 'abstination' | 'no' | 'notVoted'>
      ) }
    )> }
  )> }
);

export type GovernmentVoteResultsQueryVariables = Exact<{
  procedureId: Scalars['ID'];
}>;


export type GovernmentVoteResultsQuery = (
  { __typename?: 'Query' }
  & { procedure: (
    { __typename?: 'Procedure' }
    & DetailGovernmentPieChartFragment
    & DetailFractionChartFragment
  ) }
);

export type ProcedureHistoryFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'currentStatus' | 'currentStatusHistory'>
);

export type ProcedureDetailsFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId' | 'subjectGroups' | 'currentStatus' | 'type' | 'submissionDate' | 'voteDate' | 'abstract'>
  & ImportantDocumentsFragment
);

export type ProcedureDetailQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProcedureDetailQuery = (
  { __typename?: 'Query' }
  & { procedure: (
    { __typename?: 'Procedure' }
    & Pick<Procedure, 'procedureId'>
    & ListItemFragment
    & CommunityVotesPieChartFragment
    & GovernmentVotesPieChartFragment
    & ProcedureDetailsFragment
    & ProcedureHistoryFragment
  ) }
);

export type CommunityVotesPieChartFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId' | 'voted'>
  & { communityVotes?: Maybe<(
    { __typename?: 'CommunityVotes' }
    & Pick<CommunityVotes, 'yes' | 'abstination' | 'no'>
  )> }
);

export type GovernmentVotesPieChartFragment = (
  { __typename?: 'Procedure' }
  & { voteResults?: Maybe<(
    { __typename?: 'VoteResult' }
    & Pick<VoteResult, 'yes' | 'abstination' | 'no' | 'notVoted'>
  )> }
);

export type ProceduresListQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  listTypes?: Maybe<Array<ListType>>;
  filter?: Maybe<ProcedureFilter>;
}>;


export type ProceduresListQuery = (
  { __typename?: 'Query' }
  & { procedures: Array<(
    { __typename?: 'Procedure' }
    & Pick<Procedure, 'procedureId' | 'title'>
    & ListItemFragment
    & CommunityVotesPieChartFragment
    & GovernmentVotesPieChartFragment
  )> }
);

export const VoteIndexFragmentDoc = gql`
    fragment VoteIndex on Procedure {
  votes
  voted
}
    `;
export const VoteDateFragmentDoc = gql`
    fragment VoteDate on Procedure {
  voteDate
  voteEnd
}
    `;
export const ListItemFragmentDoc = gql`
    fragment ListItem on Procedure {
  procedureId
  title
  sessionTOPHeading
  ...VoteIndex
  ...VoteDate
}
    ${VoteIndexFragmentDoc}
${VoteDateFragmentDoc}`;
export const DetailGovernmentPieChartFragmentDoc = gql`
    fragment DetailGovernmentPieChart on Procedure {
  procedureId
  voteResults {
    yes
    abstination
    no
    notVoted
    namedVote
    partyVotes {
      party
    }
  }
}
    `;
export const DetailFractionChartFragmentDoc = gql`
    fragment DetailFractionChart on Procedure {
  procedureId
  voteResults {
    namedVote
    partyVotes {
      party
      deviants {
        yes
        abstination
        no
        notVoted
      }
    }
  }
}
    `;
export const ProcedureHistoryFragmentDoc = gql`
    fragment ProcedureHistory on Procedure {
  currentStatus
  currentStatusHistory
}
    `;
export const ImportantDocumentFragmentDoc = gql`
    fragment ImportantDocument on Document {
  editor
  type
  url
  number
}
    `;
export const ImportantDocumentsFragmentDoc = gql`
    fragment ImportantDocuments on Procedure {
  importantDocuments {
    ...ImportantDocument
  }
}
    ${ImportantDocumentFragmentDoc}`;
export const ProcedureDetailsFragmentDoc = gql`
    fragment ProcedureDetails on Procedure {
  procedureId
  subjectGroups
  currentStatus
  type
  submissionDate
  voteDate
  abstract
  ...ImportantDocuments
}
    ${ImportantDocumentsFragmentDoc}`;
export const CommunityVotesPieChartFragmentDoc = gql`
    fragment CommunityVotesPieChart on Procedure {
  procedureId
  communityVotes {
    yes
    abstination
    no
  }
  voted
}
    `;
export const GovernmentVotesPieChartFragmentDoc = gql`
    fragment GovernmentVotesPieChart on Procedure {
  voteResults {
    yes
    abstination
    no
    notVoted
  }
}
    `;
export const MeDocument = gql`
    query Me {
  me {
    _id
    verified
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const CommunityVoteResultsDocument = gql`
    query CommunityVoteResults($procedureId: ID!, $constituencies: [String!]) {
  procedure(id: $procedureId) {
    procedureId
    voted
    communityVotes(constituencies: $constituencies) {
      yes
      no
      abstination
      total
      constituencies {
        yes
        no
        abstination
        total
        constituency
      }
    }
  }
}
    `;

/**
 * __useCommunityVoteResultsQuery__
 *
 * To run a query within a React component, call `useCommunityVoteResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityVoteResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityVoteResultsQuery({
 *   variables: {
 *      procedureId: // value for 'procedureId'
 *      constituencies: // value for 'constituencies'
 *   },
 * });
 */
export function useCommunityVoteResultsQuery(baseOptions?: Apollo.QueryHookOptions<CommunityVoteResultsQuery, CommunityVoteResultsQueryVariables>) {
        return Apollo.useQuery<CommunityVoteResultsQuery, CommunityVoteResultsQueryVariables>(CommunityVoteResultsDocument, baseOptions);
      }
export function useCommunityVoteResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityVoteResultsQuery, CommunityVoteResultsQueryVariables>) {
          return Apollo.useLazyQuery<CommunityVoteResultsQuery, CommunityVoteResultsQueryVariables>(CommunityVoteResultsDocument, baseOptions);
        }
export type CommunityVoteResultsQueryHookResult = ReturnType<typeof useCommunityVoteResultsQuery>;
export type CommunityVoteResultsLazyQueryHookResult = ReturnType<typeof useCommunityVoteResultsLazyQuery>;
export type CommunityVoteResultsQueryResult = Apollo.QueryResult<CommunityVoteResultsQuery, CommunityVoteResultsQueryVariables>;
export const GovernmentVoteResultsDocument = gql`
    query GovernmentVoteResults($procedureId: ID!) {
  procedure(id: $procedureId) {
    ...DetailGovernmentPieChart
    ...DetailFractionChart
  }
}
    ${DetailGovernmentPieChartFragmentDoc}
${DetailFractionChartFragmentDoc}`;

/**
 * __useGovernmentVoteResultsQuery__
 *
 * To run a query within a React component, call `useGovernmentVoteResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGovernmentVoteResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGovernmentVoteResultsQuery({
 *   variables: {
 *      procedureId: // value for 'procedureId'
 *   },
 * });
 */
export function useGovernmentVoteResultsQuery(baseOptions?: Apollo.QueryHookOptions<GovernmentVoteResultsQuery, GovernmentVoteResultsQueryVariables>) {
        return Apollo.useQuery<GovernmentVoteResultsQuery, GovernmentVoteResultsQueryVariables>(GovernmentVoteResultsDocument, baseOptions);
      }
export function useGovernmentVoteResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GovernmentVoteResultsQuery, GovernmentVoteResultsQueryVariables>) {
          return Apollo.useLazyQuery<GovernmentVoteResultsQuery, GovernmentVoteResultsQueryVariables>(GovernmentVoteResultsDocument, baseOptions);
        }
export type GovernmentVoteResultsQueryHookResult = ReturnType<typeof useGovernmentVoteResultsQuery>;
export type GovernmentVoteResultsLazyQueryHookResult = ReturnType<typeof useGovernmentVoteResultsLazyQuery>;
export type GovernmentVoteResultsQueryResult = Apollo.QueryResult<GovernmentVoteResultsQuery, GovernmentVoteResultsQueryVariables>;
export const ProcedureDetailDocument = gql`
    query ProcedureDetail($id: ID!) {
  procedure(id: $id) {
    procedureId
    ...ListItem
    ...CommunityVotesPieChart
    ...GovernmentVotesPieChart
    ...ProcedureDetails
    ...ProcedureHistory
  }
}
    ${ListItemFragmentDoc}
${CommunityVotesPieChartFragmentDoc}
${GovernmentVotesPieChartFragmentDoc}
${ProcedureDetailsFragmentDoc}
${ProcedureHistoryFragmentDoc}`;

/**
 * __useProcedureDetailQuery__
 *
 * To run a query within a React component, call `useProcedureDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useProcedureDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProcedureDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProcedureDetailQuery(baseOptions?: Apollo.QueryHookOptions<ProcedureDetailQuery, ProcedureDetailQueryVariables>) {
        return Apollo.useQuery<ProcedureDetailQuery, ProcedureDetailQueryVariables>(ProcedureDetailDocument, baseOptions);
      }
export function useProcedureDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProcedureDetailQuery, ProcedureDetailQueryVariables>) {
          return Apollo.useLazyQuery<ProcedureDetailQuery, ProcedureDetailQueryVariables>(ProcedureDetailDocument, baseOptions);
        }
export type ProcedureDetailQueryHookResult = ReturnType<typeof useProcedureDetailQuery>;
export type ProcedureDetailLazyQueryHookResult = ReturnType<typeof useProcedureDetailLazyQuery>;
export type ProcedureDetailQueryResult = Apollo.QueryResult<ProcedureDetailQuery, ProcedureDetailQueryVariables>;
export const ProceduresListDocument = gql`
    query ProceduresList($offset: Int, $pageSize: Int, $listTypes: [ListType!], $filter: ProcedureFilter) {
  procedures(offset: $offset, pageSize: $pageSize, listTypes: $listTypes, filter: $filter) {
    procedureId
    title
    ...ListItem
    ...CommunityVotesPieChart
    ...GovernmentVotesPieChart
  }
}
    ${ListItemFragmentDoc}
${CommunityVotesPieChartFragmentDoc}
${GovernmentVotesPieChartFragmentDoc}`;

/**
 * __useProceduresListQuery__
 *
 * To run a query within a React component, call `useProceduresListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProceduresListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProceduresListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      pageSize: // value for 'pageSize'
 *      listTypes: // value for 'listTypes'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useProceduresListQuery(baseOptions?: Apollo.QueryHookOptions<ProceduresListQuery, ProceduresListQueryVariables>) {
        return Apollo.useQuery<ProceduresListQuery, ProceduresListQueryVariables>(ProceduresListDocument, baseOptions);
      }
export function useProceduresListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProceduresListQuery, ProceduresListQueryVariables>) {
          return Apollo.useLazyQuery<ProceduresListQuery, ProceduresListQueryVariables>(ProceduresListDocument, baseOptions);
        }
export type ProceduresListQueryHookResult = ReturnType<typeof useProceduresListQuery>;
export type ProceduresListLazyQueryHookResult = ReturnType<typeof useProceduresListLazyQuery>;
export type ProceduresListQueryResult = Apollo.QueryResult<ProceduresListQuery, ProceduresListQueryVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    