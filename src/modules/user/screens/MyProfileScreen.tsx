import React from 'react';
import { useUserGetQuery } from '../../../api';
import { StateHandler } from '../../../components';
import { useAuth } from '../../auth';
import { UserProfile } from '../components';

export const MyProfileScreen: React.FC = () => {
  const { userId } = useAuth();
  const {
    data,
    loading: isLoading,
    error,
    refetch,
    networkStatus,
  } = useUserGetQuery({
    variables: { data: { id: userId } },
    notifyOnNetworkStatusChange: true,
  });

  const user = data?.userGet!;

  return (
    <StateHandler
      isLoading={isLoading}
      isError={Boolean(error)}
      isRefreshEnabled
      isRefreshing={networkStatus === 4}
      onRefresh={() => {
        refetch();
      }}
      showSignOutOnError
    >
      <UserProfile user={user} isMyProfile={true} />
    </StateHandler>
  );
};
