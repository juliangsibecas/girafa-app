import { useRoute } from '@react-navigation/native';
import React from 'react';
import { useUserGetByIdQuery } from '../../../api';
import { StateHandler } from '../../../components';
import { HomeStackScreenProps } from '../../../navigation';
import { UserProfile } from '../comonents';

export const UserProfileScreen: React.FC = () => {
  const {
    params: { id },
  } = useRoute<HomeStackScreenProps<'UserProfile'>['route']>();
  const {
    data,
    loading: isLoading,
    error,
  } = useUserGetByIdQuery({ variables: { id: id } });

  const user = data?.userGetById!;

  return (
    <StateHandler isLoading={isLoading} isError={Boolean(error)}>
      <UserProfile user={user} isMyProfile={false} />
    </StateHandler>
  );
};
