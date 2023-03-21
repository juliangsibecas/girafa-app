import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Dimensions, Share, TouchableOpacity } from 'react-native';

import {
  FeatureToggleName,
  useResponse,
  UserGetDocument,
  UserGetResponse,
  useUserChangeFollowingStateMutation,
} from '../../../api';
import {
  Box,
  Button,
  FeatureToggledButton,
  Hamburger,
  Icon,
  Text,
} from '../../../components';
import { openUrl } from '../../../utils';
import { FontFamily } from '../../../theme';

import { useAuth } from '../../auth';
import { useFeatureToggle } from '../../featureToggle';

import { MyProfileStackScreenProps } from '../navigator';
import { cacheUpdateUserFollow } from '../utils';

import { UserAvatar } from './UserAvatar';
import { UserBanner } from './UserBanner';
import { useUser } from '../hooks';

type Props = {
  user: UserGetResponse;
  isMyProfile?: boolean;
};

export const UserProfile: React.FC<Props> = ({ user, isMyProfile }) => {
  const { t } = useTranslation();
  const { onError } = useResponse();
  const { userId: myId } = useAuth();
  const { user: me } = useUser();

  const { push } =
    useNavigation<MyProfileStackScreenProps<'Me'>['navigation']>();

  const { handleAction: handleGetFollowersAction } = useFeatureToggle(
    FeatureToggleName.UserGetFollowers
  );
  const { handleAction: handleGetFollowingAction } = useFeatureToggle(
    FeatureToggleName.UserGetFollowing
  );
  const { handleAction: handleGetAttendedPartiesAction } = useFeatureToggle(
    FeatureToggleName.UserGetAttendedParties
  );

  const [
    changeFollowingStateMutation,
    { loading: isChangeFollowingStateLoading },
  ] = useUserChangeFollowingStateMutation();

  const isMe = myId === user._id;

  const changeFollowingState = async () => {
    try {
      const res = await changeFollowingStateMutation({
        variables: {
          data: { followingId: user._id, state: !user.isFollowing },
        },
        refetchQueries: [
          { query: UserGetDocument, variables: { data: { id: myId } } },
          { query: UserGetDocument, variables: { data: { id: user._id } } },
        ],
      });

      if (res.errors) {
        throw new Error();
      }

      if (res.data?.userChangeFollowingState && me) {
        cacheUpdateUserFollow({ user, me });
      }
    } catch (e) {
      onError();
    }
  };

  const handleFollowingPress = () =>
    handleGetFollowingAction(() => push('UserFollowing', { id: user._id }));

  const handleFollowersPress = () =>
    handleGetFollowersAction(() => push('UserFollowers', { id: user._id }));

  const handleAttendedPartiesPress = () =>
    handleGetAttendedPartiesAction(() =>
      push('UserAttendedParties', { id: user._id })
    );

  const handleEditPress = () => push('UserEdit', user);

  const handleSharePress = () =>
    Share.share({
      message: t('user.components.Profile.share', { nickname: user.nickname }),
    });

  const handleChatPress = async () => {
    push('ProfileChatDirect', {
      user,
    });
  };

  const handleInstagramPress = async () => {
    await openUrl(`https://instagram.com/${user.instagramUsername}`);
  };

  const followButtonText = user.isFollowing
    ? t('user.following')
    : user.isFollower
    ? t('user.followBack')
    : t('user.follow');

  return (
    <Box overflow="hidden" width="screen" flex={1}>
      <UserBanner
        id={user.bannerId}
        key={user.bannerId}
        width="screen"
        position="absolute"
        top={0}
        left={0}
        borderRadius={0}
        style={{ height: '100%' }}
        placeholderSize={Dimensions.get('screen').width / 18}
      />
      <Box mt={10} px={2} flex={1} style={{ alignItems: 'flex-end' }}>
        {isMyProfile ? (
          <Hamburger onPress={() => push('Settings')} />
        ) : undefined}
      </Box>
      <Box
        pt={5}
        p={3}
        bgColor="background"
        style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
        <Box position="absolute" top={-4} left={3}>
          <UserAvatar id={user.pictureId} height={8} />
        </Box>
        <Box row mb={4} hcenter style={{ justifyContent: 'space-between' }}>
          <Box>
            <Text type="h4" fontFamily={FontFamily.BOLD}>
              {user.nickname}
            </Text>
            <Text>{user.fullName}</Text>
          </Box>
          <Box row>
            {!!!isMe && (
              <>
                <FeatureToggledButton
                  ft={FeatureToggleName.UserChangeFollowingState}
                  secondary={user.isFollowing}
                  width={12}
                  height={4}
                  textProps={{ fontSize: 12 }}
                  onPress={changeFollowingState}
                  isLoading={isChangeFollowingStateLoading}
                >
                  {followButtonText}
                </FeatureToggledButton>
                <FeatureToggledButton
                  ft={FeatureToggleName.ChatGet}
                  secondary
                  width={4}
                  height={4}
                  borderWidth={0}
                  textProps={{ fontSize: 12 }}
                  ml={1}
                  onPress={handleChatPress}
                >
                  <Icon name="send" color="primary" size={2.5} />
                </FeatureToggledButton>
              </>
            )}
            {!!isMyProfile && (
              <>
                <FeatureToggledButton
                  secondary
                  ft={FeatureToggleName.UserEdit}
                  width={4}
                  height={4}
                  borderWidth={0}
                  textProps={{ fontSize: 12 }}
                  onPress={handleEditPress}
                >
                  <Icon name="edit" color="primary" size={2.5} />
                </FeatureToggledButton>
                <FeatureToggledButton
                  secondary
                  ft={FeatureToggleName.UserShare}
                  width={4}
                  height={4}
                  textProps={{ fontSize: 12 }}
                  onPress={handleSharePress}
                  ml={1}
                  borderWidth={0}
                  hide
                >
                  <Icon name="share-2" color="primary" size={2.5} />
                </FeatureToggledButton>
              </>
            )}
            {!!user.instagramUsername && (
              <Button
                secondary
                width={4}
                height={4}
                borderWidth={0}
                ml={1}
                onPress={handleInstagramPress}
              >
                <Icon name="instagram" color="primary" size={2.5} />
              </Button>
            )}
          </Box>
        </Box>
        <Box row style={{ justifyContent: 'space-between' }}>
          <TouchableOpacity
            disabled={user.followingCount === 0}
            onPress={handleFollowingPress}
          >
            <Text fontFamily={FontFamily.BOLD}>{user.followingCount}</Text>
            <Text type="hint">{t('user.following')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={user.followersCount === 0}
            onPress={handleFollowersPress}
          >
            <Text fontFamily={FontFamily.BOLD} textCenter>
              {user.followersCount}
            </Text>
            <Text type="hint" textCenter>
              {t('user.followers')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={user.attendedPartiesCount === 0}
            onPress={handleAttendedPartiesPress}
          >
            <Text fontFamily={FontFamily.BOLD} textRight>
              {user.attendedPartiesCount}
            </Text>
            <Text type="hint" textRight>
              {t('general.parties')}
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};
