import { sampleUserPayload } from "./user";
import {
  decodeEndpointHandshake,
  decodeEventCallback,
  decodeMessageEvent,
  decodeTeamJoinEvent,
} from "./events";

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
      user: expect.anything(),
    },
  });
});

test("Decode channel join message", () => {
  const payload = {
    type: "message",
    subtype: "channel_join",
    ts: "1654170771.468289",
    user: "U03HX745KM3",
    text: "<@U03HX745KM3> has joined the channel",
    inviter: "UJJ3MNA91",
    channel: "C03JP5VSC00",
    event_ts: "1654170771.468289",
    channel_type: "channel",
  };
  expect(decodeMessageEvent(payload)).toEqual({
    type: "message",
    subtype: "channel_join",
    channel: "C03JP5VSC00",
    user: "U03HX745KM3",
    text: "<@U03HX745KM3> has joined the channel",
    channel_type: "channel",
  });
});

test("Decode regular channel message", () => {
  const payload = {
    client_msg_id: "edf58825-7321-4ddd-bd41-d6cbaaea76ac",
    type: "message",
    text: "Bagr",
    user: "UJJ3MNA91",
    ts: "1654170796.530449",
    team: "TG21XF887",
    blocks: [],
    channel: "C03JP5VSC00",
    event_ts: "1654170796.530449",
    channel_type: "channel",
  };
  expect(decodeMessageEvent(payload)).toEqual({
    type: "message",
    channel: "C03JP5VSC00",
    user: "UJJ3MNA91",
    text: "Bagr",
    channel_type: "channel",
  });
});

test("Decode thread reply", () => {
  const payload = {
    client_msg_id: "8cd6f7dd-04f2-42e6-b244-9d5617eb5476",
    type: "message",
    text: "Lopata",
    user: "UJJ3MNA91",
    ts: "1654170815.647619",
    team: "TG21XF887",
    blocks: [],
    thread_ts: "1654170796.530449",
    parent_user_id: "UJJ3MNA91",
    channel: "C03JP5VSC00",
    event_ts: "1654170815.647619",
    channel_type: "channel",
  };
  expect(decodeMessageEvent(payload)).toEqual({
    type: "message",
    channel: "C03JP5VSC00",
    user: "UJJ3MNA91",
    text: "Lopata",
    channel_type: "channel",
    thread_ts: "1654170796.530449",
  });
});
