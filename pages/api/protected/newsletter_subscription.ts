import { addPerformanceLogging } from "lib/apm";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { decodeType, record } from "typescript-json-decoder";
import {
  decodeSubscriptionState,
  getSubscriber,
  newsletterListId,
  subscribeToList,
  unsubscribeFromList,
} from "lib/ecomail";

/** Simplified subscription type to change Ecomail subscription state */
type Subscription = decodeType<typeof decodeNewsletterSubscription>;

/** Decode `Subscription` from JSON */
const decodeNewsletterSubscription = record({
  state: decodeSubscriptionState,
});

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const token = await getToken({ req: request });
  if (!token) {
    response.status(401).send("Auth token missing");
    return;
  }

  const { method } = request;

  const apiKey = process.env.ECOMAIL_API_KEY || "";
  const email = token.email!;

  try {
    switch (method) {
      case "GET":
        const subscriber = await getSubscriber(apiKey, email);
        const previousSub = subscriber.lists.find(
          (list) => list.listId === newsletterListId
        );
        const subscription: Subscription = {
          state: previousSub?.state || "unsubscribed",
        };
        response.setHeader("Content-Type", "application/json");
        response.status(200).send(JSON.stringify(subscription, null, 2));
        break;
      case "POST":
        const newSub = decodeNewsletterSubscription(request.body);
        switch (newSub.state) {
          case "subscribed":
            await subscribeToList(apiKey, email, newsletterListId);
            response.status(204).end();
            break;
          case "unsubscribed":
            await unsubscribeFromList(apiKey, email, newsletterListId);
            response.status(204).end();
            break;
          default:
            response
              .status(400)
              .send(`Unsupported subscription state for POST: ${newSub.state}`);
        }
        break;
      default:
        response.setHeader("Allow", ["GET", "POST"]);
        response.status(405).end(`Method ${method} not allowed`);
    }
  } catch (e) {
    console.error(e);
    response.status(500).send("Internal error, sorry!");
  }
}

export default addPerformanceLogging(handler);
