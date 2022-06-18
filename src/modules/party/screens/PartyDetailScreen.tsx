import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Container, StateHandler } from '../../../components';
import { PartyGetByIdResponse, usePartyGetByIdQuery } from '../../../api';
import { PartyDetail } from '../components';
import { HomeStackScreenProps } from '../../../navigation';

export const PartyDetailScreen: React.FC = () => {
  const { params } = useRoute<HomeStackScreenProps<'PartyDetail'>['route']>();
  const {
    data,
    loading: isLoading,
    error: isError,
  } = usePartyGetByIdQuery({ variables: { id: params.id } });

  return (
    <StateHandler isLoading={isLoading} isError={Boolean(isError)}>
      <Container>
        <PartyDetail party={data?.partyGetById as PartyGetByIdResponse} />
      </Container>
    </StateHandler>
  );
};
