import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';
import { useUserGetAttendedPartiesByIdQuery } from '../../../api';
import { Box, Container, StateHandler, Text } from '../../../components';
import { HomeStackScreenProps } from '../../../navigation';
import { PartyRow } from '../../party/components/PartyRow';

export const UserAttendedPartiesScreen: React.FC = () => {
  const {
    params: { id },
  } = useRoute<HomeStackScreenProps<'UserAttendedParties'>['route']>();
  const { navigate } =
    useNavigation<HomeStackScreenProps<'UserAttendedParties'>['navigation']>();

  const {
    data,
    loading: isLoading,
    error,
  } = useUserGetAttendedPartiesByIdQuery({ variables: { id } });

  const parties = data?.userGetAttendedPartiesById ?? [];

  return (
    <Container>
      <Text type="h1" mb={4}>
        Fiestas
      </Text>
      <StateHandler isLoading={isLoading} isError={Boolean(error)}>
        <FlatList
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
