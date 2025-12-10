import assert from "node:assert";
import test from "node:test";

import {
  mergeArrays,
  mergeArraysWithCustomEquality,
  mergeDelimitedArrays,
  mergeEmailAdddressData,
  mergeRecords,
} from "./merge";

test("Merge arrays", () => {
  assert.deepStrictEqual(mergeArrays([], []), []);
  assert.deepStrictEqual(mergeArrays([1], [2]), [1, 2]);
  assert.deepStrictEqual(mergeArrays([1, 2], [2]), [1, 2]);
});

test("Merge separator-delimited arrays", () => {
  assert.equal(mergeDelimitedArrays(";")("", ""), "");
  assert.equal(mergeDelimitedArrays(";")("a;b", "c;d"), "a; b; c; d");
  assert.equal(mergeDelimitedArrays(",")("a,b", "c,d"), "a, b, c, d");
  assert.equal(mergeDelimitedArrays(",")("a,b", "a,c"), "a, b, c");
});

test("Merge arrays with custom equality", () => {
  type Item = { name: string };
  const merge = mergeArraysWithCustomEquality<Item>(
    (a, b) => a.name === b.name,
  );
  assert.deepStrictEqual(merge([], []), []);
  assert.deepStrictEqual(merge([{ name: "foo" }], []), [{ name: "foo" }]);
  assert.deepStrictEqual(
    merge([{ name: "foo" }], [{ name: "foo" }, { name: "bar" }]),
    [{ name: "foo" }, { name: "bar" }],
  );
});

test("Merge records", () => {
  assert.deepStrictEqual(mergeRecords({}, {}), {});
  assert.deepStrictEqual(mergeRecords({ foo: 1 }, { bar: 2 }), {
    foo: 1,
    bar: 2,
  });
  assert.deepStrictEqual(mergeRecords({ foo: 1 }, { foo: 2 }), { foo: 2 });
});

test("Merge email address data", () => {
  assert.deepStrictEqual(
    mergeEmailAdddressData(
      [{ emailAddress: "miles@davis.name", primary: true }],
      [
        { emailAddress: "Miles@davis.name" },
        { emailAddress: "milesdavis@gmail.com", primary: true },
      ],
    ),
    [
      { emailAddress: "miles@davis.name", primary: true },
      { emailAddress: "milesdavis@gmail.com", primary: false },
    ],
  );
});
