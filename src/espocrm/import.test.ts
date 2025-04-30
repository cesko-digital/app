import { type Contact } from "./contact";
import {
  diff,
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
