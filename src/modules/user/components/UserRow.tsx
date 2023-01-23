import { TouchableOpacity } from 'react-native';
import { FeatureToggleName, UserPreview } from '../../../api';
import { Box, Icon, Text } from '../../../components';
import { FontFamily } from '../../../theme/text/types';
import { useFeatureToggle } from '../../featureToggle';
import { UserAvatar } from './UserAvatar';

type Props = {
  user: UserPreview;
  go: (id: string) => void;
};

export const UserRow: React.FC<Props> = ({ user, go }) => {
  const { handleAction: handleGetUserAction } = useFeatureToggle(
    FeatureToggleName.UserGet
  );

  const handlePress = () => handleGetUserAction(() => go(user._id));

  return (
    <TouchableOpacity onPress={handlePress}>
      <Box row hcenter my={0.5}>
        <UserAvatar
          id={user.pictureId}
          height={6}
          width={6}
          placeholderSize={4}
        />
        <Box ml={2} flex={1}>
          <Text type="h4" fontFamily={FontFamily.BOLD}>
            {user.nickname}
          </Text>
          <Text>{user.fullName}</Text>
        </Box>
        <Icon name="chevron-right" color="primary" />
      </Box>
    </TouchableOpacity>
  );
};
