import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NotificationStackScreenProps } from '../navigator';
import { Box, Text } from '../../../components';
import {
  FeatureToggleName,
  NotificationType,
  UserNotification,
} from '../../../api';
import { UserAvatar } from '../../user';
import { PartyAvatar } from '../../party/components/PartyAvatar';
import { formatDateTime } from '../../../utils';
import { useTranslation } from 'react-i18next';
import { useFeatureToggle } from '../../featureToggle';

type Props = {
  notification: UserNotification;
};

export const NotificationItem: React.FC<Props> = ({ notification }) => {
  const { t } = useTranslation();
  const { handleAction: handleUserGetAction } = useFeatureToggle(
    FeatureToggleName.UserGet
  );
  const { handleAction: handlePartyGetAction } = useFeatureToggle(
    FeatureToggleName.PartyGet
  );
  const { navigate } =
    useNavigation<NotificationStackScreenProps<'List'>['navigation']>();

  const isFollowInvite = notification.type === NotificationType.Follow;
  const id = isFollowInvite ? notification.from._id : notification.party!._id;

  const handlePress = () =>
    isFollowInvite
      ? handleUserGetAction(() =>
          navigate('UserProfile', { id: notification.from._id })
        )
      : handlePartyGetAction(
          () =>
            notification.party &&
            navigate('PartyDetail', { id: notification.party._id })
        );

  return (
    <TouchableOpacity onPress={handlePress}>
      <Box row hcenter mt={2}>
        {isFollowInvite ? <UserAvatar id={id} /> : <PartyAvatar id={id} />}
        <Box ml={2} mr={2} flex={1}>
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
