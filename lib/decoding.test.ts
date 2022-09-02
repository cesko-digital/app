import { number } from "typescript-json-decoder";
import { decodeUrl, decodeValidItemsFromArray } from "./decoding";

test("Decode URL", () => {
  expect(() => decodeUrl("bagr")).toThrow();
  expect(() => decodeUrl("")).toThrow();
  expect(decodeUrl("app://deeplink")).toEqual("app://deeplink");
  expect(
    decodeUrl("https://cesko-digital.slack.com/archives/C01AENB1LPP")
  ).toEqual("https://cesko-digital.slack.com/archives/C01AENB1LPP");
  expect(decodeUrl("mailto:bagr@lopata.cz")).toEqual("mailto:bagr@lopata.cz");
});

test("Decode valid items from array", () => {
  const decoder = decodeValidItemsFromArray(number, "Test", () => {});
  expect(decoder(["foo", "bar", 42])).toEqual([42]);
});
