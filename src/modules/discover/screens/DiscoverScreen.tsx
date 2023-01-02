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
  StateHandler,
  Text,
} from '../../../components';
import { FeatureToggleTextInput } from '../../../components/Input/FeatureToggleTextInput';
import { useDebounce, useEffectExceptOnMount } from '../../../hooks';
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
  const debouncedSearch = useDebounce(searchText);
  const [isCardsListMode, setCardsListMode] = useState(false);
  const [isShowingAll, setShowingAll] = useState<Maybe<'user' | 'party'>>();
  const [isLoading, setLoading] = useState(false);

  useEffectExceptOnMount(() => {
    if (searchText.length > 2) {
      return setLoading(true);
    }

    setLoading(false);
  }, [searchText]);

  useEffectExceptOnMount(() => {
    const search = async () => {
      if (debouncedSearch.length > 2) {
        await Promise.all([
          searchParties({ variables: { q: debouncedSearch } }),
          searchUsers({ variables: { q: debouncedSearch } }),
        ]);
        setLoading(false);
      }
    };
    search();
  }, [debouncedSearch]);

  const users = searchText ? usersData?.userSearch ?? [] : [];
  const parties = searchText ? partiesData?.partySearch ?? [] : [];

  const handleShowAll = (status: boolean, value: 'user' | 'party') => {
    setShowingAll(status ? value : undefined);
    setCardsListMode(false);
  };

  const shouldShowUsers =
    users.length > 0 && (!isShowingAll || isShowingAll === 'user');
  const shouldShowParties =
    parties.length > 0 && (!isShowingAll || isShowingAll === 'party');

  return (
    <Container headerPlaceholder keyboardDismiss>
      <Box flex row center>
        <Text flexGrow={1} type="h1">
          {t('general.discover')}
        </Text>
        <Box flex center>
          <ListSwitch
            isCards={isCardsListMode}
            onSwitch={() => setCardsListMode(!isCardsListMode)}
            isDisabled={!shouldShowUsers || shouldShowParties}
          />
        </Box>
      </Box>
      <Box mt={2} mb={4}>
        <FeatureToggleTextInput
          placeholder={t('general.searchEllipsis')}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          isDisabled={!isUserGetEnabled || !isPartyGetEnabled}
          isLoading={
            isUserGetFeatureToggleLoading || isPartyGetFeatureToggleLoading
          }
        />
      </Box>
      <StateHandler
        isLoading={isLoading}
        isError={Boolean(partiesError || usersError)}
      >
        {debouncedSearch.length > 2 && (
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
