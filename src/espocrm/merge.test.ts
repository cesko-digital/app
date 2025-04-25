import { contactMergeRules, type Contact } from "./espo";
import {
  mergeArrays,
  mergeArraysWithCustomEquality,
  mergeDelimitedArrays,
  mergeEmailAdddressData,
  mergeEntities,
} from "./merge";

//
// Trivial Cases
//

test("Empty merge", () => {
  expect(mergeEntities<Contact>({}, {}, contactMergeRules)).toEqual({});
});

//
// Immutable Props
//

test("Throw on immutable prop conflict", () => {
  expect(() =>
    mergeEntities<Contact>(
      {
        id: "xxx",
      },
      {
        id: "yyy",
      },
      contactMergeRules,
    ),
  ).toThrow();
});

test("Keep immutable prop if equal", () => {
  expect(
    mergeEntities<Contact>(
      {
        id: "xxx",
      },
      {
        id: "xxx",
      },
      contactMergeRules,
    ),
  ).toEqual({
    id: "xxx",
  });
});

test("Update immutable prop if not present", () => {
  expect(
    mergeEntities<Contact>(
      {},
      {
        id: "xxx",
      },
      contactMergeRules,
    ),
  ).toEqual({
    id: "xxx",
  });
});

//
// Updatable Props
//

test("Merge unrelated updatable props", () => {
  expect(
    mergeEntities<Contact>(
      {
        id: "xxx",
      },
      {
        name: "Miles Davis",
      },
      contactMergeRules,
    ),
  ).toEqual({
    id: "xxx",
    name: "Miles Davis",
  });
});

test("Pick defined value for updatable prop", () => {
  expect(
    mergeEntities<Contact>(
      {},
      {
        name: "Miles Davis",
      },
      contactMergeRules,
    ),
  ).toEqual({
    name: "Miles Davis",
  });
});

test("Do not erase existing value by undefined", () => {
  expect(
    mergeEntities<Contact>(
      {
        name: "Miles Davis",
      },
      {},
      contactMergeRules,
    ),
  ).toEqual({
    name: "Miles Davis",
  });
});

test("Pick right-hand side if both are defined", () => {
  expect(
    mergeEntities<Contact>(
      {
        name: "Miles Davis",
      },
      {
        name: "Miles Davis sr.",
      },
      contactMergeRules,
    ),
  ).toEqual({
    name: "Miles Davis sr.",
  });
});

//
// Mergable Props
//

test("Mergable props, both undefined", () => {
  expect(
    mergeEntities<Contact>(
      {
        cOccupation: undefined,
      },
      {
        cOccupation: undefined,
      },
      contactMergeRules,
    ),
  ).toEqual({});
});

test("Mergable props, rhs defined", () => {
  expect(
    mergeEntities<Contact>(
      {},
      {
        cOccupation: "foo",
      },
      contactMergeRules,
    ),
  ).toEqual({
    cOccupation: "foo",
  });
});

test("Mergable props, both defined", () => {
  expect(
    mergeEntities<Contact>(
      {
        cOccupation: "bar; baz",
      },
      {
        cOccupation: "foo",
      },
      contactMergeRules,
    ),
  ).toEqual({
    cOccupation: "bar; baz; foo",
  });
});

test("Mergable props, both defined, comma-separated", () => {
  expect(
    mergeEntities<Contact>(
      {
        cAvailableInDistricts: "Brno, Praha",
      },
      {
        cAvailableInDistricts: "Paris",
      },
      contactMergeRules,
    ),
  ).toEqual({
    cAvailableInDistricts: "Brno, Praha, Paris",
  });
});

//
// Email
//

test("Ignore scalar email when merging", () => {
  expect(
    mergeEntities<Contact>(
      { emailAddress: "miles@davis.name" },
      {},
      contactMergeRules,
    ),
  ).toEqual({});
});

test("Merge email address data", () => {
  expect(
    mergeEntities<Contact>(
      { emailAddressData: [{ emailAddress: "miles@davis.name" }] },
      {},
      contactMergeRules,
    ),
  ).toEqual({
    emailAddressData: [{ emailAddress: "miles@davis.name" }],
  });
});

//
// Merge Utils
//

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
