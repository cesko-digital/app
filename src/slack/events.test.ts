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
  expect(decodeEndpointHandshake(payload)).toEqual(payload);
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
  expect(decode(payload)).toEqual({
    token: "XXYYZZ",
    team_id: "TXXXXXXXX",
    api_app_id: "AXXXXXXXXX",
    type: "event_callback",
    event: {
      type: "team_join",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user: expect.anything(),
    },
  });
});
