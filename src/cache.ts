import { Cache } from "file-system-cache";

import { hashDigest } from "./utils";

const sharedCache = new Cache({ ttl: 60 * 5 });

type Producer<T> = (...args: any[]) => Promise<T>;

export function memoize<ReturnType, F extends Producer<ReturnType>>(
  originalFunction: F,
  key: string = originalFunction.name,
): F {
  if (!key) {
    console.error("Cache key is empty, things will probably break.");
  }
  const memoized = async (...args: Parameters<F>): Promise<ReturnType> => {
    const compoundKey = hashDigest([key, ...args]);
    const cachedValue = await sharedCache.get(compoundKey);
    if (cachedValue) {
      return cachedValue;
    } else {
      const freshValue = await originalFunction(...args);
      sharedCache.set(compoundKey, freshValue);
      return freshValue;
    }
  };
  return memoized as F;
}
