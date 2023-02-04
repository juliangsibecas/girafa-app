import { useUserGetQuery } from '../../api';
import { useAuth } from '../auth';

export const useUser = () => {
  const { userId } = useAuth();
  const { data, loading: isUserLoading } = useUserGetQuery({
    variables: { data: { id: userId } },
    skip: !userId,
  });

  return { user: data?.userGet, isUserLoading };
};
