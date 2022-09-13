import {
  UserAttendedPartiesScreen,
  UserFollowersScreen,
  UserFollowingScreen,
  UserProfileScreen,
} from '../screens';

type Props = {
  Stack: any;
};

export const ProfileStackGroup: React.FC<Props> = ({ Stack }) => (
  <Stack.Group>
    <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    <Stack.Screen name="UserFollowers" component={UserFollowersScreen} />
    <Stack.Screen name="UserFollowing" component={UserFollowingScreen} />
    <Stack.Screen
      name="UserAttendedParties"
      component={UserAttendedPartiesScreen}
    />
  </Stack.Group>
);
