import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
};

export type AuthCheckRecoveryCodeInput = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type AuthSignIn = {
  __typename?: 'AuthSignIn';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  userId: Scalars['String'];
};

export type AuthSignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthSignUpInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
};

export type Coordinates = {
  __typename?: 'Coordinates';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type CoordinatesCreateInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  generateRecoveryCode: Scalars['Boolean'];
  partyCreate: Party;
  signIn: AuthSignIn;
  signInFromRefreshToken: AuthSignIn;
  signUp: AuthSignIn;
  userChangeAttendingState: Scalars['Boolean'];
  userChangeFollowingState: Scalars['Boolean'];
  userSendPartyInvite: Scalars['Boolean'];
};


export type MutationGenerateRecoveryCodeArgs = {
  email: Scalars['String'];
};


export type MutationPartyCreateArgs = {
  data: PartyCreateInput;
};


export type MutationSignInArgs = {
  data: AuthSignInInput;
};


export type MutationSignUpArgs = {
  data: AuthSignUpInput;
};


export type MutationUserChangeAttendingStateArgs = {
  data: UserChangeAttendingStateInput;
};


export type MutationUserChangeFollowingStateArgs = {
  data: UserChangeFollowingStateInput;
};


export type MutationUserSendPartyInviteArgs = {
  data: UserSendPartyInviteInput;
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['String'];
  createdAt: Scalars['Date'];
  from: User;
  party?: Maybe<Party>;
  type: NotificationType;
  updatedAt: Scalars['Date'];
  user: User;
};

export enum NotificationType {
  Follow = 'FOLLOW',
  Invite = 'INVITE'
}

export type Party = {
  __typename?: 'Party';
  _id: Scalars['String'];
  address: Scalars['String'];
  allowInivites: Scalars['Boolean'];
  attenders: Array<User>;
  attendersCount: Scalars['Float'];
  availability: PartyAvailability;
  coordinates: Coordinates;
  createdAt: Scalars['Date'];
  date: Scalars['Date'];
  description: Scalars['String'];
  invited: Array<User>;
  minAge?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  openBar: Scalars['Boolean'];
  organizer: User;
  updatedAt: Scalars['Date'];
};

export enum PartyAvailability {
  Followers = 'FOLLOWERS',
  Following = 'FOLLOWING',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type PartyCreateInput = {
  address: Scalars['String'];
  availability: PartyAvailability;
  coordinate: CoordinatesCreateInput;
  date: Scalars['Date'];
  description: Scalars['String'];
  name: Scalars['String'];
  openBar: Scalars['Boolean'];
};

export type PartyGetByIdResponse = {
  __typename?: 'PartyGetByIdResponse';
  _id: Scalars['String'];
  address: Scalars['String'];
  allowInvites: Scalars['Boolean'];
  attenders: Array<User>;
  attendersCount: Scalars['Float'];
  availability: PartyAvailability;
  date: Scalars['Date'];
  description: Scalars['String'];
  isAttender: Scalars['Boolean'];
  name: Scalars['String'];
  openBar: Scalars['Boolean'];
  organizer: User;
};

export type PartySearchAttendersInput = {
  id: Scalars['String'];
  q?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  checkRecoveryCode: Scalars['Boolean'];
  partyGetById: PartyGetByIdResponse;
  partySearch: Array<Party>;
  partySearchAttenders: Array<User>;
  userGetById: User;
  userSearch: Array<User>;
  userSearchFollowersToInvite: Array<User>;
};


export type QueryCheckRecoveryCodeArgs = {
  data: AuthCheckRecoveryCodeInput;
};


export type QueryPartyGetByIdArgs = {
  id: Scalars['String'];
};


export type QueryPartySearchArgs = {
  q?: InputMaybe<Scalars['String']>;
};


export type QueryPartySearchAttendersArgs = {
  data: PartySearchAttendersInput;
};


export type QueryUserGetByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserSearchArgs = {
  q?: InputMaybe<Scalars['String']>;
};


export type QueryUserSearchFollowersToInviteArgs = {
  data: UserSearchFollowersToInviteInput;
};

export type Subscription = {
  __typename?: 'Subscription';
  notifications: Notification;
};


export type SubscriptionNotificationsArgs = {
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  attendedParties: Array<Party>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  followers: Array<User>;
  following: Array<User>;
  fullName: Scalars['String'];
  invites: Array<Party>;
  nickname: Scalars['String'];
  notifications: Array<Notification>;
  organizedParties: Array<Party>;
  password?: Maybe<Scalars['String']>;
  recoveryCode?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type UserChangeAttendingStateInput = {
  partyId: Scalars['String'];
  state: Scalars['Boolean'];
};

export type UserChangeFollowingStateInput = {
  followingId: Scalars['String'];
  state: Scalars['Boolean'];
};

export type UserSearchFollowersToInviteInput = {
  partyId: Scalars['String'];
  q?: InputMaybe<Scalars['String']>;
};

export type UserSendPartyInviteInput = {
  invitedId: Array<Scalars['String']>;
  partyId: Scalars['String'];
};

export type SignUpMutationVariables = Exact<{
  data: AuthSignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'AuthSignIn', userId: string, accessToken: string, refreshToken: string } };

export type SignInMutationVariables = Exact<{
  data: AuthSignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthSignIn', userId: string, accessToken: string, refreshToken: string } };

export type SignInFromRefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type SignInFromRefreshTokenMutation = { __typename?: 'Mutation', signInFromRefreshToken: { __typename?: 'AuthSignIn', userId: string, accessToken: string, refreshToken: string } };

export type PartySearchQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']>;
}>;


export type PartySearchQuery = { __typename?: 'Query', partySearch: Array<{ __typename?: 'Party', _id: string, name: string, date: any, organizer: { __typename?: 'User', nickname: string }, coordinates: { __typename?: 'Coordinates', latitude: number, longitude: number } }> };

export type PartyGetByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PartyGetByIdQuery = { __typename?: 'Query', partyGetById: { __typename?: 'PartyGetByIdResponse', _id: string, name: string, address: string, date: any, openBar: boolean, description: string, attendersCount: number, allowInvites: boolean, isAttender: boolean, organizer: { __typename?: 'User', nickname: string }, attenders: Array<{ __typename?: 'User', _id: string }> } };

export type PartySearchAttendersQueryVariables = Exact<{
  data: PartySearchAttendersInput;
}>;


export type PartySearchAttendersQuery = { __typename?: 'Query', partySearchAttenders: Array<{ __typename?: 'User', _id: string, nickname: string, fullName: string }> };

export type UserSearchQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']>;
}>;


