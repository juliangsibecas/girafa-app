import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useUserGetFollowersByIdQuery } from '../../../api';
import {
  Container,
  RefreshControl,
  StateHandler,
  Text,
} from '../../../components';
import { CoreStackGroupScreenProps } from '../../../navigation/CoreStackGroup';
import { UserRow } from '../components';

export const UserFollowersScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    params: { id },
  } = useRoute<CoreStackGroupScreenProps<'UserFollowers'>['route']>();
  const { push } =
    useNavigation<CoreStackGroupScreenProps<'UserFollowers'>['navigation']>();

  const {
    data,
    loading: isLoading,
    error,
    refetch,
    networkStatus,
  } = useUserGetFollowersByIdQuery({ variables: { id } });

  const followers = data?.userGetFollowersById ?? [];

  return (
    <Container headerPlaceholder>
      <Text type="h1" mb={4}>
        {t('user.followers')}
      </Text>
      <StateHandler isLoading={isLoading} isError={Boolean(error)}>
        <FlatList
          refreshControl={
            RefreshControl({
              isRefreshing: networkStatus === 4,
              onRefresh: refetch,
            })!
          }
          data={followers}
          style={{ flex: 1 }}
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
