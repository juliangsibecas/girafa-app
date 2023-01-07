import moment, { Moment } from 'moment';

const isToday = (date: Moment) => moment().isSame(date, 'day');
const isYesterday = (date: Moment) =>
  moment().subtract(1, 'day').isSame(date, 'day');

const isTomorrow = (date: Moment) => moment().add(1, 'day').isSame(date, 'day');

export const formatDate = (str: string) => {
  const date = moment(str);

  if (isToday(date)) {
    return 'Hoy';
  }

  if (isTomorrow(date)) {
    return 'Mañana';
  }

  return date.format('dddd DD/MM');
};

export const formatDateTime = (str: string) => {
  const date = moment(str);

  if (isToday(date)) {
    return `${String(date.hours()).padStart(2, '0')}:${String(
      date.minutes()
    ).padStart(2, '0')}`;
  }

  if (isYesterday(date)) {
    return `Ayer`;
  }

  return date.format('DD/MM');
};
