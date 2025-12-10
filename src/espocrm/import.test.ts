import assert from "node:assert";
import test from "node:test";

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
  assert.deepStrictEqual(diff({}, {}), {});
  assert.deepStrictEqual(diff<Contact>({}, { name: "Miles" }), {
    name: "Miles",
  });
  assert.deepStrictEqual(diff<Contact>({ name: "Miles" }, { name: "Dizzy" }), {
    name: "Dizzy",
  });
});

test("Map", () => {
  assert.equal(
    map<string, string>(undefined, (s) => s.toUpperCase()),
    undefined,
  );
  assert.equal(
    map<string, string>("foo", (s) => s.toUpperCase()),
    "FOO",
  );
});

test("Name split", () => {
  // First name
  assert.equal(firstName("John Doe "), "John");
  assert.equal(firstName(" John  Doe "), "John");
  assert.equal(firstName("John Doe"), "John");
  assert.equal(firstName("John"), "John");
  assert.equal(firstName(""), "");
  assert.equal(firstName("Ing. JUDr. John Doe"), "John");

  // Last name
  assert.equal(lastName("John Doe Deere"), "Doe Deere");
  assert.equal(lastName("John Doe"), "Doe");
  assert.equal(lastName("John Doe "), "Doe");
  assert.equal(lastName("John  Doe "), "Doe");
  assert.equal(lastName("John"), "");
  assert.equal(lastName(""), "");
  assert.equal(lastName("Ing. JUDr. John Doe, PhD."), "Doe");
});

test("Strip whitespace", () => {
  assert.equal(stripWhitespaceAround("  foo "), "foo");
  assert.equal(stripWhitespaceAround("  foo bar"), "foo bar");
});

test("Normalize website URL", () => {
  assert.equal(
    normalizeWebsiteUrl("www.2zsdobris.cz"),
    "https://www.2zsdobris.cz",
  );
  assert.equal(
    normalizeWebsiteUrl("https://www.alliancefrancaise.cz/jiznicechy/"),
    "https://www.alliancefrancaise.cz",
  );
  assert.equal(
    normalizeWebsiteUrl("http://centrumlocika.cz/"),
    "https://centrumlocika.cz",
  );
  assert.equal(
    normalizeWebsiteUrl("vizovice.dcpr.cz"),
    "https://vizovice.dcpr.cz",
  );
  assert.equal(normalizeWebsiteUrl("lopata bagr"), undefined);
  assert.equal(
    normalizeWebsiteUrl(" www.proximasociale.cz"),
    "https://www.proximasociale.cz",
  );
  assert.equal(
    normalizeWebsiteUrl("www.proximasociale.cz?foo=bar"),
    "https://www.proximasociale.cz",
  );
  assert.equal(
    normalizeWebsiteUrl("WWW.foo.example"),
    "https://www.foo.example",
  );
  assert.equal(
    normalizeWebsiteUrl("https://opava.eurotopia.cz/index.php"),
    "https://opava.eurotopia.cz",
  );
});
