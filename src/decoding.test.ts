import assert from "node:assert";
import test from "node:test";

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
  assert.throws(() => decodeUrl("bagr"));
  assert.throws(() => decodeUrl(""));
  assert.equal(decodeUrl("app://deeplink"), "app://deeplink");
  assert.equal(
    decodeUrl("https://cesko-digital.slack.com/archives/C01AENB1LPP"),
    "https://cesko-digital.slack.com/archives/C01AENB1LPP",
  );
  assert.equal(decodeUrl("mailto:bagr@lopata.cz"), "mailto:bagr@lopata.cz");
  assert.equal(decodeUrl("www.google.com"), "https://www.google.com/");
});

test("Decode valid items from array", () => {
  const decoder = decodeValidItemsFromArray(number, "Test", () => {});
  assert.deepStrictEqual(decoder(["foo", "bar", 42]), [42]);
});

test("Decode object", () => {
  const decoder = decodeObject(record({ name: string, age: number }));
  assert.deepStrictEqual(decoder({ userA: { name: "Miles", age: 42 } }), {
    userA: {
      name: "Miles",
      age: 42,
    },
  });
});

test("Decode with defaults", () => {
  const decoder = withDefault(optional(boolean), true);
  assert.equal(decoder(false), false);
  assert.equal(decoder(true), true);
  assert.equal(decoder(undefined), true);
});

test("Decode Airtable relation", () => {
  assert.equal(relationToZeroOrOne(undefined), undefined);
  assert.equal(relationToZeroOrOne([]), undefined);
  assert.equal(relationToZeroOrOne(["foo"]), "foo");
  assert.equal(relationToZeroOrOne("foo"), "foo");
});

test("Decode optional array", () => {
  const decoder = optionalArray(string);
  assert.deepStrictEqual(decoder(undefined), []);
  assert.deepStrictEqual(decoder([]), []);
  assert.deepStrictEqual(decoder(["foo", "bar"]), ["foo", "bar"]);
  assert.throws(() => decoder([1, 2]));
});

test("Decode JSON string", () => {
  const input = '{"foo":"bar"}';
  const decodePayload = record({
    foo: string,
  });
  const decode = decodeJSONString(decodePayload);
  assert.deepStrictEqual(decode(input), { foo: "bar" });
});
