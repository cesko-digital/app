import { Route } from "~/src/routing";

test("Registration params", () => {
  expect(Route.register()).toBe("/join");
  expect(Route.register({ email: "foo@bar.cz" })).toBe(
    "/join?email=foo%40bar.cz",
  );
  expect(Route.register({ email: "foo@bar.cz", callbackUrl: undefined })).toBe(
    "/join?email=foo%40bar.cz",
  );
});
