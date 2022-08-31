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
  } = useUserGetByIdQuery({ variables: { id: userId } });

  const user = data?.userGetById!;

  return (
    <StateHandler isLoading={isLoading} isError={Boolean(error)}>
      <UserProfile user={user} isMyProfile={true} />
    </StateHandler>
  );
};
