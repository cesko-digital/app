import { createHmac } from "crypto";

/** Names of frequently used Slack headers */
export const SlackHeader = {
  /** Header that stores Slack request timestamp */
  timestamp: "x-slack-request-timestamp",
  /** Header that stores Slack request signature */
  signature: "x-slack-signature",
};

/**
 * Get HMAC signature for message from Slack
 *
 * This makes sure the message (such as event) was really sent by Slack.
 * See https://api.slack.com/authentication/verifying-requests-from-slack.
 */
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
