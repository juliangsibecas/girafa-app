import { useEffect, useState } from 'react';

interface IUseDebounce<T> {
  value: T;
  delay?: number;
  onDebounceChange?: (value: T) => void;
}

export function useDebounce<T>({
  value,
  delay,
  onDebounceChange,
}: IUseDebounce<T>): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  useEffect(() => {
    onDebounceChange?.(debouncedValue);
  }, [debouncedValue]);

  return debouncedValue;
}
