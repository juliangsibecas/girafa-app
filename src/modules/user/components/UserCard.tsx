import { Dimensions, TouchableOpacity } from 'react-native';
import { FeatureToggleName, UserPreview } from '../../../api';
import { Box, Icon, Text } from '../../../components';
import { useTheme } from '../../../theme';
import { FontFamily } from '../../../theme/text/types';
import { useFeatureToggle } from '../../featureToggle';
import { UserAvatar } from './UserAvatar';

type Props = {
  user: UserPreview;
  go: (id: string) => void;
};

export const UserCard: React.FC<Props> = ({ user, go }) => {
  const { theme } = useTheme();
  const { handleAction: handleUserGetAction } = useFeatureToggle(
    FeatureToggleName.UserGet
  );

  const handlePress = () => handleUserGetAction(() => go(user._id));

  return (
    <TouchableOpacity onPress={handlePress}>
      <UserAvatar
        id={user.pictureId}
        placeholderSize={Dimensions.get('screen').width / 18}
        style={{
          height: Dimensions.get('screen').width - theme.spacing(4),
        }}
      />
      <Box
        row
        hcenter
        bgColor="primary"
        px={4}
        py={3}
        borderRadius={2}
        mt={-10}
      >
        <Box flex={1}>
          <Text
            color="background"
            type="h4"
            fontFamily={FontFamily.BOLD}
            mb={0.2}
          >
            {user.nickname}
          </Text>
          <Text color="background">{user.fullName}</Text>
        </Box>
        <Icon name="chevron-right" color="background" size={3} />
      </Box>
    </TouchableOpacity>
  );
};
