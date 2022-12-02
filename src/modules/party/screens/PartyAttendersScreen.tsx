import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Container } from '../../../components';
import { PartyAttenders } from '../components/PartyAttenders';
import { CoreStackGroupScreenProps } from '../../../navigation/CoreStackGroup';

export const PartyAttendersScreen: React.FC = () => {
  const { params } =
    useRoute<CoreStackGroupScreenProps<'PartyAttenders'>['route']>();

  return (
    <Container>
      <PartyAttenders partyId={params.id} />
    </Container>
  );
};
