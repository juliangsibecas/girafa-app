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
  Date: any;
  DateTime: any;
};

export type AuthChangePasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type AuthGenerateRecoveryCodeInput = {
  email: Scalars['String'];
};

export type AuthRecoverPasswordInput = {
  code: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthSignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthSignInResponse = {
  __typename?: 'AuthSignInResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  userId: Scalars['String'];
};

export type AuthSignUpInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
};

export type Coordinate = {
  __typename?: 'Coordinate';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type CoordinateCreateInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type FeatureToggle = {
  __typename?: 'FeatureToggle';
  _id: Scalars['String'];
  name: FeatureToggleName;
  value: Scalars['Boolean'];
};

export type FeatureToggleChangeValueInput = {
  name: FeatureToggleName;
  value: Scalars['Boolean'];
};

export type FeatureToggleCreateInput = {
  name: FeatureToggleName;
  value: Scalars['Boolean'];
};

export enum FeatureToggleName {
  Mailing = 'MAILING',
  NotificationGet = 'NOTIFICATION_GET',
  PartyCreate = 'PARTY_CREATE',
  PartyDelete = 'PARTY_DELETE',
  PartyGet = 'PARTY_GET',
  PartySearchAttenders = 'PARTY_SEARCH_ATTENDERS',
  SignUp = 'SIGN_UP',
  UserChangeAttendingState = 'USER_CHANGE_ATTENDING_STATE',
  UserChangeFollowingState = 'USER_CHANGE_FOLLOWING_STATE',
  UserDelete = 'USER_DELETE',
  UserEdit = 'USER_EDIT',
  UserGet = 'USER_GET',
  UserGetAttendedParties = 'USER_GET_ATTENDED_PARTIES',
  UserGetFollowers = 'USER_GET_FOLLOWERS',
  UserGetFollowing = 'USER_GET_FOLLOWING',
  UserSearchFollowersToInvite = 'USER_SEARCH_FOLLOWERS_TO_INVITE',
  UserSendPartyInvite = 'USER_SEND_PARTY_INVITE'
}

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['Boolean'];
  featureToggleChangeValue: Scalars['Boolean'];
  featureToggleCreate: Scalars['Boolean'];
  generateRecoveryCode: Scalars['Boolean'];
  partyCreate: Scalars['String'];
  partyDelete: Scalars['Boolean'];
  partyEnable: Scalars['Boolean'];
  recoverPassword: Scalars['Boolean'];
  signIn: AuthSignInResponse;
  signUp: AuthSignInResponse;
  supportSendMessage: Scalars['Boolean'];
  userChangeAttendingState: Scalars['Boolean'];
  userChangeFollowingState: Scalars['Boolean'];
  userDelete: Scalars['Boolean'];
  userEdit: Scalars['Boolean'];
  userSendPartyInvite: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  data: AuthChangePasswordInput;
};


export type MutationFeatureToggleChangeValueArgs = {
  data: FeatureToggleChangeValueInput;
};


export type MutationFeatureToggleCreateArgs = {
  data: FeatureToggleCreateInput;
};


export type MutationGenerateRecoveryCodeArgs = {
  data: AuthGenerateRecoveryCodeInput;
};


export type MutationPartyCreateArgs = {
  data: PartyCreateInput;
};


export type MutationPartyDeleteArgs = {
  id: Scalars['String'];
};


export type MutationPartyEnableArgs = {
  id: Scalars['String'];
};


export type MutationRecoverPasswordArgs = {
  data: AuthRecoverPasswordInput;
};


export type MutationSignInArgs = {
  data: AuthSignInInput;
};


export type MutationSignUpArgs = {
  data: AuthSignUpInput;
};


export type MutationSupportSendMessageArgs = {
  data: SupportSendMessageInput;
};


export type MutationUserChangeAttendingStateArgs = {
  data: UserChangeAttendingStateInput;
};


export type MutationUserChangeFollowingStateArgs = {
  data: UserChangeFollowingStateInput;
};


export type MutationUserEditArgs = {
  data: UserEditInput;
};


