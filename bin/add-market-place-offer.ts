#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { WebClient } from "@slack/web-api";
import { array } from "typescript-json-decoder";

import { insertNewMarketPlaceOffer } from "~/src/data/market-place";
import { marketPlaceSlackChannelId } from "~/src/market-place";
import { decodeMessageEvent } from "~/src/slack/message";

/**
 * Insert a new market-place offer by hand
 */
async function main() {
  const { SLACK_BAZAAR_BOT_TOKEN = "" } = process.env;
  const slack = new WebClient(SLACK_BAZAAR_BOT_TOKEN);
  const messageUrl = process.argv[2];
  if (!messageUrl) {
    console.log(
      "Please supply a permalink to a message in the #market-place channel.",
    );
    process.exit();
  }
  const timestamp = messageUrl
    // trim the URL part
    .replace(/^.*\/p/, "")
    // add decimal separator
    .replace(/\d{6}$/, ".$&");
  const msg = await slack.conversations
    .history({
      channel: marketPlaceSlackChannelId,
      latest: timestamp,
      inclusive: true,
      limit: 1,
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .then((response) => response.messages)
    .then(array(decodeMessageEvent))
    .then((msgs) => msgs[0]);
  if (msg) {
    console.log("Message found, inserting to DB.");
    const record = await insertNewMarketPlaceOffer({
      state: "new",
      text: msg.text ?? "<no text in message>",
      owner: msg.user,
      slackThreadUrl: messageUrl,
      originalMessageTimestamp: timestamp,
    });
    console.log(`Successfully inserted record ${record.id}.`);
  } else {
    console.log("Message not found.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
