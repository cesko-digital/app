import {
  hashDigest,
  looksLikeEmailAdress,
  normalizeEmailAddress,
} from "./utils";

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
