import { offerAgeInSeconds } from "./market-place";

test("Calculate offer age", () => {
  const offerDate = "2022-08-24T07:33:53.298Z";
  const now = new Date("2022-08-24T08:33:53.298Z"); // hour later
  const offer = { createdAt: offerDate };
  expect(offerAgeInSeconds(offer, now)).toBe(60 * 60);
});
