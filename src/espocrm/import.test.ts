import { type Contact } from "./contact";
import { diff, map, stripWhitespaceAround } from "./import";

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
