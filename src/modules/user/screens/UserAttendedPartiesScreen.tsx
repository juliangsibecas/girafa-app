import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import emptyImage from '../../../assets/images/onboarding/dj.png';

import { useUserGetAttendedPartiesByIdQuery } from '../../../api';
import {
  Box,
  Container,
  Image,
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
  } = useUserGetAttendedPartiesByIdQuery({
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  const parties = data?.userGetAttendedPartiesById ?? [];

  return (
    <Container headerPlaceholder>
      <Text type="h1">{t('general.parties')}</Text>
      <Text>{t('general.publics')}</Text>
      <StateHandler isLoading={isLoading} isError={Boolean(error)}>
        {data?.userGetAttendedPartiesById.length ? (
          <Box mt={4}>
            <FlatList
              refreshControl={
                RefreshControl({
                  isRefreshing: networkStatus === 4,
                  onRefresh: refetch,
                })!
              }
              data={parties}
              style={{ flexGrow: 1 }}
              renderItem={({ item: party }) => (
                <Box mb={2}>
                  <PartyRow
                    party={party}
                    go={() => push('PartyDetail', { id: party._id })}
                  />
                </Box>
              )}
            />
          </Box>
        ) : (
          <Box flex={1} center>
            <Image src={emptyImage} height={20} mb={2} />
            <Text>{t('user.screens.UserAttendedParties.emptyText')}</Text>
          </Box>
        )}
      </StateHandler>
    </Container>
  );
};
