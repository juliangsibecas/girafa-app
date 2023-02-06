import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { useUserGetFollowingByIdQuery } from '../../../api';
import {
  Container,
  RefreshControl,
  StateHandler,
  Text,
} from '../../../components';
import { CoreStackGroupScreenProps } from '../../../navigation/CoreStackGroup';

import { UserRow } from '../components';

export const UserFollowingScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    params: { id },
  } = useRoute<CoreStackGroupScreenProps<'UserFollowing'>['route']>();
  const { push } =
    useNavigation<CoreStackGroupScreenProps<'UserFollowing'>['navigation']>();

  const {
    data,
    loading: isLoading,
    error,
    refetch,
    networkStatus,
  } = useUserGetFollowingByIdQuery({
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  const following = data?.userGetFollowingById ?? [];

  return (
    <Container headerPlaceholder>
      <Text type="h1" mb={4}>
        {t('user.following')}
      </Text>
      <StateHandler isLoading={isLoading} isError={Boolean(error)}>
        <FlatList
          style={{ flex: 1 }}
          refreshControl={
            RefreshControl({
              isRefreshing: networkStatus === 4,
              onRefresh: refetch,
            })!
          }
          data={following}
          renderItem={({ item: user }) => (
            <UserRow
              user={user}
              go={() => push('UserProfile', { id: user._id })}
            />
          )}
        />
      </StateHandler>
    </Container>
  );
};
