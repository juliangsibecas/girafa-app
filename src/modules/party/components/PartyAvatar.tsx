import { Avatar } from '../../../components';
import { UiKeys } from '../../../ui';
import { getPartyPictureUrl } from '../../picture';

type Props = UiKeys & {
  id: string;
};

export const PartyAvatar: React.FC<Props> = ({ id, ...props }) => (
  <Avatar
    src={getPartyPictureUrl(id)}
    fallbackSrc="https://media.istockphoto.com/photos/dancing-friends-picture-id501387734?k=20&m=501387734&s=612x612&w=0&h=1mli5b7kpDg428fFZfsDPJ9dyVHsWsGK-EVYZUGWHpI="
    {...props}
  />
);
