import { Dimensions, TouchableOpacity } from 'react-native';
import { User } from '../../../api';
import { Box, Icon, Text } from '../../../components';
import { useTheme } from '../../../theme';
import { FontFamily } from '../../../theme/text/types';
import { UserAvatar } from './UserAvatar';

type Props = {
  user: Pick<User, '_id' | 'nickname' | 'fullName'>;
  go: (id: string) => void;
};

export const UserPreview: React.FC<Props> = ({ user, go }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={() => go(user._id)}>
      <UserAvatar
        id={user._id}
        style={{
          height: Dimensions.get('screen').width - theme.spacing(4),
        }}
      />
      <Box
        flex
        row
        hcenter
        bgColor="primary"
        px={4}
        py={3}
        borderRadius={2}
        mt={-10}
      >
        <Box flexGrow={1}>
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
        <Icon name="chevron-right" color="background" />
      </Box>
    </TouchableOpacity>
  );
};
