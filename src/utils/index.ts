export function insertObjectIf<T = Record<string, unknown>>(
  condition: boolean | undefined,
  obj: T
): T | {} {
  return condition ? obj : {};
}

export * from './id';
export * from './object';
export * from './platform';
export * from './date';
