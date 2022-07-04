import { capitalize } from './string';
import { timezone } from 'expo-localization';

const timezoneDate = (date: Date) => {
  return new Date(
    date.toLocaleString('en-US', {
      timeZone: timezone,
    })
  );
};

const isToday = (date: Date) =>
  timezoneDate(new Date()).toDateString() === date.toDateString();

const isYesterday = (date: Date) => {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  return timezoneDate(today).toDateString() === date.toDateString();
};

export const formatDate = (str: string) => {
  const today = new Date();
  const date = new Date(str);

  if (today.toDateString() === date.toDateString()) {
    return 'Hoy';
  }

  return capitalize(
    `${date.toLocaleDateString('es', {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric',
    })}`
  );
};

export const formatDateTime = (str: string) => {
  const date = timezoneDate(new Date(str));

  if (isToday(date)) {
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  }
  if (isYesterday(date)) {
    return `Ayer`;
  }

  return `${date.getDate()}/${date.getMonth() + 1}`;
};
