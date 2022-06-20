import { PartyAvailability } from '../../api';

export const getPartyPictureUrl = (id: string) => id;
export const formatePartyAvailability = (availability: PartyAvailability) => {
  const dict = {
    [PartyAvailability.Public]: 'Pública',
    [PartyAvailability.Followers]: 'Solo seguidores',
    [PartyAvailability.Following]: 'Solo seguidos',
    [PartyAvailability.Private]: 'Privada',
  };

  return dict[availability];
};
