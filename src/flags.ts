import {
  nil,
  undef,
  union,
  type DecoderFunction,
} from "typescript-json-decoder";

import { decodeValidItemsFromArray } from "~/src/decoding";
import { unique } from "~/src/utils";

export const setFlag = <T>(current: readonly T[], flag: T, checked = true) =>
  checked ? unique([...current, flag]) : current.filter((f) => f !== flag);

export const getFlag = <T>(current: readonly T[], flag: T) =>
  current.includes(flag);

/** Decode an array of flags, skipping unknown values and returning empty array for `undefined` and `null` */
export function decodeFlags<T>(decodeSingleFlag: DecoderFunction<T>) {
  const decoder = union(
    undef,
    nil,
    decodeValidItemsFromArray(decodeSingleFlag, "Flags", () => {
      /* silence logs */
    }),
  );
  return (value: unknown) => {
    const decoded = decoder(value);
    return decoded ?? [];
  };
}
