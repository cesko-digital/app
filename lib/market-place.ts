import { getMessagePermalink, MessageEvent } from "./slack/message";
import slack from "slack";
import { Block } from "./slack/blocks";
import { BlockActionCallback, InteractionResponse } from "./slack/interactions";
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

//
// Creating New Offers
//

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

/**
 * Does a message event represent a regular, new thread message to the channel?
 *
 * Returns `false` for channel join messages, thread replies, …
 * Note that this is just a heuristic for this particular use case.
 */
const isRegularNewThreadMessage = (msg: MessageEvent) =>
  msg.channel_type === "channel" && !msg.subtype && !msg.thread_ts;

//
// Offer Expirations
//

/** After what time should be offers automatically marked as expired? */
const expirationTimeInSeconds = 30 * secondsPerDay; // 30 days

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
): number {
  const createdAt = new Date(offer.createdAt);
  return (now.getTime() - createdAt.getTime()) / 1000; // getTime() is in ms
}

//
// Offer Follow-Ups
//

/** How many days after the offer was published should we post the followup question? */
const followupTimeInDays = 7;

/**
 * Slack action ID for the followup question
 *
 * This is used to recognize the asynchronous responses to the question delivered by Slack.
 */
const followupBlockId = "marketPlaceFollowUp";

export async function triggerFollowupQuestions(slackToken: string) {
  const offers = await getAllMarketPlaceOffers();
  for (const offer of offers.filter((o) => o.state === "published")) {
    const publishTimeInSeconds = secondsSinceOfferWasPublished(offer);
    if (!publishTimeInSeconds) {
      console.warn(
        `Published offer ${offer.id} is missing publish date (?), skipping.`
      );
      continue;
    }
    const publishTimeInDays = Math.floor(publishTimeInSeconds / secondsPerDay);
    // Is this the n-th day since publishing? If yes, post the followup question.
    if (publishTimeInDays > 0 && publishTimeInDays % followupTimeInDays === 0) {
      // The replies are handled asynchronously through the `/api/slack_events/interaction` handler
      await slack.chat.postMessage({
        token: slackToken,
        channel: marketPlaceSlackChannelId,
        thread_ts: offer.originalMessageTimestamp,
        // “If attachments or blocks are included, text will be used as fallback text for notifications only.”
        text: "Ahoj, jak jsme na tom? Podařilo se poptávku obsadit, je ještě relevantní?",
        blocks: buildFollowupQuestionBlocks(offer.id),
      });
    }
  }
}

export async function handleFollowupResponse(response: BlockActionCallback) {
  // We are only expecting responses with one single action
  if (response.actions.length !== 1) {
    return;
  }
  const action = response.actions[0];
  // Ignore responses from other blocks
  if (action.block_id !== followupBlockId) {
    return;
  }
  const reply: InteractionResponse = {
    text: `Received action ${action.action_id} with offer id ${action.value}.`,
  };
  await fetch(response.response_url, {
    method: "POST",
    body: JSON.stringify(reply),
  });
}

export function secondsSinceOfferWasPublished(
  offer: Pick<MarketPlaceOffer, "publishedAt">,
  now = new Date()
): number | undefined {
  if (!offer.publishedAt) {
    return undefined;
  } else {
    const publishDate = new Date(offer.publishedAt);
    return (now.getTime() - publishDate.getTime()) / 1000; // getTime() is in ms
  }
}

function buildFollowupQuestionBlocks(offerId: string): Block[] {
  return [
    {
      type: "section",
      block_id: followupBlockId,
      text: {
        type: "plain_text",
        text: "Ahoj, jak jsme na tom? Podařilo se poptávku obsadit, je ještě relevantní?",
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          action_id: "success",
          text: {
            type: "plain_text",
            text: "Úspěšně obsazena",
          },
          style: "primary",
          value: offerId,
        },
        {
          type: "button",
          action_id: "keep",
          text: {
            type: "plain_text",
            text: "Nechme ještě viset",
          },
          value: offerId,
        },
        {
          type: "button",
          action_id: "delete",
          text: {
            type: "plain_text",
            text: "Už není relevantní",
          },
          style: "danger",
          value: offerId,
        },
      ],
    },
  ];
}
