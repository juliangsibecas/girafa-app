import moment from 'moment';
import { WatchQueryFetchPolicy } from '@apollo/client';

const lastFetch = { value: 0 };

export const getTimeBasedFetchPolicy = (
  expirationMs: number
): WatchQueryFetchPolicy => {
  const { value: lastFetchTimestamp } = lastFetch;
  const diffFromNow = lastFetchTimestamp
    ? moment.now() - lastFetchTimestamp
    : Number.MAX_SAFE_INTEGER;

  if (diffFromNow > expirationMs) {
    lastFetch.value = moment.now();
    return 'network-only';
  }

  return 'cache-first';
};
