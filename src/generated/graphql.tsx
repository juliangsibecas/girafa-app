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

export type Mutation = {
  __typename?: 'Mutation';
  generateRecoveryCode: Scalars['Boolean'];
  partyCreate: Party;
  signIn: AuthSignIn;
  signInFromRefreshToken: AuthSignIn;
  signUp: AuthSignIn;
  userChangeAttendingState: Scalars['Boolean'];
  userChangeFollowingState: Scalars['Boolean'];
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

export type Notification = {
  __typename?: 'Notification';
  from: User;
  id: Scalars['String'];
  party?: Maybe<Party>;
  type: NotificationType;
  user: User;
};

export enum NotificationType {
  Follow = 'FOLLOW',
  Invite = 'INVITE'
}

export type Party = {
  __typename?: 'Party';
  address: Scalars['String'];
  allowInivites: Scalars['Boolean'];
  attenders: Array<User>;
  availability: PartyAvailability;
  date: Scalars['Date'];
  description: Scalars['String'];
  id: Scalars['String'];
  invited: Array<User>;
  minAge?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  openBar: Scalars['Boolean'];
  organizer: User;
};

export enum PartyAvailability {
  Followers = 'FOLLOWERS',
  Following = 'FOLLOWING',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type PartyCreateInput = {
  address: Scalars['String'];
  date: Scalars['Date'];
  description: Scalars['String'];
  name: Scalars['String'];
  openBar: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  checkRecoveryCode: Scalars['Boolean'];
  partyGetById: Party;
  partySearch: Array<Party>;
  userGetById: User;
  userSearch: Array<User>;
};


export type QueryCheckRecoveryCodeArgs = {
  data: AuthCheckRecoveryCodeInput;
};


export type QueryPartyGetByIdArgs = {
  id: Scalars['String'];
};


export type QueryPartySearchArgs = {
  q: Scalars['String'];
};


export type QueryUserGetByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserSearchArgs = {
  q: Scalars['String'];
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
  attendedParties: Array<Party>;
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  followers: Array<User>;
  following: Array<User>;
  fullName: Scalars['String'];
  id: Scalars['String'];
  invites: Array<Party>;
  nickname: Scalars['String'];
  notifications: Array<Notification>;
  organizedParties: Array<Party>;
  password?: Maybe<Scalars['String']>;
  recoveryCode?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type UserChangeAttendingStateInput = {
  partyId: Scalars['String'];
  state: Scalars['Boolean'];
};

export type UserChangeFollowingStateInput = {
  followingId: Scalars['String'];
  state: Scalars['Boolean'];
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