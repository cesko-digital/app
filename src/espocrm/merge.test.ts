import {
  mergeArrays,
  mergeArraysWithCustomEquality,
  mergeDelimitedArrays,
  mergeEmailAdddressData,
  mergeRecords,
} from "./merge";

test("Merge arrays", () => {
  expect(mergeArrays([], [])).toEqual([]);
  expect(mergeArrays([1], [2])).toEqual([1, 2]);
  expect(mergeArrays([1, 2], [2])).toEqual([1, 2]);
});

test("Merge separator-delimited arrays", () => {
  expect(mergeDelimitedArrays(";")("", "")).toBe("");
  expect(mergeDelimitedArrays(";")("a;b", "c;d")).toBe("a; b; c; d");
  expect(mergeDelimitedArrays(",")("a,b", "c,d")).toBe("a, b, c, d");
  expect(mergeDelimitedArrays(",")("a,b", "a,c")).toBe("a, b, c");
});

test("Merge arrays with custom equality", () => {
  type Item = { name: string };
  const merge = mergeArraysWithCustomEquality<Item>(
    (a, b) => a.name === b.name,
  );
  expect(merge([], [])).toEqual([]);
  expect(merge([{ name: "foo" }], [])).toEqual([{ name: "foo" }]);
  expect(merge([{ name: "foo" }], [{ name: "foo" }, { name: "bar" }])).toEqual([
    { name: "foo" },
    { name: "bar" },
  ]);
});

test("Merge records", () => {
  expect(mergeRecords({}, {})).toEqual({});
  expect(mergeRecords({ foo: 1 }, { bar: 2 })).toEqual({ foo: 1, bar: 2 });
  expect(mergeRecords({ foo: 1 }, { foo: 2 })).toEqual({ foo: 2 });
});

test("Merge email address data", () => {
  expect(
    mergeEmailAdddressData(
      [{ emailAddress: "miles@davis.name", primary: true }],
      [
        { emailAddress: "Miles@davis.name" },
        { emailAddress: "milesdavis@gmail.com", primary: true },
      ],
    ),
  ).toEqual([
    { emailAddress: "miles@davis.name", primary: true },
    { emailAddress: "milesdavis@gmail.com", primary: false },
  ]);
});