export type UserSearchQuery = { __typename?: 'Query', userSearch: Array<{ __typename?: 'User', _id: string, nickname: string, fullName: string }> };

export type UserSearchFollowersToInviteQueryVariables = Exact<{
  data: UserSearchFollowersToInviteInput;
}>;


export type UserSearchFollowersToInviteQuery = { __typename?: 'Query', userSearchFollowersToInvite: Array<{ __typename?: 'User', _id: string, nickname: string, fullName: string }> };

export type UserChangeAttendingStateMutationVariables = Exact<{
  data: UserChangeAttendingStateInput;
}>;


export type UserChangeAttendingStateMutation = { __typename?: 'Mutation', userChangeAttendingState: boolean };

export type UserSendPartyInviteMutationVariables = Exact<{
  data: UserSendPartyInviteInput;
}>;


export type UserSendPartyInviteMutation = { __typename?: 'Mutation', userSendPartyInvite: boolean };


export const SignUpDocument = gql`
    mutation signUp($data: AuthSignUpInput!) {
  signUp(data: $data) {
    userId
    accessToken
    refreshToken
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SignInDocument = gql`
    mutation signIn($data: AuthSignInInput!) {
  signIn(data: $data) {
    userId
    accessToken
    refreshToken
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignInFromRefreshTokenDocument = gql`
    mutation signInFromRefreshToken {
  signInFromRefreshToken {
    userId
    accessToken
    refreshToken
  }
}
    `;
export type SignInFromRefreshTokenMutationFn = Apollo.MutationFunction<SignInFromRefreshTokenMutation, SignInFromRefreshTokenMutationVariables>;

/**
 * __useSignInFromRefreshTokenMutation__
 *
 * To run a mutation, you first call `useSignInFromRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInFromRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInFromRefreshTokenMutation, { data, loading, error }] = useSignInFromRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignInFromRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<SignInFromRefreshTokenMutation, SignInFromRefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInFromRefreshTokenMutation, SignInFromRefreshTokenMutationVariables>(SignInFromRefreshTokenDocument, options);
      }
export type SignInFromRefreshTokenMutationHookResult = ReturnType<typeof useSignInFromRefreshTokenMutation>;
export type SignInFromRefreshTokenMutationResult = Apollo.MutationResult<SignInFromRefreshTokenMutation>;
export type SignInFromRefreshTokenMutationOptions = Apollo.BaseMutationOptions<SignInFromRefreshTokenMutation, SignInFromRefreshTokenMutationVariables>;
export const PartySearchDocument = gql`
    query partySearch($q: String) {
  partySearch(q: $q) {
    _id
    name
    organizer {
      nickname
    }
    coordinates {
      latitude
      longitude
    }
    date
  }
}
    `;

/**
 * __usePartySearchQuery__
 *
 * To run a query within a React component, call `usePartySearchQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartySearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartySearchQuery({
 *   variables: {
 *      q: // value for 'q'
 *   },
 * });
 */
export function usePartySearchQuery(baseOptions?: Apollo.QueryHookOptions<PartySearchQuery, PartySearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartySearchQuery, PartySearchQueryVariables>(PartySearchDocument, options);
      }
export function usePartySearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartySearchQuery, PartySearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartySearchQuery, PartySearchQueryVariables>(PartySearchDocument, options);
        }
export type PartySearchQueryHookResult = ReturnType<typeof usePartySearchQuery>;
export type PartySearchLazyQueryHookResult = ReturnType<typeof usePartySearchLazyQuery>;
export type PartySearchQueryResult = Apollo.QueryResult<PartySearchQuery, PartySearchQueryVariables>;
export const PartyGetByIdDocument = gql`
    query partyGetById($id: String!) {
  partyGetById(id: $id) {
    _id
    name
    organizer {
      nickname
    }
    address
    date
    openBar
    description
    attenders {
      _id
    }
    attendersCount
    allowInvites
    isAttender
  }
}
    `;

/**
 * __usePartyGetByIdQuery__
 *
 * To run a query within a React component, call `usePartyGetByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartyGetByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartyGetByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePartyGetByIdQuery(baseOptions: Apollo.QueryHookOptions<PartyGetByIdQuery, PartyGetByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartyGetByIdQuery, PartyGetByIdQueryVariables>(PartyGetByIdDocument, options);
      }
export function usePartyGetByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartyGetByIdQuery, PartyGetByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartyGetByIdQuery, PartyGetByIdQueryVariables>(PartyGetByIdDocument, options);
        }
export type PartyGetByIdQueryHookResult = ReturnType<typeof usePartyGetByIdQuery>;
export type PartyGetByIdLazyQueryHookResult = ReturnType<typeof usePartyGetByIdLazyQuery>;
export type PartyGetByIdQueryResult = Apollo.QueryResult<PartyGetByIdQuery, PartyGetByIdQueryVariables>;
export const PartySearchAttendersDocument = gql`
    query partySearchAttenders($data: PartySearchAttendersInput!) {
  partySearchAttenders(data: $data) {
    _id
    nickname
    fullName
  }
}
    `;

/**
 * __usePartySearchAttendersQuery__
 *
 * To run a query within a React component, call `usePartySearchAttendersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartySearchAttendersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartySearchAttendersQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function usePartySearchAttendersQuery(baseOptions: Apollo.QueryHookOptions<PartySearchAttendersQuery, PartySearchAttendersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartySearchAttendersQuery, PartySearchAttendersQueryVariables>(PartySearchAttendersDocument, options);
      }
export function usePartySearchAttendersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartySearchAttendersQuery, PartySearchAttendersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartySearchAttendersQuery, PartySearchAttendersQueryVariables>(PartySearchAttendersDocument, options);
        }
export type PartySearchAttendersQueryHookResult = ReturnType<typeof usePartySearchAttendersQuery>;
export type PartySearchAttendersLazyQueryHookResult = ReturnType<typeof usePartySearchAttendersLazyQuery>;
export type PartySearchAttendersQueryResult = Apollo.QueryResult<PartySearchAttendersQuery, PartySearchAttendersQueryVariables>;
export const UserSearchDocument = gql`
    query userSearch($q: String) {
  userSearch(q: $q) {
    _id
    nickname
    fullName
  }
}
    `;

/**
 * __useUserSearchQuery__
 *
 * To run a query within a React component, call `useUserSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSearchQuery({
 *   variables: {
 *      q: // value for 'q'
 *   },
 * });
 */
export function useUserSearchQuery(baseOptions?: Apollo.QueryHookOptions<UserSearchQuery, UserSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserSearchQuery, UserSearchQueryVariables>(UserSearchDocument, options);
      }
export function useUserSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserSearchQuery, UserSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserSearchQuery, UserSearchQueryVariables>(UserSearchDocument, options);
        }
