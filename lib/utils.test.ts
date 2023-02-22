import { markdownToHTML, normalizeEmailAddress } from "./utils";

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
