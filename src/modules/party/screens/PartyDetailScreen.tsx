import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Container, StateHandler } from '../../../components';
import { PartyGetByIdResponse, usePartyGetByIdQuery } from '../../../api';
import { PartyDetail } from '../components';
import { CoreStackGroupScreenProps } from '../../../navigation/CoreStackGroup';

export const PartyDetailScreen: React.FC = () => {
  const { params } =
    useRoute<CoreStackGroupScreenProps<'PartyDetail'>['route']>();
  const {
    data,
    loading: isLoading,
    error: isError,
    refetch,
    networkStatus,
  } = usePartyGetByIdQuery({ variables: { id: params.id } });

  console.log(data);

  return (
    <StateHandler
      isLoading={isLoading}
      isError={Boolean(isError)}
      isRefreshEnabled
      isRefreshing={networkStatus === 4}
      onRefresh={refetch}
    >
      <Container noBottomGradient>
        <PartyDetail party={data?.partyGetById as PartyGetByIdResponse} />
      </Container>
    </StateHandler>
  );
};
