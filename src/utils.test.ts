import {
  hashDigest,
  isValidIČO,
  looksLikeEmailAdress,
  normalizeEmailAddress,
  strip,
  subset,
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

test("Subset object", () => {
  expect(subset({ foo: 1, bar: 2 }, ["foo"])).toEqual({ foo: 1 });
});

test("Whitespace strip", () => {
  const stripped = strip`Tady najdeš seznam konkrétních rolí nebo úkolů,
  se kterými potřebujeme pomoc v našich projektech. Bývají hodně
  různorodé – jednorázové, kratší i dlouhodobé, placené i dobrovolnické,
  více i méně kvalifikované.`;
  const singleline = `Tady najdeš seznam konkrétních rolí nebo úkolů, se kterými potřebujeme pomoc v našich projektech. Bývají hodně různorodé – jednorázové, kratší i dlouhodobé, placené i dobrovolnické, více i méně kvalifikované.`;
  expect(stripped).toBe(singleline);
});

test("IČO check", () => {
  expect(isValidIČO("08178607")).toBe(true);
  expect(isValidIČO("08178606")).toBe(false);
});
