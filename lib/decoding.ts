import { MarkdownString } from "./utils";
import { DecoderFunction, Pojo, string } from "typescript-json-decoder";

/** Decode a string, returning it as a `MarkdownString` */
export const markdown = (value: Pojo): MarkdownString => ({
  source: string(value),
});

/** Decode an array of items, returing the first item found */
export const takeFirst = <T>(decoder: DecoderFunction<T[]>) => {
  return (value: Pojo) => {
    const array = decoder(value);
    if (array.length == 0) {
      throw "TBD";
    }
    return array[0];
  };
};

/** Try a decoder and return a default value in case it fails */
export const withDefault = <T>(
  decoder: DecoderFunction<T>,
  defaultValue: T
) => {
  return (value: Pojo) => {
    try {
      return decoder(value);
    } catch (_) {
      return defaultValue;
    }
  };
};
