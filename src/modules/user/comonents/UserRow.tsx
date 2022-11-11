import { TouchableOpacity } from 'react-native';
import { UserPreview } from '../../../api';
import { Box, Icon, Text } from '../../../components';
import { FontFamily } from '../../../theme/text/types';
import { UserAvatar } from './UserAvatar';

type Props = {
  user: UserPreview;
  go: (id: string) => void;
};

export const UserRow: React.FC<Props> = ({ user, go }) => (
  <TouchableOpacity onPress={() => go(user._id)}>
    <Box flex row hcenter>
      <UserAvatar id={user._id} height={6} width={6} placeholderSize={4} />
      <Box ml={2} flexGrow={1}>
        <Text type="h4" fontFamily={FontFamily.BOLD}>
          {user.nickname}
        </Text>
        <Text>{user.fullName}</Text>
      </Box>
      <Icon name="chevron-right" color="primary" />
    </Box>
  </TouchableOpacity>
);
