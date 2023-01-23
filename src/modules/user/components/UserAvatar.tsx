import { ImageStyle } from 'react-native-fast-image';

import { Avatar } from '../../../components';
import { Maybe } from '../../../types';
import { UiKeys } from '../../../ui';
import { getUserPictureUrl } from '../../picture';

type Props = UiKeys & {
  id?: Maybe<string>;
  placeholderSize?: number;
  style?: ImageStyle;
};

export const UserAvatar: React.FC<Props> = ({ id, ...props }) => {
  return (
    <Avatar
      type="user"
      src={id ? getUserPictureUrl(id) : undefined}
      {...props}
    />
  );
};
