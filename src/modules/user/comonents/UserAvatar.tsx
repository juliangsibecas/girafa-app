import { ImageStyle } from 'react-native';

import { Avatar } from '../../../components';
import { UiKeys } from '../../../ui';
import { getUserPictureUrl } from '../../picture';

type Props = UiKeys & {
  id: string;
  placeholderSize?: number;
  style?: ImageStyle;
};

export const UserAvatar: React.FC<Props> = ({ id, ...props }) => (
  <Avatar type="user" src={getUserPictureUrl(id)} {...props} />
);
