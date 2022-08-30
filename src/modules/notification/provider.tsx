import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal';
import { useEffect, useState } from 'react';
import { usePermissions } from 'expo-notifications';
import { NotificationContext } from './context';
import { useAuth } from '../auth/hooks';
import {
  NotificationType,
  useGetNotificationsQuery,
  UserNotification,
} from '../../api';
import { StateHandler } from '../../components';
import { Maybe } from 'yup/lib/types';
import { useAppStatus, useEffectExceptOnMount } from '../../hooks';
import { env } from '../../env';

OneSignal.setAppId(env.oneSignalId);

export const NotificationsProvider: React.FC = ({ children }) => {
  const { isForeground } = useAppStatus();
  const [permission, askPermission] = usePermissions();
  const { userId, isSignedIn, isLoading: isAuthLoading } = useAuth();

  const {
    data: query,
    loading: isLoading,
    error,
    refetch,
  } = useGetNotificationsQuery({ skip: isAuthLoading || !isSignedIn });

  const [notifications, setNotifications] = useState<Array<UserNotification>>(
    []
  );
  const [pendingCount, setPendingCount] = useState(0);
  const [lastViewed, setLastViewed] = useState<Maybe<string>>();

  const addNotification = (notification: UserNotification) => {
    setNotifications([notification, ...notifications]);
    setPendingCount(pendingCount + 1);
  };

  const clearPendingNotifications = async () => {
    setPendingCount(0);
    const last = notifications[0]._id;

    setLastViewed(last);
    await AsyncStorage.setItem('lastNotificationViewed', last);
  };

  useEffect(() => {
    const fn = async () => {
      setLastViewed(await AsyncStorage.getItem('lastNotificationViewed'));
    };

    fn();
  }, []);

  useEffectExceptOnMount(() => {
    if (isForeground) {
      refetch();
    }
  }, [isForeground]);

  useEffect(() => {
    if (query && query.getNotifications) {
      const data = query.getNotifications;
      setNotifications(data);

      const count = lastViewed
        ? data.findIndex(({ _id }) => _id === lastViewed)
        : data.length;

      setPendingCount(count);
    }
  }, [query]);

  useEffect(() => {
    const fn = async () => {
      if (!permission || (!permission.granted && permission.canAskAgain)) {
        await askPermission();
      }
    };

    fn();
  }, [permission]);

  useEffect(() => {
    if (userId && permission?.granted) {
      OneSignal.setExternalUserId(userId);
    } else {
      OneSignal.removeExternalUserId();
    }
  }, [userId, permission]);

  OneSignal.setNotificationWillShowInForegroundHandler(
    (notificationReceivedEvent) => {
      const notification = notificationReceivedEvent.getNotification();
      const data = notification.additionalData as UserNotification;

      if (
        [NotificationType.Follow, NotificationType.Invite].includes(data.type)
      ) {
        addNotification(data);
      }
      notificationReceivedEvent.complete(notification);
    }
  );
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        pendingNotificationsCount: pendingCount,
        clearPendingNotifications,
      }}
    >
      <StateHandler isLoading={isLoading} isError={Boolean(error)}>
        {children}
      </StateHandler>
    </NotificationContext.Provider>
  );
};
