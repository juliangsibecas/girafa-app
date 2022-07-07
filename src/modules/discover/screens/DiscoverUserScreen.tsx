import React, { useEffect, useState } from 'react';
import { usePartySearchLazyQuery, useUserSearchLazyQuery } from '../../../api';
import { Container, StateHandler, TextInput } from '../../../components';
import { useDebounce } from '../../../hooks';
import { UserListPreview } from '../components';

export const DiscoverUserScreen: React.FC = () => {
  const [
    searchUsers,
    { data: usersData, loading: isUsersLoading, error: usersError },
  ] = useUserSearchLazyQuery();
  const [
    searchParties,
    { data: partiesData, loading: isPartiesLoading, error: partiesError },
  ] = usePartySearchLazyQuery();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (debouncedSearch.length > 2) {
      searchParties({ variables: { q: debouncedSearch } });
      searchUsers({ variables: { q: debouncedSearch } });
    }
  }, [debouncedSearch]);

  const users = usersData?.userSearch ?? [];

  return (
    <Container>
      <TextInput
        placeholder="Buscar..."
        value={search}
        onChangeText={(text) => setSearch(text)}
        mb={4}
      />
      <StateHandler
        isLoading={isPartiesLoading || isUsersLoading}
        isError={Boolean(partiesError || usersError)}
      >
        <UserListPreview q={debouncedSearch} users={users} />
      </StateHandler>
    </Container>
  );
};
