import { getMessagePermalink, MessageEvent } from "./slack/message";
import { insertNewMarketPlaceOffer } from "lib/airtable/market-place";

/** ID of the market-place channel to work in */
const marketPlaceSlackChannelId = "C03JP5VSC00";

/**
 * Handle new incoming Slack message
 *
 * If this is a new topic in the market-place channel, we want to insert
 * a new market-place offer to the database.
 */
export async function receiveSlackMessage(
  slackToken: string,
  msg: MessageEvent
) {
  if (
    msg.channel === marketPlaceSlackChannelId &&
    isRegularNewThreadMessage(msg) &&
    msg.ts
  ) {
    const messageUrl = await getMessagePermalink(
      slackToken,
      msg.channel,
      msg.ts
    );
    await insertNewMarketPlaceOffer({
      state: "new",
      text: msg.text || "<no text in message>",
      owner: msg.user,
      slackThreadUrl: messageUrl,
    });
  }
}

/**
 * Does a message event represent a regular, new thread message to the channel?
 *
 * Returns `false` for channel join messages, thread replies, …
 * Note that this is just a heuristic for this particular use case.
 */
const isRegularNewThreadMessage = (msg: MessageEvent) =>
  msg.channel_type === "channel" && !msg.subtype && !msg.thread_ts;
