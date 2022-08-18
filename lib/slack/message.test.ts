import { decodeMessageEvent } from "./message";

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
    thread_ts: undefined,
    ts: "1654170771.468289",
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
    subtype: undefined,
    channel: "C03JP5VSC00",
    user: "UJJ3MNA91",
    text: "Bagr",
    channel_type: "channel",
    thread_ts: undefined,
    ts: "1654170796.530449",
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
    subtype: undefined,
    channel: "C03JP5VSC00",
    user: "UJJ3MNA91",
    text: "Lopata",
    channel_type: "channel",
    thread_ts: "1654170796.530449",
    ts: "1654170815.647619",
  });
});

test("Decode message change message", () => {
  const payload = {
    type: "message",
    subtype: "message_changed",
    message: {
      type: "message",
      subtype: "tombstone",
      text: "This message was deleted.",
      user: "USLACKBOT",
      hidden: true,
      ts: "1654170796.530449",
    },
    channel: "C03JP5VSC00",
    hidden: true,
    ts: "1654172531.001700",
    event_ts: "1654172531.001700",
    channel_type: "channel",
  };
  expect(decodeMessageEvent(payload)).toEqual({
    type: "message",
    subtype: "message_changed",
    channel: "C03JP5VSC00",
    channel_type: "channel",
    thread_ts: undefined,
    ts: "1654172531.001700",
    user: undefined,
    text: undefined,
  });
});
