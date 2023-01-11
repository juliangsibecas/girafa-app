import { ImageStyle } from 'react-native-fast-image';

import { Avatar } from '../../../components';
import { UiKeys } from '../../../ui';
import { useAuth } from '../../auth';
import { getUserPictureUrl } from '../../picture';
import { useUser } from '../hooks';

type Props = UiKeys & {
  id: string;
  version?: number;
  placeholderSize?: number;
  style?: ImageStyle;
};

export const UserAvatar: React.FC<Props> = ({ id, ...props }) => {
  const { userId: myId } = useAuth();
  const { pictureVersion } = useUser();

  const version = id === myId ? pictureVersion : undefined;

  return <Avatar type="user" src={getUserPictureUrl(id, version)} {...props} />;
};
