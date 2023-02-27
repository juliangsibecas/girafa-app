import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserGetResponse } from '../../../api';
import { ChatDirectScreen } from '../screens';

export type ChatStackGroupParamList = {
  ProfileChatDirect: { user: UserGetResponse };
};

type Props = {
  Stack: ReturnType<typeof createNativeStackNavigator<any>>;
};

export const ChatStackGroup: React.FC<Props> = ({ Stack }) => (
  <Stack.Group screenOptions={{ headerTransparent: true, headerStyle: {} }}>
    <Stack.Screen name="ProfileChatDirect" component={ChatDirectScreen} />
  </Stack.Group>
);
