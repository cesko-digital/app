import { getMessagePermalink, MessageEvent } from "./slack/message";
import slack from "slack";
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
    msg.ts // we need the message timestamp to be able to reply to it later
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
      originalMessageTimestamp: msg.ts,
    });
  }
}

/** Mark all old offers as expired */
export async function markExpiredOffers(slackToken: string) {
  const canExpire = (offer: MarketPlaceOffer) =>
    offer.state === "new" ||
    offer.state === "needs-detail" ||
    offer.state === "published";
  const offers = await getAllMarketPlaceOffers();
  for (const offer of offers.filter(canExpire)) {
    const offerAge = offerAgeInSeconds(offer);
    if (offerAge >= expirationTimeInSeconds) {
      console.log(
        `Offer ${offer.id} age ${offerAge} is over expiration limit (${expirationTimeInSeconds}), marking expired.`
      );
      const days = Math.floor(offerAge / secondsPerDay);
      // Mark as expired in the database
      await updateMarketPlaceOffer(offer.id, { state: "expired" });
      // Notify interested parties in the original thread
      await slack.chat.postMessage({
        channel: marketPlaceSlackChannelId,
        token: slackToken,
        thread_ts: offer.originalMessageTimestamp,
        text: `Ahoj! Už uplynulo ${days} dní od vzniku poptávky, tak ji automaticky zavřu. Kdyby to byla chyba (jsem jenom robot 🙃), reklamujte; díky!`,
      });
      // Mark thread as expired with an emoji reaction
      await slack.reactions.add({
        channel: marketPlaceSlackChannelId,
        token: slackToken,
        timestamp: offer.originalMessageTimestamp,
        name: "package",
      });
    } else {
      console.log(
        `Offer ${offer.id} age ${offerAge} is under expiration limit (${expirationTimeInSeconds}), skipping.`
      );
    }
  }
}

/** Return offer age in seconds, from a reference date or from now */
export function offerAgeInSeconds(
  offer: Pick<MarketPlaceOffer, "createdAt">,
  now = new Date()
) {
  const createdAt = new Date(offer.createdAt);
  return (now.getTime() - createdAt.getTime()) / 1000; // getTime() is in ms
}

/**
 * Does a message event represent a regular, new thread message to the channel?
 *
 * Returns `false` for channel join messages, thread replies, …
 * Note that this is just a heuristic for this particular use case.
 */
const isRegularNewThreadMessage = (msg: MessageEvent) =>
  msg.channel_type === "channel" && !msg.subtype && !msg.thread_ts;
