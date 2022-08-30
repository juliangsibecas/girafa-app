import { PartyAvailability } from '../../api';

export const partyAvailabilityLabels = {
  [PartyAvailability.Public]: 'Pública',
  [PartyAvailability.Followers]: 'Solo seguidores',
  [PartyAvailability.Following]: 'Solo seguidos',
  [PartyAvailability.Private]: 'Privada',
};