export type MutationUserSendPartyInviteArgs = {
  data: UserSendPartyInviteInput;
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  from: User;
  party?: Maybe<Party>;
  type: NotificationType;
  updatedAt?: Maybe<Scalars['DateTime']>;
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
  allowInvites: Scalars['Boolean'];
  attenders: Array<User>;
  attendersCount: Scalars['Float'];
  availability: PartyAvailability;
  coordinate: Coordinate;
  createdAt: Scalars['DateTime'];
  date: Scalars['Date'];
  description: Scalars['String'];
  invited: Array<User>;
  isEnabled: Scalars['Boolean'];
  isExpired: Scalars['Boolean'];
  name: Scalars['String'];
  openBar: Scalars['Boolean'];
  organizer: User;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum PartyAvailability {
  Followers = 'FOLLOWERS',
  Following = 'FOLLOWING',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type PartyCreateInput = {
  address: Scalars['String'];
  allowInvites: Scalars['Boolean'];
  availability: PartyAvailability;
  coordinate: CoordinateCreateInput;
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
  isExpired: Scalars['Boolean'];
  isOrganizer: Scalars['Boolean'];
  name: Scalars['String'];
  openBar: Scalars['Boolean'];
  organizer: User;
};

export type PartyMapPreview = {
  __typename?: 'PartyMapPreview';
  _id: Scalars['String'];
  coordinate: Coordinate;
  date: Scalars['Date'];
  name: Scalars['String'];
  organizerNickname?: Maybe<Scalars['String']>;
};

export type PartyPreview = {
  __typename?: 'PartyPreview';
  _id: Scalars['String'];
  name: Scalars['String'];
  organizerNickname?: Maybe<Scalars['String']>;
};

export type PartySearchAttendersInput = {
  id: Scalars['String'];
  q?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  featureToggleGetEnabledNames: Array<FeatureToggleName>;
  featureToggleList: Array<FeatureToggle>;
  notificationsGetByUserId: Array<UserNotification>;
  partyFind: Array<PartyMapPreview>;
  partyGetById: PartyGetByIdResponse;
  partySearch: Array<PartyPreview>;
  partySearchAttenders: Array<UserPreview>;
  userGetAttendedPartiesById: Array<PartyPreview>;
  userGetById: UserGetByIdResponse;
  userGetFollowersById: Array<UserPreview>;
  userGetFollowingById: Array<UserPreview>;
  userSearch: Array<UserPreview>;
  userSearchFollowersToInvite: Array<User>;
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


export type QueryUserGetAttendedPartiesByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserGetByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserGetFollowersByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserGetFollowingByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserSearchArgs = {
  q?: InputMaybe<Scalars['String']>;
};


export type QueryUserSearchFollowersToInviteArgs = {
  data: UserSearchFollowersToInviteInput;
};

export type SupportSendMessageInput = {
  body: Scalars['String'];
  subject: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  attendedParties: Array<Party>;
  attendedPartiesCount: Scalars['Float'];
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  followers: Array<User>;
  followersCount: Scalars['Float'];
  following: Array<User>;
  followingCount: Scalars['Float'];
  fullName: Scalars['String'];
  invites: Array<Party>;
  nickname: Scalars['String'];
  notifications: Array<Notification>;
  password?: Maybe<Scalars['String']>;
  recoveryCode?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserChangeAttendingStateInput = {
  partyId: Scalars['String'];
  state: Scalars['Boolean'];
};

export type UserChangeFollowingStateInput = {
  followingId: Scalars['String'];
  state: Scalars['Boolean'];
};

export type UserEditInput = {
  fullName: Scalars['String'];
  nickname: Scalars['String'];
};

export type UserGetByIdResponse = {
  __typename?: 'UserGetByIdResponse';
  _id: Scalars['String'];
  attendedPartiesCount: Scalars['Float'];
  followersCount: Scalars['Float'];
  followingCount: Scalars['Float'];
  fullName: Scalars['String'];
  isFollowing: Scalars['Boolean'];
  nickname: Scalars['String'];
};

export type UserNotification = {
  __typename?: 'UserNotification';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  from: UserPreview;
  party?: Maybe<PartyPreview>;
  type: NotificationType;
};

export type UserPreview = {
  __typename?: 'UserPreview';
  _id: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  nickname: Scalars['String'];
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


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'AuthSignInResponse', userId: string, accessToken: string, refreshToken: string } };

export type SignInMutationVariables = Exact<{
  data: AuthSignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthSignInResponse', userId: string, accessToken: string, refreshToken: string } };

export type GenerateRecoveryCodeMutationVariables = Exact<{
  data: AuthGenerateRecoveryCodeInput;
}>;


export type GenerateRecoveryCodeMutation = { __typename?: 'Mutation', generateRecoveryCode: boolean };

export type RecoverPasswordMutationVariables = Exact<{
  data: AuthRecoverPasswordInput;
}>;


export type RecoverPasswordMutation = { __typename?: 'Mutation', recoverPassword: boolean };

export type ChangePasswordMutationVariables = Exact<{
  data: AuthChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type FeatureToggleGetEnabledNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type FeatureToggleGetEnabledNamesQuery = { __typename?: 'Query', featureToggleGetEnabledNames: Array<FeatureToggleName> };

export type NotificationsGetByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsGetByUserIdQuery = { __typename?: 'Query', notificationsGetByUserId: Array<{ __typename?: 'UserNotification', _id: string, type: NotificationType, createdAt: any, from: { __typename?: 'UserPreview', _id: string, nickname: string }, party?: { __typename?: 'PartyPreview', _id: string, name: string } | null }> };

export type PartyCreateMutationVariables = Exact<{
  data: PartyCreateInput;
}>;


export type PartyCreateMutation = { __typename?: 'Mutation', partyCreate: string };

export type PartyFindQueryVariables = Exact<{ [key: string]: never; }>;


export type PartyFindQuery = { __typename?: 'Query', partyFind: Array<{ __typename?: 'PartyMapPreview', _id: string, name: string, organizerNickname?: string | null, date: any, coordinate: { __typename?: 'Coordinate', latitude: number, longitude: number } }> };

export type PartySearchQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']>;
}>;


export type PartySearchQuery = { __typename?: 'Query', partySearch: Array<{ __typename?: 'PartyPreview', _id: string, name: string, organizerNickname?: string | null }> };

export type PartyGetByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PartyGetByIdQuery = { __typename?: 'Query', partyGetById: { __typename?: 'PartyGetByIdResponse', _id: string, name: string, availability: PartyAvailability, address: string, date: any, openBar: boolean, description: string, attendersCount: number, allowInvites: boolean, isAttender: boolean, isOrganizer: boolean, isExpired: boolean, organizer: { __typename?: 'User', nickname: string }, attenders: Array<{ __typename?: 'User', _id: string }> } };

export type PartySearchAttendersQueryVariables = Exact<{
  data: PartySearchAttendersInput;
}>;


export type PartySearchAttendersQuery = { __typename?: 'Query', partySearchAttenders: Array<{ __typename?: 'UserPreview', _id: string, nickname: string, fullName?: string | null }> };

export type SupportSendMessageMutationVariables = Exact<{
  data: SupportSendMessageInput;
}>;


export type SupportSendMessageMutation = { __typename?: 'Mutation', supportSendMessage: boolean };

export type UserEditMutationVariables = Exact<{
  data: UserEditInput;
}>;


export type UserEditMutation = { __typename?: 'Mutation', userEdit: boolean };

export type UserSearchQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']>;
}>;


export type UserSearchQuery = { __typename?: 'Query', userSearch: Array<{ __typename?: 'UserPreview', _id: string, nickname: string, fullName?: string | null }> };

export type UserGetByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserGetByIdQuery = { __typename?: 'Query', userGetById: { __typename?: 'UserGetByIdResponse', _id: string, nickname: string, fullName: string, followersCount: number, followingCount: number, attendedPartiesCount: number, isFollowing: boolean } };

export type UserGetFollowingByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserGetFollowingByIdQuery = { __typename?: 'Query', userGetFollowingById: Array<{ __typename?: 'UserPreview', _id: string, nickname: string, fullName?: string | null }> };

export type UserGetFollowersByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserGetFollowersByIdQuery = { __typename?: 'Query', userGetFollowersById: Array<{ __typename?: 'UserPreview', _id: string, nickname: string, fullName?: string | null }> };

export type UserGetAttendedPartiesByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserGetAttendedPartiesByIdQuery = { __typename?: 'Query', userGetAttendedPartiesById: Array<{ __typename?: 'PartyPreview', _id: string, name: string, organizerNickname?: string | null }> };

export type UserSearchFollowersToInviteQueryVariables = Exact<{
  data: UserSearchFollowersToInviteInput;
}>;


export type UserSearchFollowersToInviteQuery = { __typename?: 'Query', userSearchFollowersToInvite: Array<{ __typename?: 'User', _id: string, nickname: string, fullName: string }> };

export type UserChangeFollowingStateMutationVariables = Exact<{
  data: UserChangeFollowingStateInput;
}>;


export type UserChangeFollowingStateMutation = { __typename?: 'Mutation', userChangeFollowingState: boolean };

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
export const GenerateRecoveryCodeDocument = gql`
    mutation generateRecoveryCode($data: AuthGenerateRecoveryCodeInput!) {
  generateRecoveryCode(data: $data)
}
    `;
export type GenerateRecoveryCodeMutationFn = Apollo.MutationFunction<GenerateRecoveryCodeMutation, GenerateRecoveryCodeMutationVariables>;

/**
 * __useGenerateRecoveryCodeMutation__
 *
 * To run a mutation, you first call `useGenerateRecoveryCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateRecoveryCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateRecoveryCodeMutation, { data, loading, error }] = useGenerateRecoveryCodeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGenerateRecoveryCodeMutation(baseOptions?: Apollo.MutationHookOptions<GenerateRecoveryCodeMutation, GenerateRecoveryCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateRecoveryCodeMutation, GenerateRecoveryCodeMutationVariables>(GenerateRecoveryCodeDocument, options);
      }
export type GenerateRecoveryCodeMutationHookResult = ReturnType<typeof useGenerateRecoveryCodeMutation>;
export type GenerateRecoveryCodeMutationResult = Apollo.MutationResult<GenerateRecoveryCodeMutation>;
export type GenerateRecoveryCodeMutationOptions = Apollo.BaseMutationOptions<GenerateRecoveryCodeMutation, GenerateRecoveryCodeMutationVariables>;
export const RecoverPasswordDocument = gql`
    mutation recoverPassword($data: AuthRecoverPasswordInput!) {
  recoverPassword(data: $data)
}
    `;
export type RecoverPasswordMutationFn = Apollo.MutationFunction<RecoverPasswordMutation, RecoverPasswordMutationVariables>;

/**
 * __useRecoverPasswordMutation__
 *
 * To run a mutation, you first call `useRecoverPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecoverPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recoverPasswordMutation, { data, loading, error }] = useRecoverPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRecoverPasswordMutation(baseOptions?: Apollo.MutationHookOptions<RecoverPasswordMutation, RecoverPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecoverPasswordMutation, RecoverPasswordMutationVariables>(RecoverPasswordDocument, options);
      }
export type RecoverPasswordMutationHookResult = ReturnType<typeof useRecoverPasswordMutation>;
export type RecoverPasswordMutationResult = Apollo.MutationResult<RecoverPasswordMutation>;
export type RecoverPasswordMutationOptions = Apollo.BaseMutationOptions<RecoverPasswordMutation, RecoverPasswordMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($data: AuthChangePasswordInput!) {
  changePassword(data: $data)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const FeatureToggleGetEnabledNamesDocument = gql`
    query featureToggleGetEnabledNames {
  featureToggleGetEnabledNames
}
    `;

/**
 * __useFeatureToggleGetEnabledNamesQuery__
 *
 * To run a query within a React component, call `useFeatureToggleGetEnabledNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeatureToggleGetEnabledNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeatureToggleGetEnabledNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeatureToggleGetEnabledNamesQuery(baseOptions?: Apollo.QueryHookOptions<FeatureToggleGetEnabledNamesQuery, FeatureToggleGetEnabledNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeatureToggleGetEnabledNamesQuery, FeatureToggleGetEnabledNamesQueryVariables>(FeatureToggleGetEnabledNamesDocument, options);
      }
export function useFeatureToggleGetEnabledNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeatureToggleGetEnabledNamesQuery, FeatureToggleGetEnabledNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeatureToggleGetEnabledNamesQuery, FeatureToggleGetEnabledNamesQueryVariables>(FeatureToggleGetEnabledNamesDocument, options);
        }
export type FeatureToggleGetEnabledNamesQueryHookResult = ReturnType<typeof useFeatureToggleGetEnabledNamesQuery>;
export type FeatureToggleGetEnabledNamesLazyQueryHookResult = ReturnType<typeof useFeatureToggleGetEnabledNamesLazyQuery>;
export type FeatureToggleGetEnabledNamesQueryResult = Apollo.QueryResult<FeatureToggleGetEnabledNamesQuery, FeatureToggleGetEnabledNamesQueryVariables>;
export const NotificationsGetByUserIdDocument = gql`
    query notificationsGetByUserId {
  notificationsGetByUserId {
    _id
    type
    from {
      _id
      nickname
    }
    party {
      _id
      name
    }
    createdAt
  }
}
    `;

/**
 * __useNotificationsGetByUserIdQuery__
 *
 * To run a query within a React component, call `useNotificationsGetByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsGetByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsGetByUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsGetByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsGetByUserIdQuery, NotificationsGetByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsGetByUserIdQuery, NotificationsGetByUserIdQueryVariables>(NotificationsGetByUserIdDocument, options);
      }
export function useNotificationsGetByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsGetByUserIdQuery, NotificationsGetByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsGetByUserIdQuery, NotificationsGetByUserIdQueryVariables>(NotificationsGetByUserIdDocument, options);
        }
export type NotificationsGetByUserIdQueryHookResult = ReturnType<typeof useNotificationsGetByUserIdQuery>;
export type NotificationsGetByUserIdLazyQueryHookResult = ReturnType<typeof useNotificationsGetByUserIdLazyQuery>;
export type NotificationsGetByUserIdQueryResult = Apollo.QueryResult<NotificationsGetByUserIdQuery, NotificationsGetByUserIdQueryVariables>;
export const PartyCreateDocument = gql`
    mutation partyCreate($data: PartyCreateInput!) {
  partyCreate(data: $data)
}
    `;
export type PartyCreateMutationFn = Apollo.MutationFunction<PartyCreateMutation, PartyCreateMutationVariables>;

/**
 * __usePartyCreateMutation__
 *
 * To run a mutation, you first call `usePartyCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePartyCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [partyCreateMutation, { data, loading, error }] = usePartyCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function usePartyCreateMutation(baseOptions?: Apollo.MutationHookOptions<PartyCreateMutation, PartyCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PartyCreateMutation, PartyCreateMutationVariables>(PartyCreateDocument, options);
      }
export type PartyCreateMutationHookResult = ReturnType<typeof usePartyCreateMutation>;
export type PartyCreateMutationResult = Apollo.MutationResult<PartyCreateMutation>;
export type PartyCreateMutationOptions = Apollo.BaseMutationOptions<PartyCreateMutation, PartyCreateMutationVariables>;
export const PartyFindDocument = gql`
    query partyFind {
  partyFind {
    _id
    name
    organizerNickname
    coordinate {
      latitude
      longitude
    }
    date
  }
}
    `;

/**
 * __usePartyFindQuery__
 *
 * To run a query within a React component, call `usePartyFindQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartyFindQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartyFindQuery({
 *   variables: {
 *   },
 * });
 */
export function usePartyFindQuery(baseOptions?: Apollo.QueryHookOptions<PartyFindQuery, PartyFindQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartyFindQuery, PartyFindQueryVariables>(PartyFindDocument, options);
      }
export function usePartyFindLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartyFindQuery, PartyFindQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartyFindQuery, PartyFindQueryVariables>(PartyFindDocument, options);
        }
export type PartyFindQueryHookResult = ReturnType<typeof usePartyFindQuery>;
export type PartyFindLazyQueryHookResult = ReturnType<typeof usePartyFindLazyQuery>;
export type PartyFindQueryResult = Apollo.QueryResult<PartyFindQuery, PartyFindQueryVariables>;
export const PartySearchDocument = gql`
    query partySearch($q: String) {
  partySearch(q: $q) {
    _id
    name
    organizerNickname
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
    availability
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
    isOrganizer
    isExpired
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
export const SupportSendMessageDocument = gql`
    mutation supportSendMessage($data: SupportSendMessageInput!) {
  supportSendMessage(data: $data)
}
    `;
export type SupportSendMessageMutationFn = Apollo.MutationFunction<SupportSendMessageMutation, SupportSendMessageMutationVariables>;

/**
 * __useSupportSendMessageMutation__
 *
 * To run a mutation, you first call `useSupportSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSupportSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [supportSendMessageMutation, { data, loading, error }] = useSupportSendMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSupportSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SupportSendMessageMutation, SupportSendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SupportSendMessageMutation, SupportSendMessageMutationVariables>(SupportSendMessageDocument, options);
      }
export type SupportSendMessageMutationHookResult = ReturnType<typeof useSupportSendMessageMutation>;
export type SupportSendMessageMutationResult = Apollo.MutationResult<SupportSendMessageMutation>;
export type SupportSendMessageMutationOptions = Apollo.BaseMutationOptions<SupportSendMessageMutation, SupportSendMessageMutationVariables>;
export const UserEditDocument = gql`
    mutation userEdit($data: UserEditInput!) {
  userEdit(data: $data)
}
    `;
export type UserEditMutationFn = Apollo.MutationFunction<UserEditMutation, UserEditMutationVariables>;

/**
 * __useUserEditMutation__
 *
 * To run a mutation, you first call `useUserEditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserEditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userEditMutation, { data, loading, error }] = useUserEditMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserEditMutation(baseOptions?: Apollo.MutationHookOptions<UserEditMutation, UserEditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserEditMutation, UserEditMutationVariables>(UserEditDocument, options);
      }
export type UserEditMutationHookResult = ReturnType<typeof useUserEditMutation>;
export type UserEditMutationResult = Apollo.MutationResult<UserEditMutation>;
export type UserEditMutationOptions = Apollo.BaseMutationOptions<UserEditMutation, UserEditMutationVariables>;
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
export const UserGetByIdDocument = gql`
    query userGetById($id: String!) {
  userGetById(id: $id) {
    _id
    nickname
    fullName
    followersCount
    followingCount
    attendedPartiesCount
    isFollowing
  }
}
    `;

/**
 * __useUserGetByIdQuery__
 *
 * To run a query within a React component, call `useUserGetByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGetByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGetByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserGetByIdQuery(baseOptions: Apollo.QueryHookOptions<UserGetByIdQuery, UserGetByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGetByIdQuery, UserGetByIdQueryVariables>(UserGetByIdDocument, options);
      }
export function useUserGetByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGetByIdQuery, UserGetByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGetByIdQuery, UserGetByIdQueryVariables>(UserGetByIdDocument, options);
        }
export type UserGetByIdQueryHookResult = ReturnType<typeof useUserGetByIdQuery>;
export type UserGetByIdLazyQueryHookResult = ReturnType<typeof useUserGetByIdLazyQuery>;
export type UserGetByIdQueryResult = Apollo.QueryResult<UserGetByIdQuery, UserGetByIdQueryVariables>;
export const UserGetFollowingByIdDocument = gql`
    query userGetFollowingById($id: String!) {
  userGetFollowingById(id: $id) {
    _id
    nickname
    fullName
  }
}
    `;

/**
 * __useUserGetFollowingByIdQuery__
 *
 * To run a query within a React component, call `useUserGetFollowingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGetFollowingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGetFollowingByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserGetFollowingByIdQuery(baseOptions: Apollo.QueryHookOptions<UserGetFollowingByIdQuery, UserGetFollowingByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGetFollowingByIdQuery, UserGetFollowingByIdQueryVariables>(UserGetFollowingByIdDocument, options);
      }
export function useUserGetFollowingByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGetFollowingByIdQuery, UserGetFollowingByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGetFollowingByIdQuery, UserGetFollowingByIdQueryVariables>(UserGetFollowingByIdDocument, options);
        }
export type UserGetFollowingByIdQueryHookResult = ReturnType<typeof useUserGetFollowingByIdQuery>;
export type UserGetFollowingByIdLazyQueryHookResult = ReturnType<typeof useUserGetFollowingByIdLazyQuery>;
export type UserGetFollowingByIdQueryResult = Apollo.QueryResult<UserGetFollowingByIdQuery, UserGetFollowingByIdQueryVariables>;
export const UserGetFollowersByIdDocument = gql`
    query userGetFollowersById($id: String!) {
  userGetFollowersById(id: $id) {
    _id
    nickname
    fullName
  }
}
    `;

/**
 * __useUserGetFollowersByIdQuery__
 *
 * To run a query within a React component, call `useUserGetFollowersByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGetFollowersByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGetFollowersByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserGetFollowersByIdQuery(baseOptions: Apollo.QueryHookOptions<UserGetFollowersByIdQuery, UserGetFollowersByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGetFollowersByIdQuery, UserGetFollowersByIdQueryVariables>(UserGetFollowersByIdDocument, options);
      }
export function useUserGetFollowersByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGetFollowersByIdQuery, UserGetFollowersByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGetFollowersByIdQuery, UserGetFollowersByIdQueryVariables>(UserGetFollowersByIdDocument, options);
        }
export type UserGetFollowersByIdQueryHookResult = ReturnType<typeof useUserGetFollowersByIdQuery>;
export type UserGetFollowersByIdLazyQueryHookResult = ReturnType<typeof useUserGetFollowersByIdLazyQuery>;
export type UserGetFollowersByIdQueryResult = Apollo.QueryResult<UserGetFollowersByIdQuery, UserGetFollowersByIdQueryVariables>;
export const UserGetAttendedPartiesByIdDocument = gql`
    query userGetAttendedPartiesById($id: String!) {
  userGetAttendedPartiesById(id: $id) {
    _id
    name
    organizerNickname
  }
}
    `;

/**
 * __useUserGetAttendedPartiesByIdQuery__
 *
 * To run a query within a React component, call `useUserGetAttendedPartiesByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGetAttendedPartiesByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGetAttendedPartiesByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserGetAttendedPartiesByIdQuery(baseOptions: Apollo.QueryHookOptions<UserGetAttendedPartiesByIdQuery, UserGetAttendedPartiesByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGetAttendedPartiesByIdQuery, UserGetAttendedPartiesByIdQueryVariables>(UserGetAttendedPartiesByIdDocument, options);
      }
export function useUserGetAttendedPartiesByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGetAttendedPartiesByIdQuery, UserGetAttendedPartiesByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGetAttendedPartiesByIdQuery, UserGetAttendedPartiesByIdQueryVariables>(UserGetAttendedPartiesByIdDocument, options);
        }
export type UserGetAttendedPartiesByIdQueryHookResult = ReturnType<typeof useUserGetAttendedPartiesByIdQuery>;
export type UserGetAttendedPartiesByIdLazyQueryHookResult = ReturnType<typeof useUserGetAttendedPartiesByIdLazyQuery>;
export type UserGetAttendedPartiesByIdQueryResult = Apollo.QueryResult<UserGetAttendedPartiesByIdQuery, UserGetAttendedPartiesByIdQueryVariables>;
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
export const UserChangeFollowingStateDocument = gql`
    mutation userChangeFollowingState($data: UserChangeFollowingStateInput!) {
  userChangeFollowingState(data: $data)
}
    `;
export type UserChangeFollowingStateMutationFn = Apollo.MutationFunction<UserChangeFollowingStateMutation, UserChangeFollowingStateMutationVariables>;

/**
 * __useUserChangeFollowingStateMutation__
 *
 * To run a mutation, you first call `useUserChangeFollowingStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserChangeFollowingStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userChangeFollowingStateMutation, { data, loading, error }] = useUserChangeFollowingStateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserChangeFollowingStateMutation(baseOptions?: Apollo.MutationHookOptions<UserChangeFollowingStateMutation, UserChangeFollowingStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserChangeFollowingStateMutation, UserChangeFollowingStateMutationVariables>(UserChangeFollowingStateDocument, options);
      }
export type UserChangeFollowingStateMutationHookResult = ReturnType<typeof useUserChangeFollowingStateMutation>;
export type UserChangeFollowingStateMutationResult = Apollo.MutationResult<UserChangeFollowingStateMutation>;
export type UserChangeFollowingStateMutationOptions = Apollo.BaseMutationOptions<UserChangeFollowingStateMutation, UserChangeFollowingStateMutationVariables>;
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