import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PartyAttendersScreen, PartyDetailScreen } from '../screens';

export type PartyDetailStackGroupParamList = {
  PartyDetail: { id?: string; idOrSlug?: string };
  PartyAttenders: { id: string };
};

type Props = {
  Stack: ReturnType<typeof createNativeStackNavigator<any>>;
};

export const PartyDetailStackGroup: React.FC<Props> = ({ Stack }) => (
  <Stack.Group screenOptions={{ headerTransparent: true }}>
    <Stack.Screen name="PartyDetail" component={PartyDetailScreen} />
    <Stack.Screen name="PartyAttenders" component={PartyAttendersScreen} />
  </Stack.Group>
);
