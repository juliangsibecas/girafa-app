import { capitalize } from './string';

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
