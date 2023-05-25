import { slugify } from "./schema";

test("Slugify", () => {
  expect(slugify("foo")).toBe("foo");
  expect(slugify("foo bar")).toBe("foo-bar");
  expect(slugify("foo/bar")).toBe("foo-bar");
  expect(slugify("PŘÍŠERA")).toBe("prisera");
  expect(slugify("První krok k řešení = pilotní kurz Nezisk.Digital")).toBe(
    "prvni-krok-k-reseni-pilotni-kurz-nezisk-digital"
  );
});
