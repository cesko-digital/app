export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined
}

export function map<T, U>(value: T | undefined, f: (_: T) => U): U | undefined {
  return value != undefined ? f(value) : undefined
}
