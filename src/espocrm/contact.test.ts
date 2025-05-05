import { decodeBasicContactFields, mergeRules, type Contact } from "./contact";
import { mergeEntities } from "./merge";

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
      mergeRules,
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
      mergeRules,
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
      mergeRules,
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
        cBio: "Did some bad things",
      },
      mergeRules,
    ),
  ).toEqual({
    id: "xxx",
    cBio: "Did some bad things",
  });
});

test("Pick defined value for updatable prop", () => {
  expect(
    mergeEntities<Contact>(
      {},
      {
        cBio: "Did some bad things",
      },
      mergeRules,
    ),
  ).toEqual({
    cBio: "Did some bad things",
  });
});

test("Do not erase existing value by undefined", () => {
  expect(
    mergeEntities<Contact>(
      {
        cBio: "Did some bad things",
      },
      {},
      mergeRules,
    ),
  ).toEqual({
    cBio: "Did some bad things",
  });
});

test("Pick right-hand side if both are defined", () => {
  expect(
    mergeEntities<Contact>(
      {
        cBio: "Did some bad things",
      },
      {
        cBio: "Did some good things",
      },
      mergeRules,
    ),
  ).toEqual({
    cBio: "Did some good things",
  });
});

//
// Read-only after create
//

test("Read-only after create: set new value for undefined prop", () => {
  expect(
    mergeEntities<Contact>({}, { createdAt: new Date("2020-1-1") }, mergeRules),
  ).toEqual<Partial<Contact>>({
    createdAt: new Date("2020-1-1"),
  });
});

test("Read-only after create: ignore new value if already present", () => {
  expect(
    mergeEntities<Contact>(
      { createdAt: new Date("2020-1-1") },
      { createdAt: new Date("2025-1-1") },
      mergeRules,
    ),
  ).toEqual<Partial<Contact>>({
    createdAt: new Date("2020-1-1"),
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
      mergeRules,
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
      mergeRules,
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
      mergeRules,
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
      mergeRules,
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
      mergeRules,
    ),
  ).toEqual({});
});

test("Merge email address data", () => {
  expect(
    mergeEntities<Contact>(
      { emailAddressData: [{ emailAddress: "miles@davis.name" }] },
      {},
      mergeRules,
    ),
  ).toEqual({
    emailAddressData: [{ emailAddress: "miles@davis.name" }],
  });
});

test("Decode basic contact from target list", () => {
  expect(() =>
    decodeBasicContactFields({
      id: "67e2af5ae58fb01ac",
      name: "Tomáš Znamenáček",
      salutationName: null,
      firstName: "Tomáš",
      lastName: "Znamenáček",
      emailAddress: "zoul@zoul.cz",
      accountIsInactive: false,
      createdAt: "2019-12-12 16:47:00",
      targetListIsOptedOut: false,
      middleName: null,
      emailAddressIsOptedOut: false,
      emailAddressIsInvalid: false,
      accountId: "67e552903f9522d5b",
      accountName: "Česko.Digital",
      createdById: "67d2f77123879824e",
      assignedUserId: null,
    }),
  ).not.toThrow();
});
