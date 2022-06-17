import { Avatar } from '../../../components';
import { UiKeys } from '../../../ui';
import { getUserPictureUrl } from '../utils';

type Props = UiKeys & {
  id: string;
};

export const UserAvatar: React.FC<Props> = ({ id, ...props }) => (
  <Avatar
    src={getUserPictureUrl(id)}
    fallbackSrc="https://cdn-1.motorsport.com/images/amp/0qXBBz46/s6/charles-leclerc-ferrari-speaks.jpg"
    {...props}
  />
);
