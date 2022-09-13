import { Avatar } from '../../../components';
import { UiKeys } from '../../../ui';
import { getPartyPictureUrl } from '../../picture';
import defaultPicture from '../../../../assets/images/party.png';

type Props = UiKeys & {
  id: string;
};

export const PartyAvatar: React.FC<Props> = ({ id, ...props }) => (
  <Avatar
    src={getPartyPictureUrl(id)}
    fallbackSrc={defaultPicture}
    {...props}
  />
);
