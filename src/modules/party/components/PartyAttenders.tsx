import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { usePartySearchAttendersQuery } from '../../../api';
import {
  Box,
  Button,
  Icon,
  ListSwitch,
  StateHandler,
  Text,
  TextInput,
} from '../../../components';
import { useDebounce } from '../../../hooks';
import { UserPreview, UserRow } from '../../user';

type Props = {
  partyId: string;
};
export const PartyAttenders: React.FC<Props> = ({ partyId }) => {
  const [search, setSearch] = useState('');
  const [isCardsListMode, setCardsListMode] = useState(true);
  const debouncedSearch = useDebounce(search, 500);

  const {
    data,
    loading: isLoading,
    error: isError,
    refetch,
  } = usePartySearchAttendersQuery({
    variables: { data: { id: partyId } },
  });

  const attenders = data?.partySearchAttenders ?? [];

  useEffect(() => {
    refetch({ data: { id: partyId, q: debouncedSearch } });
  }, [debouncedSearch]);

  return (
    <>
      <Box flex row center mb={4}>
        <Box flexGrow={1} mr={2}>
          <TextInput
            placeholder="Buscar..."
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </Box>
        <ListSwitch
          isCards={isCardsListMode}
          onSwitch={() => setCardsListMode(!isCardsListMode)}
        />
      </Box>
      <StateHandler isLoading={isLoading} isError={Boolean(isError)}>
        <FlatList
          data={attenders}
          renderItem={({ item }) =>
            isCardsListMode ? (
              <Box mb={2}>
                <UserPreview user={item} />
              </Box>
            ) : (
              <Box mb={2}>
                <UserRow user={item} />
              </Box>
            )
          }
        />
      </StateHandler>
    </>
  );
};
