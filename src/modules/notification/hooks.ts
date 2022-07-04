import { useContext } from 'react';
import { NotificationContext } from './context';

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) throw new Error();

  return context;
};
