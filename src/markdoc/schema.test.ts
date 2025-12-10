import assert from "node:assert";
import test from "node:test";

import { slugify } from "./schema";

test("Slugify", () => {
  assert.equal(slugify("foo"), "foo");
  assert.equal(slugify("foo bar"), "foo-bar");
  assert.equal(slugify("foo/bar"), "foo-bar");
  assert.equal(slugify("foo!?"), "foo");
  assert.equal(slugify("PŘÍŠERA"), "prisera");
  assert.equal(
    slugify("První krok k řešení = pilotní kurz Nezisk.Digital"),
    "prvni-krok-k-reseni-pilotni-kurz-nezisk-digital",
  );
});
