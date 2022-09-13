import { useTheme } from '../../../theme';
import { PartyAttendersScreen, PartyDetailScreen } from '../screens';

type Props = {
  Stack: any;
};

export const PartyDetailStackGroup: React.FC<Props> = ({ Stack }) => {
  const { theme } = useTheme();

  return (
    <Stack.Group>
      <Stack.Screen
        name="PartyDetail"
        component={PartyDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.palette.background.main,
          },
        }}
      />
      <Stack.Screen name="PartyAttenders" component={PartyAttendersScreen} />
    </Stack.Group>
  );
};
