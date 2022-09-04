import { UserNotification } from '../../api';

export type NotificationContextValues = {
  notifications: Array<UserNotification>;
  refetch: () => void;
  isLoading: boolean;
  isError: boolean;
  isRefreshing: boolean;
  pendingNotificationsCount: number;
  clearPendingNotifications: () => void;
};
