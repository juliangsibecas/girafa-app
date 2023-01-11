import { useRoute } from '@react-navigation/native';
import React from 'react';
import { useUserGetByIdQuery } from '../../../api';
import { StateHandler } from '../../../components';
import { CoreStackGroupScreenProps } from '../../../navigation/CoreStackGroup';
import { UserProfile } from '../components';

export const UserProfileScreen: React.FC = () => {
  const {
    params: { id },
  } = useRoute<CoreStackGroupScreenProps<'UserProfile'>['route']>();
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
