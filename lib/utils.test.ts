import { markdownToHTML } from "./utils";

test("Convert Markdown to HTML", () => {
  expect(markdownToHTML("foo")).toBe("<p>foo</p>\n");
  expect(markdownToHTML("foo\nbar")).toBe("<p>foo<br>bar</p>\n");
});
