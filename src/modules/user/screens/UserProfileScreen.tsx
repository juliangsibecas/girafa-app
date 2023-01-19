import { useRoute } from '@react-navigation/native';
import React from 'react';
import { useUserGetQuery } from '../../../api';
import { StateHandler } from '../../../components';
import { CoreStackGroupScreenProps } from '../../../navigation/CoreStackGroup';
import { getIdOrField } from '../../../utils';
import { UserProfile } from '../components';

export const UserProfileScreen: React.FC = () => {
  const {
    params: { id, idOrNickname },
  } = useRoute<CoreStackGroupScreenProps<'UserProfile'>['route']>();
  const {
    data,
    loading: isLoading,
    error,
  } = useUserGetQuery({
    variables: {
      data: getIdOrField({ id, str: idOrNickname, field: 'nickname' }),
    },
  });

  const user = data?.userGet!;

  return (
    <StateHandler isLoading={isLoading} isError={Boolean(error)}>
      <UserProfile user={user} isMyProfile={false} />
    </StateHandler>
  );
};
