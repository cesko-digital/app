import { contactMergeRules, type Contact } from "./espo";
import { mergeEntities } from "./merge";

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
// Magic Props
//

test("Merge e-mails with one missing", () => {
  expect(
    mergeEntities<Contact>(
      {},
      {
        emailAddress: "miles@davis.name",
      },
      contactMergeRules,
    ),
  ).toEqual<Partial<Contact>>({
    emailAddress: "miles@davis.name",
  });
});

test("Merge two different e-mails", () => {
  expect(
    mergeEntities<Contact>(
      {
        emailAddress: "miles@davis.name",
      },
      {
        emailAddress: "milesdavis@gmail.com",
      },
      contactMergeRules,
    ),
  ).toEqual<Partial<Contact>>({
    emailAddress: "miles@davis.name",
    emailAddressData: [
      {
        emailAddress: "miles@davis.name",
        lower: "miles@davis.name",
        primary: true,
        invalid: false,
        optOut: false,
      },
      {
        emailAddress: "milesdavis@gmail.com",
        lower: "milesdavis@gmail.com",
        primary: false,
        invalid: false,
        optOut: false,
      },
    ],
  });
});

test("Merge single vs. multiple e-mails", () => {
  expect(
    mergeEntities<Contact>(
      {
        emailAddress: "miles@davis.name",
      },
      {
        emailAddress: "milesdavis@gmail.com",
        emailAddressData: [
          {
            emailAddress: "milesdavis@gmail.com",
            lower: "milesdavis@gmail.com",
            primary: true,
            invalid: false,
            optOut: false,
          },
        ],
      },
      contactMergeRules,
    ),
  ).toEqual<Partial<Contact>>({
    emailAddress: "miles@davis.name",
    emailAddressData: [
      {
        emailAddress: "miles@davis.name",
        lower: "miles@davis.name",
        primary: true,
        invalid: false,
        optOut: false,
      },
      {
        emailAddress: "milesdavis@gmail.com",
        lower: "milesdavis@gmail.com",
        primary: false,
        invalid: false,
        optOut: false,
      },
    ],
  });
});
