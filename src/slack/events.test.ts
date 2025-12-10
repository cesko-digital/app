import assert from "node:assert";
import test from "node:test";

import {
  decodeEndpointHandshake,
  decodeEventCallback,
  decodeTeamJoinEvent,
} from "./events";
import { sampleUserPayload } from "./user";

test("Decode initial handshake", () => {
  const payload = {
    token: "Jhj5dZrVaK7ZwHHjRyZWjbDl",
    challenge: "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
    type: "url_verification",
  };
  assert.deepStrictEqual(decodeEndpointHandshake(payload), payload);
});

test("Decode event callback", () => {
  const payload = {
    token: "XXYYZZ",
    team_id: "TXXXXXXXX",
    api_app_id: "AXXXXXXXXX",
    event: {
      type: "team_join",
      user: sampleUserPayload,
    },
    type: "event_callback",
    event_context: "EC12345",
    event_id: "Ev08MFMKH6",
    event_time: 1234567890,
  };
  const decode = decodeEventCallback(decodeTeamJoinEvent);
  assert.partialDeepStrictEqual(decode(payload), {
    token: "XXYYZZ",
    team_id: "TXXXXXXXX",
    api_app_id: "AXXXXXXXXX",
    type: "event_callback",
    event: {
      type: "team_join",
    },
  });
});
