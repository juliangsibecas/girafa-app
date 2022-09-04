import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, RefreshControl } from 'react-native';
import { useUserGetFollowersByIdQuery } from '../../../api';
import { Container, StateHandler, Text } from '../../../components';
import { HomeStackScreenProps } from '../../../navigation';
import { UserRow } from '../comonents';

export const UserFollowersScreen: React.FC = () => {
  const {
    params: { id },
  } = useRoute<HomeStackScreenProps<'UserFollowers'>['route']>();
  const { navigate } =
    useNavigation<HomeStackScreenProps<'UserFollowers'>['navigation']>();

  const {
    data,
    loading: isLoading,
    error,
    refetch,
    networkStatus,
  } = useUserGetFollowersByIdQuery({ variables: { id } });

  const followers = data?.userGetFollowersById ?? [];

  return (
    <Container>
      <Text type="h1" mb={4}>
        Seguidores
      </Text>
      <StateHandler isLoading={isLoading} isError={Boolean(error)}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === 4}
              onRefresh={refetch}
            />
          }
          data={followers}
          renderItem={({ item: user }) => (
            <UserRow
              user={user}
              go={() => navigate('UserProfile', { id: user._id })}
            />
          )}
        />
      </StateHandler>
    </Container>
  );
};
