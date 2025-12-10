import assert from "node:assert";
import test from "node:test";

import {
  hashDigest,
  isValidIČO,
  looksLikeEmailAdress,
  normalizeEmailAddress,
  strip,
  subset,
} from "./utils";

test("E-mail address normalization", () => {
  assert.equal(normalizeEmailAddress("foo@bar.cz"), "foo@bar.cz");
  assert.equal(normalizeEmailAddress("Foo@bar.cz"), "foo@bar.cz");
  assert.equal(normalizeEmailAddress(" Foo@bar.cz"), "foo@bar.cz");
  assert.equal(normalizeEmailAddress(" Foo@bar.cz "), "foo@bar.cz");
});

test("E-mail validation", () => {
  assert.equal(looksLikeEmailAdress("foo@bar"), false);
  assert.equal(looksLikeEmailAdress("foo"), false);
  assert.equal(looksLikeEmailAdress("@bar"), false);
  assert.equal(looksLikeEmailAdress("@foo@bar.cz"), false);
  assert.equal(looksLikeEmailAdress("foo @bar.cz"), false);
  assert.equal(looksLikeEmailAdress("@foo@bar.cz"), false);
  assert.equal(looksLikeEmailAdress("foo@bar."), false);
  assert.equal(looksLikeEmailAdress("foo@bar.cz"), true);
});

test("Hash digest", () => {
  assert.equal(hashDigest(["foo", "bar"], "baz"), "f9f98a9044");
});

test("Subset object", () => {
  assert.deepStrictEqual(subset({ foo: 1, bar: 2 }, ["foo"]), { foo: 1 });
});

test("Whitespace strip", () => {
  const stripped = strip`Tady najdeš seznam konkrétních rolí nebo úkolů,
  se kterými potřebujeme pomoc v našich projektech. Bývají hodně
  různorodé – jednorázové, kratší i dlouhodobé, placené i dobrovolnické,
  více i méně kvalifikované.`;
  const singleline = `Tady najdeš seznam konkrétních rolí nebo úkolů, se kterými potřebujeme pomoc v našich projektech. Bývají hodně různorodé – jednorázové, kratší i dlouhodobé, placené i dobrovolnické, více i méně kvalifikované.`;
  assert.equal(stripped, singleline);
});

test("IČO check", () => {
  assert.equal(isValidIČO("08178607"), true);
  assert.equal(isValidIČO("08178606"), false);
});
