import React from 'react';
import { Container, StateHandler } from '../../../components';
import { PartyGetByIdResponse, usePartyGetByIdQuery } from '../../../api';
import { PartyDetail } from '../components';
import { useRoute } from '@react-navigation/native';

export const PartyDetailScreen: React.FC = () => {
  const { params } = useRoute();
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
