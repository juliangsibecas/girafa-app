import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NotificationStackScreenProps } from '../navigator';
import { Box, Text } from '../../../components';
import { NotificationType, UserNotification } from '../../../api';
import { UserAvatar } from '../../user';
import { PartyAvatar } from '../../party/components/PartyAvatar';
import { formatDateTime } from '../../../utils';

type Props = {
  notification: UserNotification;
};

export const NotificationItem: React.FC<Props> = ({ notification }) => {
  const { navigate } =
    useNavigation<NotificationStackScreenProps<'List'>['navigation']>();
  const isFollowInvite = notification.type === NotificationType.Follow;
  const id = isFollowInvite ? notification.from._id : notification.party!._id;

  return (
    <TouchableOpacity
      onPress={() =>
        navigate(isFollowInvite ? 'UserProfile' : 'PartyDetail', { id })
      }
    >
      <Box flex row hcenter p={2}>
        {isFollowInvite ? <UserAvatar id={id} /> : <PartyAvatar id={id} />}
        <Box ml={2} flexGrow={1}>
          {isFollowInvite ? (
            <Text>{notification.from.nickname} ahora te sigue</Text>
          ) : (
            <Text>
              {notification.from.nickname} te invito a{' '}
              {notification.party!.name}
            </Text>
          )}
        </Box>
        <Text type="hint" color="text.secondary">
          {formatDateTime(notification.createdAt)}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};
