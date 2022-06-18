import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Container } from '../../../components';
import { PartyAttenders } from '../components/PartyAttenders';
import { HomeStackScreenProps } from '../../../navigation';

export const PartyAttendersScreen: React.FC = () => {
  const { params } =
    useRoute<HomeStackScreenProps<'PartyAttenders'>['route']>();

  return (
    <Container>
      <PartyAttenders partyId={params.id} />
    </Container>
  );
};
