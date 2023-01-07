export function insertObjectIf<T = Record<string, unknown>>(
  condition: boolean | undefined,
  obj: T
): T | {} {
  return condition ? obj : {};
}

export * from './date';
export * from './platform';
export * from './object';
