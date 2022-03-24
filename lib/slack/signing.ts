import { createHmac } from "crypto";

export const SlackHeader = {
  timestamp: "x-slack-request-timestamp",
  signature: "x-slack-signature",
};

export function getMessageSignature(
  timestamp: string,
  body: string,
  secret: string,
  version = "v0"
): string {
  const payload = [version, timestamp, body].join(":");
  const hash = createHmac("sha256", secret).update(payload).digest("hex");
  return `${version}=${hash}`;
}