export type UserSearchQueryHookResult = ReturnType<typeof useUserSearchQuery>;
export type UserSearchLazyQueryHookResult = ReturnType<typeof useUserSearchLazyQuery>;
export type UserSearchQueryResult = Apollo.QueryResult<UserSearchQuery, UserSearchQueryVariables>;
export const UserSearchFollowersToInviteDocument = gql`
    query userSearchFollowersToInvite($data: UserSearchFollowersToInviteInput!) {
  userSearchFollowersToInvite(data: $data) {
    _id
    nickname
    fullName
  }
}
    `;

/**
 * __useUserSearchFollowersToInviteQuery__
 *
 * To run a query within a React component, call `useUserSearchFollowersToInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSearchFollowersToInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSearchFollowersToInviteQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserSearchFollowersToInviteQuery(baseOptions: Apollo.QueryHookOptions<UserSearchFollowersToInviteQuery, UserSearchFollowersToInviteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserSearchFollowersToInviteQuery, UserSearchFollowersToInviteQueryVariables>(UserSearchFollowersToInviteDocument, options);
      }
export function useUserSearchFollowersToInviteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserSearchFollowersToInviteQuery, UserSearchFollowersToInviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserSearchFollowersToInviteQuery, UserSearchFollowersToInviteQueryVariables>(UserSearchFollowersToInviteDocument, options);
        }
export type UserSearchFollowersToInviteQueryHookResult = ReturnType<typeof useUserSearchFollowersToInviteQuery>;
export type UserSearchFollowersToInviteLazyQueryHookResult = ReturnType<typeof useUserSearchFollowersToInviteLazyQuery>;
export type UserSearchFollowersToInviteQueryResult = Apollo.QueryResult<UserSearchFollowersToInviteQuery, UserSearchFollowersToInviteQueryVariables>;
export const UserChangeAttendingStateDocument = gql`
    mutation userChangeAttendingState($data: UserChangeAttendingStateInput!) {
  userChangeAttendingState(data: $data)
}
    `;
export type UserChangeAttendingStateMutationFn = Apollo.MutationFunction<UserChangeAttendingStateMutation, UserChangeAttendingStateMutationVariables>;

/**
 * __useUserChangeAttendingStateMutation__
 *
 * To run a mutation, you first call `useUserChangeAttendingStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserChangeAttendingStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userChangeAttendingStateMutation, { data, loading, error }] = useUserChangeAttendingStateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserChangeAttendingStateMutation(baseOptions?: Apollo.MutationHookOptions<UserChangeAttendingStateMutation, UserChangeAttendingStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserChangeAttendingStateMutation, UserChangeAttendingStateMutationVariables>(UserChangeAttendingStateDocument, options);
      }
export type UserChangeAttendingStateMutationHookResult = ReturnType<typeof useUserChangeAttendingStateMutation>;
export type UserChangeAttendingStateMutationResult = Apollo.MutationResult<UserChangeAttendingStateMutation>;
export type UserChangeAttendingStateMutationOptions = Apollo.BaseMutationOptions<UserChangeAttendingStateMutation, UserChangeAttendingStateMutationVariables>;
export const UserSendPartyInviteDocument = gql`
    mutation userSendPartyInvite($data: UserSendPartyInviteInput!) {
  userSendPartyInvite(data: $data)
}
    `;
export type UserSendPartyInviteMutationFn = Apollo.MutationFunction<UserSendPartyInviteMutation, UserSendPartyInviteMutationVariables>;

/**
 * __useUserSendPartyInviteMutation__
 *
 * To run a mutation, you first call `useUserSendPartyInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserSendPartyInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSendPartyInviteMutation, { data, loading, error }] = useUserSendPartyInviteMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserSendPartyInviteMutation(baseOptions?: Apollo.MutationHookOptions<UserSendPartyInviteMutation, UserSendPartyInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserSendPartyInviteMutation, UserSendPartyInviteMutationVariables>(UserSendPartyInviteDocument, options);
      }
export type UserSendPartyInviteMutationHookResult = ReturnType<typeof useUserSendPartyInviteMutation>;
export type UserSendPartyInviteMutationResult = Apollo.MutationResult<UserSendPartyInviteMutation>;
export type UserSendPartyInviteMutationOptions = Apollo.BaseMutationOptions<UserSendPartyInviteMutation, UserSendPartyInviteMutationVariables>;