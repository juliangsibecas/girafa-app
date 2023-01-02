import moment from 'moment';
import { ThemeMode } from './types';

export const getAutomaticTheme = () => {
  const hour = moment().hour();

  if (hour > 8 && hour < 22) {
    return ThemeMode.LIGHT;
  }

  return ThemeMode.DARK;
};
