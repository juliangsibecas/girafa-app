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

export type AdminUserListResponse = {
  __typename?: 'AdminUserListResponse';
  total: Scalars['Float'];
  users: Array<UserPreview>;
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

export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  messages: Array<ChatMessage>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users: Array<User>;
};

export type ChatCreateInput = {
  messageText: Scalars['String'];
  withId: Scalars['String'];
};

export type ChatGetIdByUserIdInput = {
  userId: Scalars['String'];
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  createdAt: Scalars['DateTime'];
  fromId: Scalars['String'];
  text: Scalars['String'];
};

export type ChatMessageSendInput = {
  chatId: Scalars['String'];
  text: Scalars['String'];
};

export type ChatMessageSentInput = {
  token: Scalars['String'];
};

export type ChatMessagesGetInput = {
  chatId: Scalars['String'];
};

export type ChatNewMessageResponse = {
  __typename?: 'ChatNewMessageResponse';
  chatId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  fromId: Scalars['String'];
  text: Scalars['String'];
};

export type ChatPreview = {
  __typename?: 'ChatPreview';
  _id: Scalars['String'];
  lastMessage: ChatMessage;
  user: UserPreview;
};

export type ChatUserGetInput = {
  id: Scalars['String'];
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

export enum ErrorCode {
  AuthError = 'AUTH_ERROR',
  FeatureToggleError = 'FEATURE_TOGGLE_ERROR',
  ForbiddenError = 'FORBIDDEN_ERROR',
  NotFoundError = 'NOT_FOUND_ERROR',
  UnknownError = 'UNKNOWN_ERROR',
  ValidationError = 'VALIDATION_ERROR'
}

export enum ErrorDescription {
  EmailNotAvailable = 'EMAIL_NOT_AVAILABLE',
  EmailNotFound = 'EMAIL_NOT_FOUND',
  PartyNameNotAvailable = 'PARTY_NAME_NOT_AVAILABLE',
  PasswordInvalid = 'PASSWORD_INVALID',
  SignInInvalid = 'SIGN_IN_INVALID',
  UserNameNotAvailable = 'USER_NAME_NOT_AVAILABLE'
}

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

export enum FeatureToggleName {
  ChatGet = 'CHAT_GET',
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
  UserSendPartyInvite = 'USER_SEND_PARTY_INVITE',
  UserShare = 'USER_SHARE'
}

export type FeatureTogglePopulateInput = {
  value?: InputMaybe<Scalars['Boolean']>;
};

export type GroupedCount = {
  __typename?: 'GroupedCount';
  _id: Scalars['String'];
  count: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminSignIn: AuthSignInResponse;
  adminUserRunOpera: Scalars['Boolean'];
  appInfoChangeMinVersion: Scalars['Boolean'];
  appInfoInitialize: Scalars['Boolean'];
  changePassword: Scalars['Boolean'];
  chatCreate: ChatPreview;
  chatMessageSend: Scalars['Boolean'];
  featureToggleChangeValue: Scalars['Boolean'];
  featureToggleSync: Scalars['Boolean'];
  generateRecoveryCode: Scalars['Boolean'];
  partyCreate: Scalars['String'];
  partyDelete: Scalars['Boolean'];
  partyEnable: Scalars['Boolean'];
  partyReject: Scalars['Boolean'];
  recoverPassword: Scalars['Boolean'];
  signIn: AuthSignInResponse;
  signUp: AuthSignInResponse;
  supportSendMessage: Scalars['Boolean'];
  userBan: Scalars['Boolean'];
  userChangeAttendingState: Scalars['Boolean'];
  userChangeFollowingState: Scalars['Boolean'];
  userDelete: Scalars['Boolean'];
  userEdit: Scalars['Boolean'];
  userSendPartyInvite: Scalars['Boolean'];
};


export type MutationAdminSignInArgs = {
  data: AuthSignInInput;
};


export type MutationAppInfoChangeMinVersionArgs = {
  version: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  data: AuthChangePasswordInput;
};


export type MutationChatCreateArgs = {
  data: ChatCreateInput;
};


export type MutationChatMessageSendArgs = {
  data: ChatMessageSendInput;
};


export type MutationFeatureToggleChangeValueArgs = {
  data: FeatureToggleChangeValueInput;
};


export type MutationFeatureToggleSyncArgs = {
  data: FeatureTogglePopulateInput;
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


export type MutationPartyRejectArgs = {
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


export type MutationUserBanArgs = {
  data: UserBanInput;
};


export type MutationUserChangeAttendingStateArgs = {
  data: UserChangeAttendingStateInput;
};


export type MutationUserChangeFollowingStateArgs = {
  data: UserChangeFollowingStateInput;
};


export type MutationUserDeleteArgs = {
  data: UserDeleteInput;
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
  Chat = 'CHAT',
  Follow = 'FOLLOW',
  Invite = 'INVITE'
}

export type Pagination = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

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
  name: Scalars['String'];
  openBar: Scalars['Boolean'];
  organizer?: Maybe<User>;
  slug: Scalars['String'];
  status: PartyStatus;
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

export type PartyGetInput = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type PartyGetResponse = {
  __typename?: 'PartyGetResponse';
  _id: Scalars['String'];
  address: Scalars['String'];
  allowInvites: Scalars['Boolean'];
  attenders: Array<User>;
  attendersCount: Scalars['Float'];
  availability: PartyAvailability;
  date: Scalars['Date'];
  description: Scalars['String'];
  isAttender: Scalars['Boolean'];
  isOrganizer: Scalars['Boolean'];
  name: Scalars['String'];
  openBar: Scalars['Boolean'];
  organizer?: Maybe<User>;
  slug: Scalars['String'];
  status: PartyStatus;
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

export enum PartyStatus {
  Created = 'CREATED',
  Enabled = 'ENABLED',
  Expired = 'EXPIRED'
}

export type Query = {
  __typename?: 'Query';
  adminPartyGetCount: Scalars['Float'];
  adminPartyGetPendingCount: Scalars['Float'];
  adminSupportGetCount: Scalars['Float'];
  adminUserGetCount: Scalars['Float'];
  adminUserGetCreatedByDayCount: Array<GroupedCount>;
  adminUserList: AdminUserListResponse;
  appInfoMeetMinVersion: Scalars['Boolean'];
  chatGetIdByUserId: Scalars['String'];
  chatList: Array<ChatPreview>;
  chatMessagesGet: Array<ChatMessage>;
  chatUserGet: UserPreview;
  featureToggleGetEnabledNames: Array<FeatureToggleName>;
  featureToggleList: Array<FeatureToggle>;
  notificationsGetByUserId: Array<UserNotification>;
  partyFind: Array<PartyMapPreview>;
  partyGet: PartyGetResponse;
  partySearch: Array<PartyPreview>;
  partySearchAttenders: Array<UserPreview>;
  typesSync: TypesSyncResponse;
  userCheckPartyValidating: Scalars['Boolean'];
  userFindUsersToChat: Array<UserPreview>;
  userGet: UserGetResponse;
  userGetAttendedPartiesById: Array<PartyPreview>;
  userGetFollowersById: Array<UserPreview>;
  userGetFollowingById: Array<UserPreview>;
  userSearch: Array<UserPreview>;
  userSearchFollowersToInvite: Array<User>;
};


export type QueryAdminUserListArgs = {
  data: Pagination;
};


export type QueryAppInfoMeetMinVersionArgs = {
  version: Scalars['String'];
};


export type QueryChatGetIdByUserIdArgs = {
  data: ChatGetIdByUserIdInput;
};


export type QueryChatMessagesGetArgs = {
  data: ChatMessagesGetInput;
};


export type QueryChatUserGetArgs = {
  data: ChatUserGetInput;
};


export type QueryPartyGetArgs = {
  data: PartyGetInput;
};


export type QueryPartySearchArgs = {
  q?: InputMaybe<Scalars['String']>;
};


export type QueryPartySearchAttendersArgs = {
  data: PartySearchAttendersInput;
};


export type QueryUserFindUsersToChatArgs = {
  data: UserFindUsersToChat;
};


export type QueryUserGetArgs = {
  data: UserGetInput;
};


export type QueryUserGetAttendedPartiesByIdArgs = {
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

export type Subscription = {
  __typename?: 'Subscription';
  chatMessageSent: ChatNewMessageResponse;
};


export type SubscriptionChatMessageSentArgs = {
  data: ChatMessageSentInput;
};

export type SupportSendMessageInput = {
  body: Scalars['String'];
  subject: Scalars['String'];
};

export type TypesSyncResponse = {
  __typename?: 'TypesSyncResponse';
  code: ErrorCode;
  description: ErrorDescription;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  attendedParties: Array<Party>;
  attendedPartiesCount: Scalars['Float'];
  bannerId?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  chats: Array<Chat>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  followers: Array<User>;
  following: Array<User>;
  fullName: Scalars['String'];
  instagramUsername?: Maybe<Scalars['String']>;
  invites: Array<Party>;
  isOpera?: Maybe<Scalars['Boolean']>;
  nickname: Scalars['String'];
  notifications: Array<Notification>;
  password?: Maybe<Scalars['String']>;
  pictureId?: Maybe<Scalars['String']>;
  recoveryCode?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserBanInput = {
  id: Scalars['String'];
};

export type UserChangeAttendingStateInput = {
  partyId: Scalars['String'];
  state: Scalars['Boolean'];
};

export type UserChangeFollowingStateInput = {
  followingId: Scalars['String'];
  state: Scalars['Boolean'];
};

export type UserDeleteInput = {
  password: Scalars['String'];
};

export type UserEditInput = {
  fullName: Scalars['String'];
  instagramUsername?: InputMaybe<Scalars['String']>;
  nickname: Scalars['String'];
};

export type UserFindUsersToChat = {
  q?: InputMaybe<Scalars['String']>;
};

export type UserGetInput = {
  id?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
};

export type UserGetResponse = {
  __typename?: 'UserGetResponse';
  _id: Scalars['String'];
  attendedPartiesCount: Scalars['Float'];
  bannerId?: Maybe<Scalars['String']>;
  followersCount: Scalars['Float'];
  followingCount: Scalars['Float'];
  fullName: Scalars['String'];
  instagramUsername?: Maybe<Scalars['String']>;
  isFollower: Scalars['Boolean'];
  isFollowing: Scalars['Boolean'];
  nickname: Scalars['String'];
  pictureId?: Maybe<Scalars['String']>;
};

export type UserNotification = {
  __typename?: 'UserNotification';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  from: UserPreview;
  party?: Maybe<PartyPreview>;
  type: NotificationType;
  url?: Maybe<Scalars['String']>;
};

export type UserPreview = {
  __typename?: 'UserPreview';
  _id: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  nickname: Scalars['String'];
  pictureId?: Maybe<Scalars['String']>;
};

export type UserSearchFollowersToInviteInput = {
  partyId: Scalars['String'];
  q?: InputMaybe<Scalars['String']>;
};

export type UserSendPartyInviteInput = {
  invitedId: Array<Scalars['String']>;
  partyId: Scalars['String'];
};

export type TypesSyncQueryVariables = Exact<{ [key: string]: never; }>;


export type TypesSyncQuery = { __typename?: 'Query', typesSync: { __typename?: 'TypesSyncResponse', code: ErrorCode, description: ErrorDescription } };

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

export type ChatListQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatListQuery = { __typename?: 'Query', chatList: Array<{ __typename?: 'ChatPreview', _id: string, user: { __typename?: 'UserPreview', _id: string, nickname: string, pictureId?: string | null }, lastMessage: { __typename?: 'ChatMessage', fromId: string, text: string, createdAt: any } }> };

export type ChatGetIdByUserIdQueryVariables = Exact<{
  data: ChatGetIdByUserIdInput;
}>;


export type ChatGetIdByUserIdQuery = { __typename?: 'Query', chatGetIdByUserId: string };

export type ChatUserGetQueryVariables = Exact<{
  data: ChatUserGetInput;
}>;


export type ChatUserGetQuery = { __typename?: 'Query', chatUserGet: { __typename?: 'UserPreview', _id: string, nickname: string, pictureId?: string | null } };

export type ChatMessagesGetQueryVariables = Exact<{
  data: ChatMessagesGetInput;
}>;


export type ChatMessagesGetQuery = { __typename?: 'Query', chatMessagesGet: Array<{ __typename?: 'ChatMessage', fromId: string, text: string, createdAt: any }> };

export type ChatCreateMutationVariables = Exact<{
  data: ChatCreateInput;
}>;


export type ChatCreateMutation = { __typename?: 'Mutation', chatCreate: { __typename?: 'ChatPreview', _id: string, user: { __typename?: 'UserPreview', _id: string, nickname: string, pictureId?: string | null }, lastMessage: { __typename?: 'ChatMessage', fromId: string, text: string, createdAt: any } } };

export type ChatMessageSendMutationVariables = Exact<{
  data: ChatMessageSendInput;
}>;


export type ChatMessageSendMutation = { __typename?: 'Mutation', chatMessageSend: boolean };

export type ChatMessageSentSubscriptionVariables = Exact<{
  data: ChatMessageSentInput;
}>;


export type ChatMessageSentSubscription = { __typename?: 'Subscription', chatMessageSent: { __typename?: 'ChatNewMessageResponse', chatId: string, fromId: string, text: string, createdAt: any } };

export type FeatureToggleGetEnabledNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type FeatureToggleGetEnabledNamesQuery = { __typename?: 'Query', featureToggleGetEnabledNames: Array<FeatureToggleName> };

export type AppInfoMeetMinVersionQueryVariables = Exact<{
  version: Scalars['String'];
}>;


export type AppInfoMeetMinVersionQuery = { __typename?: 'Query', appInfoMeetMinVersion: boolean };

export type NotificationsGetByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsGetByUserIdQuery = { __typename?: 'Query', notificationsGetByUserId: Array<{ __typename?: 'UserNotification', _id: string, type: NotificationType, createdAt: any, from: { __typename?: 'UserPreview', _id: string, nickname: string, pictureId?: string | null }, party?: { __typename?: 'PartyPreview', _id: string, name: string } | null }> };

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

export type PartyGetQueryVariables = Exact<{
  data: PartyGetInput;
}>;


export type PartyGetQuery = { __typename?: 'Query', partyGet: { __typename?: 'PartyGetResponse', _id: string, status: PartyStatus, name: string, slug: string, availability: PartyAvailability, address: string, date: any, openBar: boolean, description: string, attendersCount: number, allowInvites: boolean, isAttender: boolean, isOrganizer: boolean, organizer?: { __typename?: 'User', nickname: string } | null, attenders: Array<{ __typename?: 'User', _id: string, pictureId?: string | null }> } };

export type PartySearchAttendersQueryVariables = Exact<{
  data: PartySearchAttendersInput;
}>;


export type PartySearchAttendersQuery = { __typename?: 'Query', partySearchAttenders: Array<{ __typename?: 'UserPreview', _id: string, nickname: string, fullName?: string | null, pictureId?: string | null }> };

export type SupportSendMessageMutationVariables = Exact<{
  data: SupportSendMessageInput;
}>;


export type SupportSendMessageMutation = { __typename?: 'Mutation', supportSendMessage: boolean };

export type UserSearchQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']>;
}>;


export type UserSearchQuery = { __typename?: 'Query', userSearch: Array<{ __typename?: 'UserPreview', _id: string, nickname: string, fullName?: string | null, pictureId?: string | null }> };

export type UserGetQueryVariables = Exact<{
  data: UserGetInput;
}>;


export type UserGetQuery = { __typename?: 'Query', userGet: { __typename?: 'UserGetResponse', _id: string, nickname: string, fullName: string, pictureId?: string | null, bannerId?: string | null, instagramUsername?: string | null, followersCount: number, followingCount: number, attendedPartiesCount: number, isFollowing: boolean, isFollower: boolean } };

export type UserGetFollowingByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserGetFollowingByIdQuery = { __typename?: 'Query', userGetFollowingById: Array<{ __typename?: 'UserPreview', _id: string, nickname: string, fullName?: string | null, pictureId?: string | null }> };

export type UserGetFollowersByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserGetFollowersByIdQuery = { __typename?: 'Query', userGetFollowersById: Array<{ __typename?: 'UserPreview', _id: string, nickname: string, fullName?: string | null, pictureId?: string | null }> };

export type UserGetAttendedPartiesByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserGetAttendedPartiesByIdQuery = { __typename?: 'Query', userGetAttendedPartiesById: Array<{ __typename?: 'PartyPreview', _id: string, name: string, organizerNickname?: string | null }> };

export type UserSearchFollowersToInviteQueryVariables = Exact<{
  data: UserSearchFollowersToInviteInput;
}>;


export type UserSearchFollowersToInviteQuery = { __typename?: 'Query', userSearchFollowersToInvite: Array<{ __typename?: 'User', _id: string, nickname: string, fullName: string, pictureId?: string | null }> };

export type UserCheckPartyValidatingQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCheckPartyValidatingQuery = { __typename?: 'Query', userCheckPartyValidating: boolean };

export type UserFindUsersToChatQueryVariables = Exact<{
  data: UserFindUsersToChat;
}>;


export type UserFindUsersToChatQuery = { __typename?: 'Query', userFindUsersToChat: Array<{ __typename?: 'UserPreview', _id: string, nickname: string, fullName?: string | null, pictureId?: string | null }> };

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

export type UserEditMutationVariables = Exact<{
  data: UserEditInput;
}>;


export type UserEditMutation = { __typename?: 'Mutation', userEdit: boolean };

export type UserDeleteMutationVariables = Exact<{
  data: UserDeleteInput;
}>;


export type UserDeleteMutation = { __typename?: 'Mutation', userDelete: boolean };


export const TypesSyncDocument = gql`
    query typesSync {
  typesSync {
    code
    description
  }
}
    `;

/**
 * __useTypesSyncQuery__
 *
 * To run a query within a React component, call `useTypesSyncQuery` and pass it any options that fit your needs.
 * When your component renders, `useTypesSyncQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTypesSyncQuery({
 *   variables: {
 *   },
 * });
 */
export function useTypesSyncQuery(baseOptions?: Apollo.QueryHookOptions<TypesSyncQuery, TypesSyncQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TypesSyncQuery, TypesSyncQueryVariables>(TypesSyncDocument, options);
      }
export function useTypesSyncLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TypesSyncQuery, TypesSyncQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TypesSyncQuery, TypesSyncQueryVariables>(TypesSyncDocument, options);
        }
export type TypesSyncQueryHookResult = ReturnType<typeof useTypesSyncQuery>;
export type TypesSyncLazyQueryHookResult = ReturnType<typeof useTypesSyncLazyQuery>;
export type TypesSyncQueryResult = Apollo.QueryResult<TypesSyncQuery, TypesSyncQueryVariables>;
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
export const ChatListDocument = gql`
    query chatList {
  chatList {
    _id
    user {
      _id
      nickname
      pictureId
    }
    lastMessage {
      fromId
      text
      createdAt
    }
  }
}
    `;

/**
 * __useChatListQuery__
 *
 * To run a query within a React component, call `useChatListQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatListQuery({
 *   variables: {
 *   },
 * });
 */
export function useChatListQuery(baseOptions?: Apollo.QueryHookOptions<ChatListQuery, ChatListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatListQuery, ChatListQueryVariables>(ChatListDocument, options);
      }
export function useChatListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatListQuery, ChatListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatListQuery, ChatListQueryVariables>(ChatListDocument, options);
        }
export type ChatListQueryHookResult = ReturnType<typeof useChatListQuery>;
export type ChatListLazyQueryHookResult = ReturnType<typeof useChatListLazyQuery>;
export type ChatListQueryResult = Apollo.QueryResult<ChatListQuery, ChatListQueryVariables>;
export const ChatGetIdByUserIdDocument = gql`
    query chatGetIdByUserId($data: ChatGetIdByUserIdInput!) {
  chatGetIdByUserId(data: $data)
}
    `;

/**
 * __useChatGetIdByUserIdQuery__
 *
 * To run a query within a React component, call `useChatGetIdByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatGetIdByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatGetIdByUserIdQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChatGetIdByUserIdQuery(baseOptions: Apollo.QueryHookOptions<ChatGetIdByUserIdQuery, ChatGetIdByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatGetIdByUserIdQuery, ChatGetIdByUserIdQueryVariables>(ChatGetIdByUserIdDocument, options);
      }
export function useChatGetIdByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatGetIdByUserIdQuery, ChatGetIdByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatGetIdByUserIdQuery, ChatGetIdByUserIdQueryVariables>(ChatGetIdByUserIdDocument, options);
        }
export type ChatGetIdByUserIdQueryHookResult = ReturnType<typeof useChatGetIdByUserIdQuery>;
export type ChatGetIdByUserIdLazyQueryHookResult = ReturnType<typeof useChatGetIdByUserIdLazyQuery>;
export type ChatGetIdByUserIdQueryResult = Apollo.QueryResult<ChatGetIdByUserIdQuery, ChatGetIdByUserIdQueryVariables>;
export const ChatUserGetDocument = gql`
    query chatUserGet($data: ChatUserGetInput!) {
  chatUserGet(data: $data) {
    _id
    nickname
    pictureId
  }
}
    `;

/**
 * __useChatUserGetQuery__
 *
 * To run a query within a React component, call `useChatUserGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatUserGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatUserGetQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChatUserGetQuery(baseOptions: Apollo.QueryHookOptions<ChatUserGetQuery, ChatUserGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatUserGetQuery, ChatUserGetQueryVariables>(ChatUserGetDocument, options);
      }
export function useChatUserGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatUserGetQuery, ChatUserGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatUserGetQuery, ChatUserGetQueryVariables>(ChatUserGetDocument, options);
        }
export type ChatUserGetQueryHookResult = ReturnType<typeof useChatUserGetQuery>;
export type ChatUserGetLazyQueryHookResult = ReturnType<typeof useChatUserGetLazyQuery>;
export type ChatUserGetQueryResult = Apollo.QueryResult<ChatUserGetQuery, ChatUserGetQueryVariables>;
export const ChatMessagesGetDocument = gql`
    query chatMessagesGet($data: ChatMessagesGetInput!) {
  chatMessagesGet(data: $data) {
    fromId
    text
    createdAt
  }
}
    `;

/**
 * __useChatMessagesGetQuery__
 *
 * To run a query within a React component, call `useChatMessagesGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatMessagesGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatMessagesGetQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChatMessagesGetQuery(baseOptions: Apollo.QueryHookOptions<ChatMessagesGetQuery, ChatMessagesGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatMessagesGetQuery, ChatMessagesGetQueryVariables>(ChatMessagesGetDocument, options);
      }
export function useChatMessagesGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatMessagesGetQuery, ChatMessagesGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatMessagesGetQuery, ChatMessagesGetQueryVariables>(ChatMessagesGetDocument, options);
        }
export type ChatMessagesGetQueryHookResult = ReturnType<typeof useChatMessagesGetQuery>;
export type ChatMessagesGetLazyQueryHookResult = ReturnType<typeof useChatMessagesGetLazyQuery>;
export type ChatMessagesGetQueryResult = Apollo.QueryResult<ChatMessagesGetQuery, ChatMessagesGetQueryVariables>;
export const ChatCreateDocument = gql`
    mutation chatCreate($data: ChatCreateInput!) {
  chatCreate(data: $data) {
    _id
    user {
      _id
      nickname
      pictureId
    }
    lastMessage {
      fromId
      text
      createdAt
    }
  }
}
    `;
export type ChatCreateMutationFn = Apollo.MutationFunction<ChatCreateMutation, ChatCreateMutationVariables>;

/**
 * __useChatCreateMutation__
 *
 * To run a mutation, you first call `useChatCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChatCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [chatCreateMutation, { data, loading, error }] = useChatCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChatCreateMutation(baseOptions?: Apollo.MutationHookOptions<ChatCreateMutation, ChatCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChatCreateMutation, ChatCreateMutationVariables>(ChatCreateDocument, options);
      }
export type ChatCreateMutationHookResult = ReturnType<typeof useChatCreateMutation>;
export type ChatCreateMutationResult = Apollo.MutationResult<ChatCreateMutation>;
export type ChatCreateMutationOptions = Apollo.BaseMutationOptions<ChatCreateMutation, ChatCreateMutationVariables>;
export const ChatMessageSendDocument = gql`
    mutation chatMessageSend($data: ChatMessageSendInput!) {
  chatMessageSend(data: $data)
}
    `;
export type ChatMessageSendMutationFn = Apollo.MutationFunction<ChatMessageSendMutation, ChatMessageSendMutationVariables>;

/**
 * __useChatMessageSendMutation__
 *
 * To run a mutation, you first call `useChatMessageSendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChatMessageSendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [chatMessageSendMutation, { data, loading, error }] = useChatMessageSendMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChatMessageSendMutation(baseOptions?: Apollo.MutationHookOptions<ChatMessageSendMutation, ChatMessageSendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChatMessageSendMutation, ChatMessageSendMutationVariables>(ChatMessageSendDocument, options);
      }
export type ChatMessageSendMutationHookResult = ReturnType<typeof useChatMessageSendMutation>;
export type ChatMessageSendMutationResult = Apollo.MutationResult<ChatMessageSendMutation>;
export type ChatMessageSendMutationOptions = Apollo.BaseMutationOptions<ChatMessageSendMutation, ChatMessageSendMutationVariables>;
export const ChatMessageSentDocument = gql`
    subscription chatMessageSent($data: ChatMessageSentInput!) {
  chatMessageSent(data: $data) {
    chatId
    fromId
    text
    createdAt
  }
}
    `;

/**
 * __useChatMessageSentSubscription__
 *
 * To run a query within a React component, call `useChatMessageSentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatMessageSentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatMessageSentSubscription({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChatMessageSentSubscription(baseOptions: Apollo.SubscriptionHookOptions<ChatMessageSentSubscription, ChatMessageSentSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatMessageSentSubscription, ChatMessageSentSubscriptionVariables>(ChatMessageSentDocument, options);
      }
export type ChatMessageSentSubscriptionHookResult = ReturnType<typeof useChatMessageSentSubscription>;
export type ChatMessageSentSubscriptionResult = Apollo.SubscriptionResult<ChatMessageSentSubscription>;
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
export const AppInfoMeetMinVersionDocument = gql`
    query appInfoMeetMinVersion($version: String!) {
  appInfoMeetMinVersion(version: $version)
}
    `;

/**
 * __useAppInfoMeetMinVersionQuery__
 *
 * To run a query within a React component, call `useAppInfoMeetMinVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppInfoMeetMinVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppInfoMeetMinVersionQuery({
 *   variables: {
 *      version: // value for 'version'
 *   },
 * });
 */
export function useAppInfoMeetMinVersionQuery(baseOptions: Apollo.QueryHookOptions<AppInfoMeetMinVersionQuery, AppInfoMeetMinVersionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppInfoMeetMinVersionQuery, AppInfoMeetMinVersionQueryVariables>(AppInfoMeetMinVersionDocument, options);
      }
export function useAppInfoMeetMinVersionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppInfoMeetMinVersionQuery, AppInfoMeetMinVersionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppInfoMeetMinVersionQuery, AppInfoMeetMinVersionQueryVariables>(AppInfoMeetMinVersionDocument, options);
        }
export type AppInfoMeetMinVersionQueryHookResult = ReturnType<typeof useAppInfoMeetMinVersionQuery>;
export type AppInfoMeetMinVersionLazyQueryHookResult = ReturnType<typeof useAppInfoMeetMinVersionLazyQuery>;
export type AppInfoMeetMinVersionQueryResult = Apollo.QueryResult<AppInfoMeetMinVersionQuery, AppInfoMeetMinVersionQueryVariables>;
export const NotificationsGetByUserIdDocument = gql`
    query notificationsGetByUserId {
  notificationsGetByUserId {
    _id
    type
    from {
      _id
      nickname
      pictureId
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
export const PartyGetDocument = gql`
    query partyGet($data: PartyGetInput!) {
  partyGet(data: $data) {
    _id
    status
    name
    slug
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
      pictureId
    }
    attendersCount
    allowInvites
    isAttender
    isOrganizer
  }
}
    `;

/**
 * __usePartyGetQuery__
 *
 * To run a query within a React component, call `usePartyGetQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartyGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartyGetQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function usePartyGetQuery(baseOptions: Apollo.QueryHookOptions<PartyGetQuery, PartyGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartyGetQuery, PartyGetQueryVariables>(PartyGetDocument, options);
      }
export function usePartyGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartyGetQuery, PartyGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartyGetQuery, PartyGetQueryVariables>(PartyGetDocument, options);
        }
