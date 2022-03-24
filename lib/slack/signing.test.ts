import { getMessageSignature } from "./signing";

test("Request signing", () => {
  const secret = "8f742231b10e8888abcd99yyyzzz85a5";
  const body = "bagr";
  const timestamp = "1531420618";
  const hash = getMessageSignature(timestamp, body, secret);
  expect(hash).toBe(
    "v0=4ff8bbd13d4db644ac2e2e78f297ad5f08525161f6e5b64c9e3e349af8d60e69"
  );
});
