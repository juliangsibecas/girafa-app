import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { usePartySearchAttendersQuery } from '../../../api';
import { Box, ListSwitch, StateHandler, TextInput } from '../../../components';
import { useDebounce, useEffectExceptOnMount } from '../../../hooks';
import { HomeStackScreenProps } from '../../../navigation';
import { UserCard, UserRow } from '../../user';

type Props = {
  partyId: string;
};

export const PartyAttenders: React.FC<Props> = ({ partyId }) => {
  const { navigate } =
    useNavigation<HomeStackScreenProps<'PartyAttenders'>['navigation']>();
  const [search, setSearch] = useState('');
  const [isCardsListMode, setCardsListMode] = useState(true);
  const debouncedSearch = useDebounce(search, 500);
  const goToAttender = (id: string) => navigate('UserProfile', { id });

  const {
    data,
    loading: isLoading,
    error: isError,
    refetch,
    networkStatus,
  } = usePartySearchAttendersQuery({
    variables: { data: { id: partyId } },
  });

  const attenders = data?.partySearchAttenders ?? [];

  useEffectExceptOnMount(() => {
    refetch({ data: { id: partyId, q: debouncedSearch } });
  }, [debouncedSearch]);

  return (
    <>
      <Box flex row center mb={4}>
        <TextInput
          placeholder="Buscar..."
          value={search}
          onChangeText={(text) => setSearch(text)}
          flexGrow={1}
          mr={2}
        />
        <ListSwitch
          isCards={isCardsListMode}
          onSwitch={() => setCardsListMode(!isCardsListMode)}
        />
      </Box>
      <StateHandler isLoading={isLoading} isError={Boolean(isError)}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === 4}
              onRefresh={refetch}
            />
          }
          data={attenders}
          renderItem={({ item }) =>
            isCardsListMode ? (
              <Box mb={2}>
                <UserCard user={item} go={goToAttender} />
              </Box>
            ) : (
              <Box mb={2}>
                <UserRow user={item} go={goToAttender} />
              </Box>
            )
          }
        />
      </StateHandler>
    </>
  );
};
