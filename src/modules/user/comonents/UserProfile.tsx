import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, TouchableOpacity } from 'react-native';

import {
  FeatureToggleName,
  useResponse,
  UserGetByIdDocument,
  UserGetByIdResponse,
  useUserChangeFollowingStateMutation,
} from '../../../api';
import { Box, FeatureToggledButton, Icon, Text } from '../../../components';

import { FontFamily } from '../../../theme';
import { useAuth } from '../../auth';
import { useFeatureToggle } from '../../featureToggle';
import { useUser } from '../hooks';

import { MyProfileStackScreenProps } from '../navigator';

import { UserAvatar } from './UserAvatar';

type Props = {
  user: UserGetByIdResponse;
  isMyProfile?: boolean;
};

export const UserProfile: React.FC<Props> = ({ user, isMyProfile }) => {
  const { t } = useTranslation();
  const { onError } = useResponse();
  const { userId: myId } = useAuth();
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
  const { pictureVersion } = useUser();

  const [isFollowing, setFollowing] = useState(user.isFollowing);
  const [followersCount, setFollowersCount] = useState(user.followersCount);

  const isMe = myId === user._id;

  const changeFollowingState = async () => {
    try {
      const res = await changeFollowingStateMutation({
        variables: { data: { followingId: user._id, state: !isFollowing } },
        refetchQueries: [
          { query: UserGetByIdDocument, variables: { id: myId } },
          { query: UserGetByIdDocument, variables: { id: user._id } },
        ],
      });

      if (res.errors) {
        throw new Error();
      }

      if (res.data?.userChangeFollowingState) {
        setFollowersCount(
          (followersCount) => followersCount + (!isFollowing ? 1 : -1)
        );
        setFollowing(!isFollowing);
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

  const handleEditPress = () =>
    push('UserEdit', {
      fullname: user.fullName,
      nickname: user.nickname,
    });

  const followButtonText = isFollowing
    ? t('user.following')
    : user.isFollower
    ? t('user.followBack')
    : t('user.follow');

  return (
    <Box overflow="hidden" width="screen" flexGrow={1}>
      <UserAvatar
        id={user._id}
        key={pictureVersion}
        width="screen"
        position="absolute"
        top={0}
        left={0}
        borderRadius={0}
        style={{ height: '100%' }}
        placeholderSize={Dimensions.get('screen').width / 18}
      />
      <Box mt={7} px={2} flexGrow={1} style={{ alignItems: 'flex-end' }}>
        {isMyProfile ? (
          <TouchableOpacity onPress={() => push('Settings')}>
            <Icon name="menu" color="primary" size={3} />
          </TouchableOpacity>
        ) : undefined}
      </Box>
      <Box
        p={3}
        bgColor="background"
        style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
        <Box
          flex
          row
          mb={4}
          hcenter
          style={{ justifyContent: 'space-between' }}
        >
          <Box>
            <Text type="h4" fontFamily={FontFamily.BOLD}>
              {user.nickname}
            </Text>
            <Text>{user.fullName}</Text>
          </Box>
          {!isMe ? (
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
          ) : undefined}
          {isMyProfile ? (
            <FeatureToggledButton
              secondary
              ft={FeatureToggleName.UserEdit}
              width={12}
              height={4}
              textProps={{ fontSize: 12 }}
              onPress={handleEditPress}
            >
              {t('user.components.Profile.editProfile')}
            </FeatureToggledButton>
          ) : undefined}
        </Box>
        <Box flex row style={{ justifyContent: 'space-between' }}>
          <TouchableOpacity
            disabled={user.followingCount === 0}
            onPress={handleFollowingPress}
          >
            <Text fontFamily={FontFamily.BOLD}>{user.followingCount}</Text>
            <Text type="hint">{t('user.following')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={followersCount === 0}
            onPress={handleFollowersPress}
          >
            <Text fontFamily={FontFamily.BOLD} textCenter>
              {followersCount}
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
