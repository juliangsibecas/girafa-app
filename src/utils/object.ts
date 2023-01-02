export function insertObjectIf<T = Record<string, unknown>>(
  condition: boolean | undefined,
  obj: T
): T | {} {
  return condition ? obj : {};
}
