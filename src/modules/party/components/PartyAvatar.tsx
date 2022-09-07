import { Avatar } from '../../../components';
import { UiKeys } from '../../../ui';
import { getPartyPictureUrl, PARTY_FALLBACK_SRC } from '../../picture';

type Props = UiKeys & {
  id: string;
};

export const PartyAvatar: React.FC<Props> = ({ id, ...props }) => (
  <Avatar
    src={getPartyPictureUrl(id)}
    fallbackSrc={PARTY_FALLBACK_SRC}
    {...props}
  />
);
