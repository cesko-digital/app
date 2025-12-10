import assert from "node:assert";
import test from "node:test";

import { Route } from "~/src/routing";

test("Registration params", () => {
  assert.equal(Route.register(), "/join");
  assert.equal(
    Route.register({ email: "foo@bar.cz" }),
    "/join?email=foo%40bar.cz",
  );
  assert.equal(
    Route.register({ email: "foo@bar.cz", callbackUrl: undefined }),
    "/join?email=foo%40bar.cz",
  );
});
