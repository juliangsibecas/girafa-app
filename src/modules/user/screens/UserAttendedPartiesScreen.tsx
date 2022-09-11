import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useUserGetAttendedPartiesByIdQuery } from '../../../api';
import { Box, Container, StateHandler, Text } from '../../../components';
import { HomeStackScreenProps } from '../../../navigation';

import { PartyRow } from '../../party/components/PartyRow';

export const UserAttendedPartiesScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    params: { id },
  } = useRoute<HomeStackScreenProps<'UserAttendedParties'>['route']>();
  const { navigate } =
    useNavigation<HomeStackScreenProps<'UserAttendedParties'>['navigation']>();

  const {
    data,
    loading: isLoading,
    error,
    refetch,
    networkStatus,
  } = useUserGetAttendedPartiesByIdQuery({ variables: { id } });

  const parties = data?.userGetAttendedPartiesById ?? [];

  return (
    <Container>
      <Text type="h1" mb={4}>
        {t('general.parties')}
      </Text>
      <StateHandler isLoading={isLoading} isError={Boolean(error)}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === 4}
              onRefresh={refetch}
            />
          }
          data={parties}
          renderItem={({ item: party }) => (
            <Box mb={2}>
              <PartyRow
                party={party}
                go={() => navigate('PartyDetail', { id: party._id })}
              />
            </Box>
          )}
        />
      </StateHandler>
    </Container>
  );
};
