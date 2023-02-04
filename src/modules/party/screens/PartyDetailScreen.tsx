import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Container, StateHandler } from '../../../components';
import { PartyGetResponse, usePartyGetQuery } from '../../../api';
import { PartyDetail } from '../components';
import { CoreStackGroupScreenProps } from '../../../navigation/CoreStackGroup';
import { getIdOrField } from '../../../utils';

export const PartyDetailScreen: React.FC = () => {
  const {
    params: { id, idOrSlug },
  } = useRoute<CoreStackGroupScreenProps<'PartyDetail'>['route']>();
  const {
    data,
    loading: isLoading,
    error: isError,
    refetch,
    networkStatus,
  } = usePartyGetQuery({
    variables: {
      data: getIdOrField({ id, str: idOrSlug, field: 'slug' }),
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <StateHandler
      isLoading={isLoading}
      isError={Boolean(isError)}
      isRefreshEnabled
      isRefreshing={networkStatus === 4}
      onRefresh={refetch}
    >
      <Container headerPlaceholder noBottomGradient>
        <PartyDetail party={data?.partyGet as PartyGetResponse} />
      </Container>
    </StateHandler>
  );
};
