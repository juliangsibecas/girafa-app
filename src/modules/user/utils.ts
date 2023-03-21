import {
  UserGetDocument,
  UserGetFollowersByIdDocument,
  UserGetFollowersByIdQueryResult,
  UserGetFollowingByIdDocument,
  UserGetFollowingByIdQueryResult,
  UserGetResponse,
} from '../../api';
import { client } from '../../apollo';
import { Maybe } from '../../types';

export const cacheUpdateUserFollow = ({
  me,
  user,
}: {
  me: UserGetResponse;
  user: UserGetResponse;
}) => {
  const isFollowing = !user.isFollowing;

  client.writeQuery({
    query: UserGetDocument,
    data: {
      userGet: {
        ...me,
        followingCount: isFollowing
          ? me.followingCount + 1
          : me.followingCount - 1,
      } as Partial<UserGetResponse>,
    },
    variables: {
      data: {
        id: me._id,
      },
    },
  });

  const myFollowingsData = client.readQuery({
    query: UserGetFollowingByIdDocument,
    variables: {
      id: me._id,
    },
  }) as Maybe<UserGetFollowingByIdQueryResult['data']>;

  if (myFollowingsData) {
    const myFollowings = myFollowingsData.userGetFollowingById;

    client.writeQuery({
      query: UserGetFollowingByIdDocument,
      data: {
        userGetFollowingById: isFollowing
          ? [user, ...myFollowings]
          : myFollowings.filter(({ _id }) => user._id !== _id),
      },
      variables: {
        id: me._id,
      },
    });
  }

  client.writeQuery({
    query: UserGetDocument,
    data: {
      userGet: {
        ...user,
        followersCount: isFollowing
          ? user.followersCount + 1
          : user.followersCount - 1,
        isFollowing,
      } as Partial<UserGetResponse>,
    },
    variables: {
      data: {
        id: user._id,
      },
    },
  });

  const userFollowersData = client.readQuery({
    query: UserGetFollowersByIdDocument,
    variables: {
      id: user._id,
    },
  }) as Maybe<UserGetFollowersByIdQueryResult['data']>;

  if (userFollowersData) {
    const userFollowers = userFollowersData.userGetFollowersById;

    client.writeQuery({
      query: UserGetFollowersByIdDocument,
      data: {
        userGetFollowersById: isFollowing
          ? [me, ...userFollowers]
          : userFollowers.filter(({ _id }) => me._id !== _id),
      },
      variables: {
        id: user._id,
      },
    });
  }
};
