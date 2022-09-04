import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, RefreshControl, ScrollView } from 'react-native';
import { Box, Container, StateHandler, Text } from '../../../components';
import { NotificationItem } from '../components/NotificationItem';
import { useNotification } from '../hooks';

export const NotificationsScreen: React.FC = () => {
  const isFocused = useIsFocused();
  const {
    notifications,
    isLoading,
    isError,
    isRefreshing,
    refetch,
    clearPendingNotifications,
  } = useNotification();

  useEffect(() => {
    if (isFocused) {
      clearPendingNotifications();
    }
  }, [notifications, isFocused]);

  return (
    <Container>
      <Text type="h1">Notificaciones</Text>
      <StateHandler isLoading={isLoading} isError={isError}>
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            renderItem={({ item }) => <NotificationItem notification={item} />}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={refetch} />
            }
          />
        ) : (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={refetch} />
            }
          >
            <Box flexGrow={1} center>
              <Text>No tenes notis pa</Text>
            </Box>
          </ScrollView>
        )}
      </StateHandler>
    </Container>
  );
};
