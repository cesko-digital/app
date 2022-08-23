import { getMessagePermalink, MessageEvent } from "./slack/message";
import {
  getAllMarketPlaceOffers,
  insertNewMarketPlaceOffer,
  MarketPlaceOffer,
  updateMarketPlaceOffer,
} from "lib/airtable/market-place";

/** ID of the market-place channel to work in */
const marketPlaceSlackChannelId = "C03JP5VSC00";

/** Number of seconds in a day */
const secondsPerDay = 60 * 60 * 24;

/** After what time should be offers automatically marked as expired? */
const expirationTimeInSeconds = 30 * secondsPerDay; // 30 days

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

/** Mark all old offers as expired */
export async function markExpiredOffers() {
  const canExpire = (offer: MarketPlaceOffer) =>
    offer.state === "new" ||
    offer.state === "needs-detail" ||
    offer.state === "published";
  const offers = await getAllMarketPlaceOffers();
  for (const offer of offers.filter(canExpire)) {
    const createdAt = new Date(offer.createdAt);
    const offerAge = new Date().getTime() - createdAt.getTime();
    if (offerAge >= expirationTimeInSeconds) {
      console.log(
        `Offer ${offer.id} age ${offerAge} is over expiration limit (${expirationTimeInSeconds}), marking expired.`
      );
      await updateMarketPlaceOffer(offer.id, { state: "expired" });
    } else {
      console.log(
        `Offer ${offer.id} age ${offerAge} is under expiration limit (${expirationTimeInSeconds}), skipping.`
      );
    }
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
