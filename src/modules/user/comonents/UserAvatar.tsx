import { ImageStyle } from 'react-native';
import { Avatar } from '../../../components';
import { UiKeys } from '../../../ui';
import { getUserPictureUrl, USER_FALLBACK_SRC } from '../../picture';

type Props = UiKeys & {
  id: string;
  style?: ImageStyle;
};

export const UserAvatar: React.FC<Props> = ({ id, ...props }) => (
  <Avatar
    src={getUserPictureUrl(id)}
    fallbackSrc={USER_FALLBACK_SRC}
    {...props}
  />
);
