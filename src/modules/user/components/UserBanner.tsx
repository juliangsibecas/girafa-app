import { ImageStyle } from 'react-native-fast-image';

import { Avatar } from '../../../components';
import { Maybe } from '../../../types';
import { UiKeys } from '../../../ui';

import { getUserBannerUrl } from '../../picture';

type Props = UiKeys & {
  id?: Maybe<string>;
  placeholderSize?: number;
  style?: ImageStyle;
};

export const UserBanner: React.FC<Props> = ({ id, ...props }) => {
  return (
    <Avatar
      type="user"
      src={id ? getUserBannerUrl(id) : undefined}
      aspectRatio={9 / 16}
      {...props}
    />
  );
};
