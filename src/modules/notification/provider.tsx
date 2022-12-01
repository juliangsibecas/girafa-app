import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal';
import { useEffect, useState } from 'react';
import { usePermissions } from 'expo-notifications';
import { NotificationContext } from './context';
import { useAuth } from '../auth/hooks';
import {
  FeatureToggleName,
  NotificationType,
  useNotificationsGetByUserIdQuery,
  UserNotification,
} from '../../api';
import { Maybe } from 'yup/lib/types';
import { useAppStatus, useEffectExceptOnMount } from '../../hooks';
import { env } from '../../env';
import { useFeatureToggle } from '../featureToggle';

OneSignal.setAppId(env.oneSignalId);

type Props = {
  children: React.ReactNode;
};

export const NotificationsProvider: React.FC<Props> = ({ children }) => {
  const { isForeground } = useAppStatus();
  const { userId, isSignedIn, isLoading: isAuthLoading } = useAuth();
  const { isEnabled, isLoading: isFeatureFlagLoading } = useFeatureToggle(
    FeatureToggleName.NotificationGet
  );
  const [permission, askPermission] = usePermissions();

  const {
    data: query,
    loading: isLoading,
    error,
    refetch,
    networkStatus,
  } = useNotificationsGetByUserIdQuery({
    skip: isAuthLoading || !isSignedIn || isFeatureFlagLoading || !isEnabled,
  });

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
    try {
      if (notifications.length) {
        setPendingCount(0);
        const last = notifications[0]._id;

        setLastViewed(last);
        await AsyncStorage.setItem('lastNotificationViewed', last);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fn = async () => {
      try {
        setLastViewed(await AsyncStorage.getItem('lastNotificationViewed'));
      } catch (e) {
        console.log(e);
      }
    };

    fn();
  }, []);

  useEffectExceptOnMount(() => {
    if (isForeground) {
      refetch();
    }
  }, [isForeground]);

  useEffect(() => {
    if (query && query.notificationsGetByUserId) {
      const data = query.notificationsGetByUserId;
      setNotifications(data);

      const count = lastViewed
        ? data.findIndex(({ _id }) => _id === lastViewed)
        : data.length;

      setPendingCount(count);
    }
  }, [query]);

  useEffect(() => {
    const fn = async () => {
      try {
        if (!permission || (!permission.granted && permission.canAskAgain)) {
          await askPermission();
        }
      } catch (e) {
        console.log(e);
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
        refetch,
        isLoading,
        isError: Boolean(error),
        isRefreshing: networkStatus === 4,
        pendingNotificationsCount: pendingCount,
        clearPendingNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
