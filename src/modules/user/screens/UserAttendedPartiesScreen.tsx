import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useUserGetAttendedPartiesByIdQuery } from '../../../api';
import {
  Box,
  Container,
  RefreshControl,
  StateHandler,
  Text,
} from '../../../components';
import { CoreStackGroupScreenProps } from '../../../navigation/CoreStackGroup';

import { PartyRow } from '../../party/components/PartyRow';

export const UserAttendedPartiesScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    params: { id },
  } = useRoute<CoreStackGroupScreenProps<'UserAttendedParties'>['route']>();
  const { push } =
    useNavigation<
      CoreStackGroupScreenProps<'UserAttendedParties'>['navigation']
    >();

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
            RefreshControl({
              isRefreshing: networkStatus === 4,
              onRefresh: refetch,
            })!
          }
          data={parties}
          renderItem={({ item: party }) => (
            <Box mb={2}>
              <PartyRow
                party={party}
                go={() => push('PartyDetail', { id: party._id })}
              />
            </Box>
          )}
        />
      </StateHandler>
    </Container>
  );
};
