import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NotificationStackScreenProps } from '../navigator';
import { Box, Text } from '../../../components';
import { NotificationType, UserNotification } from '../../../api';
import { UserAvatar } from '../../user';
import { PartyAvatar } from '../../party/components/PartyAvatar';
import { formatDateTime } from '../../../utils';
import { useTranslation } from 'react-i18next';

type Props = {
  notification: UserNotification;
};

export const NotificationItem: React.FC<Props> = ({ notification }) => {
  const { t } = useTranslation();
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
      <Box flex row hcenter mt={4}>
        {isFollowInvite ? <UserAvatar id={id} /> : <PartyAvatar id={id} />}
        <Box ml={2} mr={2} flexGrow={1} flexShrink={1}>
          {isFollowInvite ? (
            <Text>
              {t(
                'notification.components.NotificationItem.userIsNowFollowingYou',
                { nickname: notification.from.nickname }
              )}
            </Text>
          ) : (
            <Text>
              {t(
                'notification.components.NotificationItem.userInvitedYouToParty',
                {
                  nickname: notification.from.nickname,
                  party: notification.party?.name,
                }
              )}
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
