export function insertObjectIf<T = Record<string, unknown>>(
  condition: boolean,
  obj: T
): T | {} {
  return condition ? obj : {};
}

export * from './date';
