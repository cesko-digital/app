import assert from "node:assert";
import test from "node:test";

import {
  getMessageSignature,
  validateTeamJoinEvent,
  type ValidationResult,
} from "./signing";

test("Request signing", () => {
  const secret = "8f742231b10e8888abcd99yyyzzz85a5";
  const body = "bagr";
  const timestamp = "1531420618";
  const hash = getMessageSignature(timestamp, body, secret);
  assert.equal(
    hash,
    "v0=4ff8bbd13d4db644ac2e2e78f297ad5f08525161f6e5b64c9e3e349af8d60e69",
  );
});

test("Validate team_join event", () => {
  assert.equal(
    validateTeamJoinEvent({
      timestamp: "1531420618",
      signingSecret: "8f742231b10e8888abcd99yyyzzz85a5",
      messageBody: "bagr",
      profile: { team_id: "TG21XF887" },
      expectedSignature:
        "v0=4ff8bbd13d4db644ac2e2e78f297ad5f08525161f6e5b64c9e3e349af8d60e69",
      now: new Date(1531420618 * 1000),
    }),
    "ok",
  );
  assert.equal(
    validateTeamJoinEvent({
      timestamp: "1531420618",
      signingSecret: "8f742231b10e8888abcd99yyyzzz85a5",
      messageBody: "lopata",
      profile: { team_id: "TG21XF887" },
      expectedSignature:
        "v0=4ff8bbd13d4db644ac2e2e78f297ad5f08525161f6e5b64c9e3e349af8d60e69",
      now: new Date(1531420618 * 1000),
    }),
    "signature_mismatch",
  );
  assert.equal(
    validateTeamJoinEvent({
      timestamp: "1531420618",
      signingSecret: "8f742231b10e8888abcd99yyyzzz85a5",
      messageBody: "bagr",
      profile: { team_id: "TG21XF887" },
      expectedSignature:
        "v0=4ff8bbd13d4db644ac2e2e78f297ad5f08525161f6e5b64c9e3e349af8d60e69",
      now: new Date((1531420618 + 400) * 1000),
    }),
    "timestamp_expired",
  );
  assert.equal(
    validateTeamJoinEvent({
      timestamp: "bagr",
      signingSecret: "8f742231b10e8888abcd99yyyzzz85a5",
      messageBody: "bagr",
      profile: { team_id: "TG21XF887" },
      expectedSignature:
        "v0=4ff8bbd13d4db644ac2e2e78f297ad5f08525161f6e5b64c9e3e349af8d60e69",
      now: new Date(1531420618 * 1000),
    }),
    "timestamp_expired",
  );
});
