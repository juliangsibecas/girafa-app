import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FeatureToggleName,
  usePartySearchLazyQuery,
  useUserSearchLazyQuery,
} from '../../../api';
import {
  Box,
  Container,
  Icon,
  ListSwitch,
  SearchInput,
  StateHandler,
  Text,
} from '../../../components';
import { useEffectExceptOnMount } from '../../../hooks';
import { Maybe } from '../../../types';
import { useFeatureToggle } from '../../featureToggle';
import { DiscoverList } from '../components';

export const DiscoverScreen: React.FC = () => {
  const { t } = useTranslation();
  const [searchUsers, { data: usersData, error: usersError }] =
    useUserSearchLazyQuery();
  const [searchParties, { data: partiesData, error: partiesError }] =
    usePartySearchLazyQuery();
  const {
    isEnabled: isUserGetEnabled,
    isLoading: isUserGetFeatureToggleLoading,
  } = useFeatureToggle(FeatureToggleName.UserGet);
  const {
    isEnabled: isPartyGetEnabled,
    isLoading: isPartyGetFeatureToggleLoading,
  } = useFeatureToggle(FeatureToggleName.PartyGet);
  const [searchText, setSearchText] = useState('');
  const [isCardsListMode, setCardsListMode] = useState(false);
  const [isShowingAll, setShowingAll] = useState<Maybe<'user' | 'party'>>();
  const [isLoading, setLoading] = useState(false);

  useEffectExceptOnMount(() => {
    if (searchText.length > 1) {
      return setLoading(true);
    }

    setLoading(false);
  }, [searchText]);

  useEffectExceptOnMount(() => {
    const search = async () => {
      if (searchText.length > 1) {
        await Promise.all([
          searchParties({ variables: { q: searchText } }),
          searchUsers({ variables: { q: searchText } }),
        ]);
        setLoading(false);
      }
    };
    search();
  }, [searchText]);

  const users = searchText ? usersData?.userSearch ?? [] : [];
  const parties = searchText ? partiesData?.partySearch ?? [] : [];

  const shouldShowUsers =
    users.length > 0 && (!isShowingAll || isShowingAll === 'user');
  const shouldShowParties =
    parties.length > 0 && (!isShowingAll || isShowingAll === 'party');

  const handleShowAll = (status: boolean, value: 'user' | 'party') => {
    setShowingAll(status ? value : undefined);
    setCardsListMode(false);
  };

  const handleDebouncedTextChange = (debouncedText: string) =>
    setSearchText(debouncedText);

  return (
    <Container headerPlaceholder keyboardDismiss>
      <Box row center>
        <Text flex={1} type="h1">
          {t('general.discover')}
        </Text>
        <Box center>
          <ListSwitch
            isCards={isCardsListMode}
            onSwitch={() => setCardsListMode(!isCardsListMode)}
            isDisabled={!shouldShowUsers || shouldShowParties}
          />
        </Box>
      </Box>
      <Box mt={2} mb={4}>
        <SearchInput
          isFt
          isDisabled={!isUserGetEnabled || !isPartyGetEnabled}
          isLoading={
            isUserGetFeatureToggleLoading || isPartyGetFeatureToggleLoading
          }
          onChangeDebouncedText={handleDebouncedTextChange}
        />
      </Box>
      <StateHandler
        isLoading={isLoading}
        isError={Boolean(partiesError || usersError)}
      >
        {searchText.length > 1 && (
          <>
            {shouldShowUsers ? (
              <DiscoverList
                type="user"
                data={users}
                isOnly={!shouldShowParties}
                isShowingAll={Boolean(isShowingAll)}
                isCardsListMode={isCardsListMode}
                showAll={(status: boolean) => handleShowAll(status, 'user')}
              />
            ) : undefined}
            {shouldShowUsers && shouldShowParties ? <Box mt={4} /> : undefined}
            {shouldShowParties ? (
              <DiscoverList
                type="party"
                data={parties}
                isOnly={!shouldShowUsers}
                isShowingAll={Boolean(isShowingAll) || !shouldShowUsers}
                isCardsListMode={isCardsListMode}
                showAll={(status: boolean) => handleShowAll(status, 'party')}
              />
            ) : undefined}
            {!isLoading && !shouldShowUsers && !shouldShowParties && (
              <Box flexGrow={1} center>
                <Icon name="search" color="primary" size={12} />
                <Text mt={2}>{t('discover.screens.Discover.emptyText')}</Text>
              </Box>
            )}
          </>
        )}
      </StateHandler>
    </Container>
  );
};
