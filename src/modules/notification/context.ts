import { createContext } from 'react';
import { Maybe } from '../../types';
import { NotificationContextValues } from './types';

export const NotificationContext =
  createContext<Maybe<NotificationContextValues>>(null);
