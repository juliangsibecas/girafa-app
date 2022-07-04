import { UserNotification } from '../../api';

export type NotificationContextValues = {
  notifications: Array<UserNotification>;
  pendingNotificationsCount: number;
  clearPendingNotifications: () => void;
};
