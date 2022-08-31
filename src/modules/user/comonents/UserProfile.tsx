import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  UserGetByIdDocument,
  UserGetByIdResponse,
  UserGetFollowersByIdDocument,
  UserGetFollowingByIdDocument,
  useUserChangeFollowingStateMutation,
} from '../../../api';
import { Box, Button, Icon, Text } from '../../../components';
import { FontFamily } from '../../../theme';
import { useAuth } from '../../auth';
import { MyProfileStackScreenProps } from '../navigator';
import { UserAvatar } from './UserAvatar';

type Props = {
  user: UserGetByIdResponse;
  isMyProfile?: boolean;
};

export const UserProfile: React.FC<Props> = ({ user, isMyProfile }) => {
  const { userId: myId } = useAuth();
  const { navigate } =
    useNavigation<MyProfileStackScreenProps<'Profile'>['navigation']>();
  const [
    changeFollowingStateMutation,
    { loading: isChangeFollowingStateLoading },
  ] = useUserChangeFollowingStateMutation();

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
          { query: UserGetFollowingByIdDocument, variables: { id: myId } },
          { query: UserGetFollowersByIdDocument, variables: { id: user._id } },
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
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al intentar seguir al usuario',
      });
    }
  };
  return (
    <Box overflow="hidden" width="screen" height="screen">
      <UserAvatar
        id={user._id}
        height="screen"
        width="screen"
        position="absolute"
        top={0}
        left={0}
      />
      <Box mt={7} px={2} flexGrow={1} style={{ alignItems: 'flex-end' }}>
        {isMyProfile ? (
          <TouchableOpacity onPress={() => navigate('Settings')}>
            <Icon name="menu" color="primary" size={3} />
          </TouchableOpacity>
        ) : undefined}
      </Box>
      <Box
        mb={9}
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
            <Button
              secondary={user.isFollowing}
              width={20}
              height={5}
              textProps={{ fontSize: 14 }}
              onPress={changeFollowingState}
              isLoading={isChangeFollowingStateLoading}
            >
              {isFollowing ? 'Siguiendo' : 'Seguir'}
            </Button>
          ) : undefined}
          {isMyProfile ? (
            <Button
              secondary
              width={20}
              height={5}
              textProps={{ fontSize: 14 }}
            >
              Editar perfil
            </Button>
          ) : undefined}
        </Box>
        <Box flex row style={{ justifyContent: 'space-between' }}>
          <TouchableOpacity
            disabled={user.followingCount === 0}
            onPress={() => navigate('UserFollowing', { id: user._id })}
          >
            <Text fontFamily={FontFamily.BOLD}>{user.followingCount}</Text>
            <Text type="hint">Seguidos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={followersCount === 0}
            onPress={() => navigate('UserFollowers', { id: user._id })}
          >
            <Text fontFamily={FontFamily.BOLD} textCenter>
              {followersCount}
            </Text>
            <Text type="hint" textCenter>
              Seguidores
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={user.attendedPartiesCount === 0}
            onPress={() => navigate('UserAttendedParties', { id: user._id })}
          >
            <Text fontFamily={FontFamily.BOLD} textRight>
              {user.attendedPartiesCount}
            </Text>
            <Text type="hint" textRight>
              Fiestas
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};
