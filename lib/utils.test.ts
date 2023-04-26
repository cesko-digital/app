import {
  hashDigest,
  looksLikeEmailAdress,
  markdownToHTML,
  normalizeEmailAddress,
} from "./utils";

test("Convert Markdown to HTML", () => {
  expect(markdownToHTML("foo")).toBe("<p>foo</p>\n");
  expect(markdownToHTML("foo\nbar")).toBe("<p>foo<br>bar</p>\n");
});

test("E-mail address normalization", () => {
  expect(normalizeEmailAddress("foo@bar.cz")).toBe("foo@bar.cz");
  expect(normalizeEmailAddress("Foo@bar.cz")).toBe("foo@bar.cz");
  expect(normalizeEmailAddress(" Foo@bar.cz")).toBe("foo@bar.cz");
  expect(normalizeEmailAddress(" Foo@bar.cz ")).toBe("foo@bar.cz");
});

test("E-mail validation", () => {
  expect(looksLikeEmailAdress("foo@bar")).toBe(false);
  expect(looksLikeEmailAdress("foo")).toBe(false);
  expect(looksLikeEmailAdress("@bar")).toBe(false);
  expect(looksLikeEmailAdress("@foo@bar.cz")).toBe(false);
  expect(looksLikeEmailAdress("foo @bar.cz")).toBe(false);
  expect(looksLikeEmailAdress("@foo@bar.cz")).toBe(false);
  expect(looksLikeEmailAdress("foo@bar.")).toBe(false);
  expect(looksLikeEmailAdress("foo@bar.cz")).toBe(true);
});

test("Hash digest", () => {
  expect(hashDigest(["foo", "bar"], "baz")).toBe("f9f98a9044");
});
