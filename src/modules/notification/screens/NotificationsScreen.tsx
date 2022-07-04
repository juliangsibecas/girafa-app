import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { Container, Text } from '../../../components';
import { NotificationItem } from '../components/NotificationItem';
import { useNotification } from '../hooks';

export const NotificationsScreen: React.FC = () => {
  const isFocused = useIsFocused();
  const { notifications, clearPendingNotifications } = useNotification();

  useEffect(() => {
    if (isFocused) {
      clearPendingNotifications();
    }
  }, [notifications, isFocused]);

  return (
    <Container>
      <Text type="h1">Notificaciones</Text>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem notification={item} />}
      />
    </Container>
  );
};