export type PartyGetQueryHookResult = ReturnType<typeof usePartyGetQuery>;
export type PartyGetLazyQueryHookResult = ReturnType<typeof usePartyGetLazyQuery>;
export type PartyGetQueryResult = Apollo.QueryResult<PartyGetQuery, PartyGetQueryVariables>;
export const PartySearchAttendersDocument = gql`
    query partySearchAttenders($data: PartySearchAttendersInput!) {
  partySearchAttenders(data: $data) {
    _id
    nickname
    fullName
    pictureId
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
export const UserSearchDocument = gql`
    query userSearch($q: String) {
  userSearch(q: $q) {
    _id
    nickname
    fullName
    pictureId
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
export const UserGetDocument = gql`
    query userGet($data: UserGetInput!) {
  userGet(data: $data) {
    _id
    nickname
    fullName
    pictureId
    bannerId
    instagramUsername
    followersCount
    followingCount
    attendedPartiesCount
    isFollowing
    isFollower
  }
}
    `;

/**
 * __useUserGetQuery__
 *
 * To run a query within a React component, call `useUserGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGetQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserGetQuery(baseOptions: Apollo.QueryHookOptions<UserGetQuery, UserGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGetQuery, UserGetQueryVariables>(UserGetDocument, options);
      }
export function useUserGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGetQuery, UserGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGetQuery, UserGetQueryVariables>(UserGetDocument, options);
        }
export type UserGetQueryHookResult = ReturnType<typeof useUserGetQuery>;
export type UserGetLazyQueryHookResult = ReturnType<typeof useUserGetLazyQuery>;
export type UserGetQueryResult = Apollo.QueryResult<UserGetQuery, UserGetQueryVariables>;
export const UserGetFollowingByIdDocument = gql`
    query userGetFollowingById($id: String!) {
  userGetFollowingById(id: $id) {
    _id
    nickname
    fullName
    pictureId
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
    pictureId
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
    pictureId
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
export const UserCheckPartyValidatingDocument = gql`
    query userCheckPartyValidating {
  userCheckPartyValidating
}
    `;

/**
 * __useUserCheckPartyValidatingQuery__
 *
 * To run a query within a React component, call `useUserCheckPartyValidatingQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCheckPartyValidatingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCheckPartyValidatingQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCheckPartyValidatingQuery(baseOptions?: Apollo.QueryHookOptions<UserCheckPartyValidatingQuery, UserCheckPartyValidatingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserCheckPartyValidatingQuery, UserCheckPartyValidatingQueryVariables>(UserCheckPartyValidatingDocument, options);
      }
export function useUserCheckPartyValidatingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCheckPartyValidatingQuery, UserCheckPartyValidatingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserCheckPartyValidatingQuery, UserCheckPartyValidatingQueryVariables>(UserCheckPartyValidatingDocument, options);
        }
export type UserCheckPartyValidatingQueryHookResult = ReturnType<typeof useUserCheckPartyValidatingQuery>;
export type UserCheckPartyValidatingLazyQueryHookResult = ReturnType<typeof useUserCheckPartyValidatingLazyQuery>;
export type UserCheckPartyValidatingQueryResult = Apollo.QueryResult<UserCheckPartyValidatingQuery, UserCheckPartyValidatingQueryVariables>;
export const UserFindUsersToChatDocument = gql`
    query userFindUsersToChat($data: UserFindUsersToChat!) {
  userFindUsersToChat(data: $data) {
    _id
    nickname
    fullName
    pictureId
  }
}
    `;

/**
 * __useUserFindUsersToChatQuery__
 *
 * To run a query within a React component, call `useUserFindUsersToChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFindUsersToChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFindUsersToChatQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserFindUsersToChatQuery(baseOptions: Apollo.QueryHookOptions<UserFindUsersToChatQuery, UserFindUsersToChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFindUsersToChatQuery, UserFindUsersToChatQueryVariables>(UserFindUsersToChatDocument, options);
      }
export function useUserFindUsersToChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFindUsersToChatQuery, UserFindUsersToChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFindUsersToChatQuery, UserFindUsersToChatQueryVariables>(UserFindUsersToChatDocument, options);
        }
export type UserFindUsersToChatQueryHookResult = ReturnType<typeof useUserFindUsersToChatQuery>;
export type UserFindUsersToChatLazyQueryHookResult = ReturnType<typeof useUserFindUsersToChatLazyQuery>;
export type UserFindUsersToChatQueryResult = Apollo.QueryResult<UserFindUsersToChatQuery, UserFindUsersToChatQueryVariables>;
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
export const UserDeleteDocument = gql`
    mutation userDelete($data: UserDeleteInput!) {
  userDelete(data: $data)
}
    `;
export type UserDeleteMutationFn = Apollo.MutationFunction<UserDeleteMutation, UserDeleteMutationVariables>;

/**
 * __useUserDeleteMutation__
 *
 * To run a mutation, you first call `useUserDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userDeleteMutation, { data, loading, error }] = useUserDeleteMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserDeleteMutation(baseOptions?: Apollo.MutationHookOptions<UserDeleteMutation, UserDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserDeleteMutation, UserDeleteMutationVariables>(UserDeleteDocument, options);
      }
export type UserDeleteMutationHookResult = ReturnType<typeof useUserDeleteMutation>;
export type UserDeleteMutationResult = Apollo.MutationResult<UserDeleteMutation>;
export type UserDeleteMutationOptions = Apollo.BaseMutationOptions<UserDeleteMutation, UserDeleteMutationVariables>;