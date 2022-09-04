import React from 'react';
import { useUserGetByIdQuery } from '../../../api';
import { StateHandler } from '../../../components';
import { useAuth } from '../../auth';
import { UserProfile } from '../comonents';

export const MyProfileScreen: React.FC = () => {
  const { userId } = useAuth();
  const {
    data,
    loading: isLoading,
    error,
    refetch,
    networkStatus,
  } = useUserGetByIdQuery({ variables: { id: userId } });

  const user = data?.userGetById!;

  return (
    <StateHandler
      isLoading={isLoading}
      isError={Boolean(error)}
      isRefreshEnabled
      isRefreshing={networkStatus === 4}
      onRefresh={refetch}
    >
      <UserProfile user={user} isMyProfile={true} />
    </StateHandler>
  );
};
