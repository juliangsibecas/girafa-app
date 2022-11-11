import { Avatar } from '../../../components';
import { UiKeys } from '../../../ui';
import { getPartyPictureUrl } from '../../picture';

type Props = UiKeys & {
  id: string;
  placeholderSize?: number;
};

export const PartyAvatar: React.FC<Props> = ({ id, ...props }) => (
  <Avatar type="party" src={getPartyPictureUrl(id)} {...props} />
);
