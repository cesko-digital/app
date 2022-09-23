import { MarkdownString } from "./utils";
import {
  array,
  Decoder,
  DecoderFunction,
  decodeType,
  dict,
  Pojo,
  string,
  undef,
  union,
} from "typescript-json-decoder";

/** Decode a string, returning it as a `MarkdownString` */
export const markdown = (value: Pojo): MarkdownString => ({
  source: string(value),
});

/** Decode an array of items, returing the first item found, throw if array is empty */
export const takeFirst = <T>(decoder: DecoderFunction<T[]>) => {
  return (value: Pojo) => {
    const array = decoder(value);
    if (array.length == 0) {
      throw "Can’t take first item from an empty array";
    }
    return array[0];
  };
};

/** Decode `undefined` as an empty array */
export const optionalArray = <T>(itemDecoder: DecoderFunction<T>) => {
  return (value: Pojo) => {
    const decoder = union(undef, array(itemDecoder));
    const decoded = decoder(value);
    return decoded ?? [];
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

export const decodeJSONString =
  <T>(decoder: DecoderFunction<T>) =>
  (value: Pojo) =>
    decoder(JSON.parse(string(value)));

/**
 * Decode a URL string
 *
 * Throws if the string is not a valid URL.
 */
export const decodeUrl = (value: Pojo) => new URL(string(value)).toString();

/**
 * Parse an Airtable relation from the current table to one record in another table
 *
 * The relation is always optional (the value doesn’t have to be there), but even
 * if the value _is_ there, the Airtable API always returns an array, so we simplify
 * the whole thing to either the singleton value or undefined.
 */
export const relationToZeroOrOne = withDefault(
  takeFirst(array(string)),
  undefined
);

/** Extract a dict, returning only its values */
export const decodeDictValues =
  <T>(decodeItem: DecoderFunction<T>) =>
  (value: Pojo) =>
    [...dict(decodeItem)(value).values()];

/** Decode an object with given entries */
export function decodeObject<D extends Decoder<unknown>>(
  decoder: D
): DecoderFunction<Record<string, decodeType<D>>> {
  return (value: Pojo) => Object.fromEntries(dict(decoder)(value));
}

/**
 * Decode skills such as Marketing, Design, …
 *
 * The “Other” skill is special – it doesn’t make much sense in combination with
 * other skills, so we only allow it when it’s the only skill specified. More here:
 * https://cesko-digital.slack.com/archives/CHG9NA23D/p1649168585006699
 */
export const decodeSkills = (value: Pojo) => {
  const skills = array(string)(value);
  if (skills.length > 1) {
    return skills.filter((skill) => skill !== "Other");
  } else {
    return skills;
  }
};

/**
 * Decode an array of items, skipping items that fail to decode
 *
 * Logs errors and total number of decoded items to console.
 */
export function decodeValidItemsFromArray<T>(
  decodeItem: DecoderFunction<T>,
  tag = "<unknown>",
  log = console.info,
  verbose = process.env.VERBOSE_LOG
): DecoderFunction<T[]> {
  const arrayToString = (arr: any) => `${JSON.stringify(arr)}`;
  return (value: Pojo) => {
    if (!Array.isArray(value)) {
      throw `The value \`${arrayToString(
        value
      )}\` is not of type \`array\`, but is of type \`${typeof value}\``;
    }
    let index = 0;
    let values: T[] = [];
    for (const item of value) {
      try {
        values.push(decodeItem(item));
      } catch (e) {
        log(
          verbose
            ? `Error decoding item #${index} in ${tag}: ${e}`
            : `Error decoding item #${index} in ${tag}, skipping (set VERBOSE_LOG to see more).`
        );
      }
      index++;
    }
    log(`Successfully decoded ${values.length} items in ${tag}.`);
    return values;
  };
}
