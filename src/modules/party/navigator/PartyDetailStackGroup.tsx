import { PartyAttendersScreen, PartyDetailScreen } from '../screens';

type Props = {
  Stack: any;
};

export const PartyDetailStackGroup: React.FC<Props> = ({ Stack }) => (
  <Stack.Group>
    <Stack.Screen name="PartyDetail" component={PartyDetailScreen} />
    <Stack.Screen name="PartyAttenders" component={PartyAttendersScreen} />
  </Stack.Group>
);
