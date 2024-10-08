import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  UserAttendedPartiesScreen,
  UserFollowersScreen,
  UserFollowingScreen,
  UserProfileScreen,
} from '../screens';

export type ProfileStackGroupParamList = {
  UserProfile: { id?: string; idOrNickname?: string };
  UserFollowers: { id: string };
  UserFollowing: { id: string };
  UserAttendedParties: { id: string };
};

type Props = {
  Stack: ReturnType<typeof createNativeStackNavigator<any>>;
};

export const ProfileStackGroup: React.FC<Props> = ({ Stack }) => (
  <Stack.Group screenOptions={{ headerTransparent: true, headerStyle: {} }}>
    <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    <Stack.Screen name="UserFollowers" component={UserFollowersScreen} />
    <Stack.Screen name="UserFollowing" component={UserFollowingScreen} />
    <Stack.Screen
      name="UserAttendedParties"
      component={UserAttendedPartiesScreen}
    />
  </Stack.Group>
);
