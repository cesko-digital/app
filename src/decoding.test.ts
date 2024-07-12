import {
  boolean,
  number,
  optional,
  record,
  string,
} from "typescript-json-decoder";

import {
  decodeJSONString,
  decodeObject,
  decodeUrl,
  decodeValidItemsFromArray,
  optionalArray,
  relationToZeroOrOne,
  withDefault,
} from "./decoding";

test("Decode URL", () => {
  expect(() => decodeUrl("bagr")).toThrow();
  expect(() => decodeUrl("")).toThrow();
  expect(decodeUrl("app://deeplink")).toEqual("app://deeplink");
  expect(
    decodeUrl("https://cesko-digital.slack.com/archives/C01AENB1LPP"),
  ).toEqual("https://cesko-digital.slack.com/archives/C01AENB1LPP");
  expect(decodeUrl("mailto:bagr@lopata.cz")).toEqual("mailto:bagr@lopata.cz");
});

test("Decode valid items from array", () => {
  const decoder = decodeValidItemsFromArray(number, "Test", () => {});
  expect(decoder(["foo", "bar", 42])).toEqual([42]);
});

test("Decode object", () => {
  const decoder = decodeObject(record({ name: string, age: number }));
  expect(decoder({ userA: { name: "Miles", age: 42 } })).toEqual({
    userA: {
      name: "Miles",
      age: 42,
    },
  });
});

test("Decode with defaults", () => {
  const decoder = withDefault(optional(boolean), true);
  expect(decoder(false)).toBe(false);
  expect(decoder(true)).toBe(true);
  expect(decoder(undefined)).toBe(true);
});

test("Decode Airtable relation", () => {
  expect(relationToZeroOrOne(undefined)).toBeUndefined();
  expect(relationToZeroOrOne([])).toBeUndefined();
  expect(relationToZeroOrOne(["foo"])).toBe("foo");
  expect(relationToZeroOrOne("foo")).toBe("foo");
});

test("Decode relation with unexpected number of records", () => {
  const consoleWarn = console.warn;
  console.warn = jest.fn();
  expect(relationToZeroOrOne(["foo", "bar"])).toBe("foo");
  expect(console.warn).toHaveBeenCalled();
  console.warn = consoleWarn;
});

test("Decode optional array", () => {
  const decoder = optionalArray(string);
  expect(decoder(undefined)).toEqual([]);
  expect(decoder([])).toEqual([]);
  expect(decoder(["foo", "bar"])).toEqual(["foo", "bar"]);
  expect(() => decoder([1, 2])).toThrow();
});

test("Decode JSON string", () => {
  const input = '{"foo":"bar"}';
  const decodePayload = record({
    foo: string,
  });
  const decode = decodeJSONString(decodePayload);
  expect(decode(input)).toEqual({ foo: "bar" });
});
