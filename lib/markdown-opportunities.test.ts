import { renderList, renderOpportunity } from "./markdown-opportunities";
import { MarkdownString } from "./utils";

describe("Render opportunities to Markdown", () => {
  test("Render single opportunity", () => {
    expect(
      renderOpportunity(
        {
          name: "Scrum Master",
          slug: "scrum-master",
        },
        {
          name: "Pohyb je řešení",
        },
        {
          name: "Anežka Müller",
          email: "anezka@cesko.digital",
        }
      )
    ).toEqual<MarkdownString>({
      source:
        "**[Scrum Master](https://cesko.digital/opportunities/scrum-master)** pro projekt Pohyb je řešení, kontaktní osoba [Anežka Müller](mailto:anezka@cesko.digital?subject=Scrum%20Master)",
    });
  });
  test("Render list", () => {
    expect(renderList(["foo", "bar"], (item) => ({ source: item }))).toEqual({
      source: "* foo\n* bar",
    });
  });
});
