#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

import { toHTML } from "slack-markdown";
import { getSlackUser } from "lib/slack/user";
import {
  getAllChannelMessages,
  getMessagePermalink,
  getMessageReplies,
  MessageEvent,
} from "lib/slack/message";

const { SLACK_SYNC_TOKEN = "" } = process.env;
const [_, __, CHANNEL_ID = "C0104T360QP"] = process.argv;

async function main() {
  const response = await getAllChannelMessages(SLACK_SYNC_TOKEN, CHANNEL_ID);
  const result = await Promise.all(
    response
      .reverse()
      .filter((msg) => !msg.subtype)
      .map(processTopLevelMessage)
  );
  console.log(JSON.stringify(result, null, 2));
}

async function processTopLevelMessage(msg: MessageEvent) {
  const channel = msg.channel || CHANNEL_ID;
  const permalink = await getMessagePermalink(
    SLACK_SYNC_TOKEN,
    channel,
    msg.ts || ""
  );
  const user = await getSlackUser(SLACK_SYNC_TOKEN, msg.user || "");
  const replies = await getMessageReplies(
    SLACK_SYNC_TOKEN,
    channel,
    msg.ts || ""
  );
  return {
    sourceText: msg.text,
    formattedText: map(msg.text, toHTML),
    userName: user.real_name || user.name,
    date: map(msg.ts, (ts) => new Date(+ts * 1000)),
    replies: replies.length,
    permalink,
  };
}

function map<T, U>(value: T | undefined, f: (_: T) => U): U | undefined {
  return value ? f(value) : undefined;
}

main().catch((error) => console.log(error));
