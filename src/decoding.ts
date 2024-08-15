import {
  array,
  dict,
  nil,
  string,
  undef,
  union,
  type Decoder,
  type DecoderFunction,
  type decodeType,
} from "typescript-json-decoder";

import { type MarkdownString } from "~/src/utils";

/** Decode a string, returning it as a `MarkdownString` */
export const markdown = (value: unknown): MarkdownString => ({
  source: string(value),
});

/** Decode an array of items, returing the first item found, throw if array is empty */
export const takeFirst = <T>(decoder: DecoderFunction<T[]>) => {
  return (value: unknown) => {
    const array = decoder(value);
    if (array.length == 0) {
      throw new Error("Can’t take first item from an empty array");
    }
    return array[0];
  };
};

/** Decode `undefined` and `null` as an empty array */
export const optionalArray = <T>(itemDecoder: DecoderFunction<T>) => {
  return (value: unknown) => {
    const decoder = union(undef, nil, array(itemDecoder));
    const decoded = decoder(value);
    return decoded ?? [];
  };
};

/** Try a decoder and return a default value in case it fails or returns `undefined` */
export const withDefault = <T>(
  decoder: DecoderFunction<T | undefined>,
  defaultValue: T,
): DecoderFunction<T> => {
  return (value: unknown) => {
    try {
      return decoder(value) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  };
};

/** Decode a JSON string into an object */
export const decodeJSONString =
  <T>(decoder: DecoderFunction<T>) =>
  (value: unknown) =>
    decoder(JSON.parse(string(value)));

/**
 * Decode a URL string
 *
 * Throws if the string is not a valid URL. As a courtesy, relative
 * URLs that start with `www.` are converted to absolute URLs by prepending
 * `https://`.
 */
export const decodeUrl = (value: unknown) => {
  let s = string(value);
  if (s.startsWith("www.")) {
    s = "https://" + s;
  }
  return new URL(s).toString();
};

/**
 * Parse an Airtable relation from the current table to one record in another table
 *
 * The relation is always optional (the value doesn’t have to be there), but even
 * if the value _is_ there, the Airtable API returns an array, so we simplify
 * the whole thing to either the singleton value or undefined.
 *
 * As an additional evil plot twist, in a synced table the value is _not_ an array,
 * but a single string. Go figure.
 */
export const relationToZeroOrOne = (value: unknown) => {
  if (!value) {
    return undefined;
  } else if (Array.isArray(value) && value.length === 0) {
    return undefined;
  } else if (Array.isArray(value)) {
    const decodeArray = array(string);
    const decoded = decodeArray(value);
    if (decoded.length !== 1) {
      console.warn(
        `Unexpected number of records when decoding relation, expected 0 or 1 values, got ${decoded.length}`,
      );
    }
    return decoded[0];
  } else {
    return string(value);
  }
};

/**
 * Parse Airtable relation from the current table to zero or more records in another table
 *
 * The relation is always optional (the value doesn’t have to be there), but even
 * if the value _is_ there, the Airtable API returns an array, so we simplify
 * the whole thing to either the values or an empty array.
 */
export const relationToZeroOrMany = optionalArray(string);

/** Extract a dict, returning only its values */
export const decodeDictValues =
  <T>(decodeItem: DecoderFunction<T>) =>
  (value: unknown) => [...dict(decodeItem)(value).values()];

/** Decode an object with given entries */
export function decodeObject<D extends Decoder<unknown>>(
  decoder: D,
): DecoderFunction<Record<string, decodeType<D>>> {
  return (value: unknown) => Object.fromEntries(dict(decoder)(value));
}

/**
 * Decode skills such as Marketing, Design, …
 *
 * The “Other” skill is special – it doesn’t make much sense in combination with
 * other skills, so we only allow it when it’s the only skill specified. More here:
 * https://cesko-digital.slack.com/archives/CHG9NA23D/p1649168585006699
 */
export const decodeSkills = (value: unknown) => {
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
  verbose = process.env.VERBOSE_LOG,
): DecoderFunction<T[]> {
  const stringify = (val: unknown) => `${JSON.stringify(val)}`;
  return (value: unknown) => {
    if (!Array.isArray(value)) {
      throw new Error(
        `The value \`${stringify(
          value,
        )}\` is not of type \`array\`, but is of type \`${typeof value}\``,
      );
    }
    let index = 0;
    const values: T[] = [];
    for (const item of value) {
      try {
        values.push(decodeItem(item));
      } catch (e) {
        log(
          verbose
            ? `Error decoding item #${index} in ${tag}: ${e}`
            : `Could not decode item #${index} in ${tag}, skipping (set VERBOSE_LOG to see more).`,
        );
      }
      index++;
    }
    log(`Successfully decoded ${values.length} items in ${tag}.`);
    return values;
  };
}
