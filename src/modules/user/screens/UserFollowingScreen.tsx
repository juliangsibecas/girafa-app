import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, RefreshControl } from 'react-native';
import { useUserGetFollowingByIdQuery } from '../../../api';
import { Container, StateHandler, Text } from '../../../components';
import { HomeStackScreenProps } from '../../../navigation';
import { UserRow } from '../comonents';

export const UserFollowingScreen: React.FC = () => {
  const {
    params: { id },
  } = useRoute<HomeStackScreenProps<'UserFollowing'>['route']>();
  const { navigate } =
    useNavigation<HomeStackScreenProps<'UserFollowing'>['navigation']>();

  const {
    data,
    loading: isLoading,
    error,
    refetch,
    networkStatus,
  } = useUserGetFollowingByIdQuery({ variables: { id } });

  const following = data?.userGetFollowingById ?? [];

  return (
    <Container>
      <Text type="h1" mb={4}>
        Seguidos
      </Text>
      <StateHandler isLoading={isLoading} isError={Boolean(error)}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === 4}
              onRefresh={refetch}
            />
          }
          data={following}
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
