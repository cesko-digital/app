import { type Contact } from "~/src/espocrm/espo";

import {
  diff,
  firstName,
  lastName,
  map,
  normalizeWebsiteUrl,
  stripWhitespaceAround,
} from "./import";

test("Diff", () => {
  expect(diff({}, {})).toEqual({});
  expect(diff<Contact>({}, { name: "Miles" })).toEqual({ name: "Miles" });
  expect(diff<Contact>({ name: "Miles" }, { name: "Dizzy" })).toEqual({
    name: "Dizzy",
  });
  expect(diff<Contact>({ name: "Miles" }, {})).toEqual({
    name: undefined,
  });
});

test("Map", () => {
  expect(
    map<string, string>(undefined, (s) => s.toUpperCase()),
  ).toBeUndefined();
  expect(map<string, string>("foo", (s) => s.toUpperCase())).toEqual("FOO");
});

test("Name split", () => {
  // First name
  expect(firstName("John Doe ")).toEqual("John");
  expect(firstName(" John  Doe ")).toEqual("John");
  expect(firstName("John Doe")).toEqual("John");
  expect(firstName("John")).toEqual("John");
  expect(firstName("")).toEqual("");
  expect(firstName("Ing. JUDr. John Doe")).toEqual("John");

  // Last name
  expect(lastName("John Doe Deere")).toEqual("Doe Deere");
  expect(lastName("John Doe")).toEqual("Doe");
  expect(lastName("John Doe ")).toEqual("Doe");
  expect(lastName("John  Doe ")).toEqual("Doe");
  expect(lastName("John")).toEqual("");
  expect(lastName("")).toEqual("");
  expect(lastName("Ing. JUDr. John Doe, PhD.")).toEqual("Doe");
});

test("Strip whitespace", () => {
  expect(stripWhitespaceAround("  foo ")).toEqual("foo");
  expect(stripWhitespaceAround("  foo bar")).toEqual("foo bar");
});

test("Normalize website URL", () => {
  expect(normalizeWebsiteUrl("www.2zsdobris.cz")).toEqual(
    "https://www.2zsdobris.cz",
  );
  expect(
    normalizeWebsiteUrl("https://www.alliancefrancaise.cz/jiznicechy/"),
  ).toEqual("https://www.alliancefrancaise.cz");
  expect(normalizeWebsiteUrl("http://centrumlocika.cz/")).toEqual(
    "https://centrumlocika.cz",
  );
  expect(normalizeWebsiteUrl("vizovice.dcpr.cz")).toEqual(
    "https://vizovice.dcpr.cz",
  );
  expect(normalizeWebsiteUrl("lopata bagr")).toBeUndefined();
  expect(normalizeWebsiteUrl(" www.proximasociale.cz")).toEqual(
    "https://www.proximasociale.cz",
  );
  expect(normalizeWebsiteUrl("www.proximasociale.cz?foo=bar")).toEqual(
    "https://www.proximasociale.cz",
  );
  expect(normalizeWebsiteUrl("WWW.foo.example")).toEqual(
    "https://www.foo.example",
  );
  expect(normalizeWebsiteUrl("https://opava.eurotopia.cz/index.php")).toEqual(
    "https://opava.eurotopia.cz",
  );
});
