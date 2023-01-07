import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { usePartySearchAttendersQuery } from '../../../api';
import {
  Box,
  ListSwitch,
  RefreshControl,
  StateHandler,
  TextInput,
} from '../../../components';
import { useDebounce, useEffectExceptOnMount } from '../../../hooks';
import { CoreStackGroupScreenProps } from '../../../navigation/CoreStackGroup';

import { UserCard, UserRow } from '../../user/comonents';

type Props = {
  partyId: string;
};

export const PartyAttenders: React.FC<Props> = ({ partyId }) => {
  const { t } = useTranslation();
  const { push } =
    useNavigation<CoreStackGroupScreenProps<'PartyAttenders'>['navigation']>();
  const [search, setSearch] = useState('');
  const [isCardsListMode, setCardsListMode] = useState(true);
  const debouncedSearch = useDebounce(search, 500);
  const goToAttender = (id: string) => push('UserProfile', { id });

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
          placeholder={t('general.searchEllipsis')}
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
            RefreshControl({
              isRefreshing: networkStatus === 4,
              onRefresh: refetch,
            })!
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
