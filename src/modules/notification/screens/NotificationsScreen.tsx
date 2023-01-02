import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';

import { Box, Container, Icon, StateHandler, Text } from '../../../components';

import { NotificationItem } from '../components';
import { useNotification } from '../hooks';

export const NotificationsScreen: React.FC = () => {
  const { t } = useTranslation();
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
    <Container headerPlaceholder>
      <Text type="h1" mb={2}>
        {t('general.notifications')}
      </Text>
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
              <Icon name="bell" color="primary" size={12} />
              <Text mt={2}>
                {t('notification.screens.Notifications.emptyText')}
              </Text>
            </Box>
          </ScrollView>
        )}
      </StateHandler>
    </Container>
  );
};
