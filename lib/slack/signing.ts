import { createHmac, timingSafeEqual } from "crypto";
import { SlackUser } from "./user";

/** Header that stores Slack request timestamp */
export const timestampHeader = "x-slack-request-timestamp";

/** Header that stores Slack request signature */
export const signatureHeader = "x-slack-signature";

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

export type ValidationResult =
  | "ok"
  | "signature_mismatch"
  | "timestamp_expired"
  | "wrong_team";

/** A helper function to validate an incoming `team_join` Slack event */
export function validateTeamJoinEvent(args: {
  timestamp?: string;
  expectedSignature?: string;
  signingSecret?: string;
  profile: Pick<SlackUser, "team_id">;
  messageBody: string;
  now?: Date;
}): ValidationResult {
  const {
    timestamp,
    expectedSignature,
    signingSecret,
    profile,
    messageBody,
    now = new Date(),
  } = args;

  // Required params missing
  if (!timestamp || !expectedSignature || !signingSecret) {
    return "signature_mismatch";
  }

  // Timestamp old or invalid
  const time = Math.floor(now.getTime() / 1000);
  const numericTimestamp = parseInt(timestamp, 10);
  if (isNaN(numericTimestamp)) {
    return "timestamp_expired";
  }
  if (Math.abs(time - numericTimestamp) > 5 * 60) {
    return "timestamp_expired";
  }

  // Wrong team
  if (profile.team_id !== "TG21XF887") {
    return "wrong_team";
  }

  // Signature does not match
  const computedSignature = getMessageSignature(
    timestamp,
    messageBody,
    signingSecret
  );
  if (expectedSignature !== computedSignature) {
    return "signature_mismatch";
  }

  return "ok";
}
