import { ImageStyle } from 'react-native';
import { Avatar } from '../../../components';
import { UiKeys } from '../../../ui';
import { getUserPictureUrl } from '../../picture';
import defaultImage from '../../../../assets/images/user.png';

type Props = UiKeys & {
  id: string;
  style?: ImageStyle;
};

export const UserAvatar: React.FC<Props> = ({ id, ...props }) => (
  <Avatar src={getUserPictureUrl(id)} fallbackSrc={defaultImage} {...props} />
);
