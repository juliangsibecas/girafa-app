import { TouchableOpacity } from 'react-native';
import { User } from '../../../api';
import { Box, Icon, Text } from '../../../components';
import { FontFamily } from '../../../theme/text/types';
import { UserAvatar } from './UserAvatar';

type Props = {
  user: Pick<User, '_id' | 'nickname' | 'fullName'>;
};

export const UserRow: React.FC<Props> = ({ user }) => (
  <TouchableOpacity onPress={() => alert(user._id)}>
    <Box flex row hcenter>
      <UserAvatar id={user._id} width={6} />

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
