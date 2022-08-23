import { FieldSet } from "airtable";
import { unwrapRecord, unwrapRecords, webBase } from "./request";
import { Schema as UserProfileSchema } from "./user-profile";
import { relationToZeroOrOne } from "lib/decoding";
import {
  array,
  decodeType,
  record,
  string,
  union,
} from "typescript-json-decoder";

const marketPlaceTable = webBase<Schema>("Market Place");
const userProfileTable = webBase<UserProfileSchema>("User Profiles");

/** The schema of the Market Place table in Airtable */
export interface Schema extends FieldSet {
  id: string;
  owner: ReadonlyArray<string>;
  slackThreadUrl: string;
  state: string;
  text: string;
}

/** A market-place offer */
export type MarketPlaceOffer = decodeType<typeof decodeMarketPlaceOffer>;
export const decodeMarketPlaceOffer = record({
  id: string,
  owner: relationToZeroOrOne,
  ownerName: relationToZeroOrOne,
  ownerEmail: relationToZeroOrOne,
  ownerAvatarUrl: relationToZeroOrOne,
  ownerSlackId: relationToZeroOrOne,
  slackThreadUrl: string,
  text: string,
  createdAt: string,
  lastModifiedAt: string,
  state: union(
    "new",
    "published",
    "needs-detail",
    "invalid",
    "expired",
    "cancelled",
    "completed"
  ),
});

//
// API Calls
//

/** Return all market-place offers */
export async function getAllMarketPlaceOffers(): Promise<MarketPlaceOffer[]> {
  return await marketPlaceTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(array(decodeMarketPlaceOffer));
}

/** Return all published market-place offers */
export async function getPublishedMarketPlaceOffers(): Promise<
  MarketPlaceOffer[]
> {
  return await marketPlaceTable
    .select({ view: "Published Offers", maxRecords: 1000 })
    .all()
    .then(unwrapRecords)
    .then(array(decodeMarketPlaceOffer));
}

/** Insert new market-place offer */
export async function insertNewMarketPlaceOffer(
  offer: Pick<MarketPlaceOffer, "state" | "text" | "owner" | "slackThreadUrl">
): Promise<MarketPlaceOffer> {
  const { state, text, owner, slackThreadUrl } = offer;

  // First find the matching owner profile in (synced) User Profiles
  const ownerProfileId = await userProfileTable
    .select({
      filterByFormula: `{slackId} = "${owner}"`,
      maxRecords: 1,
    })
    .all()
    .then((records) => records[0].id);

  // Then insert the new offer
  return await marketPlaceTable
    .create({ state, text, slackThreadUrl, owner: [ownerProfileId] })
    .then(unwrapRecord)
    .then(decodeMarketPlaceOffer);
}

/** Update existing market-place offer */
export async function updateMarketPlaceOffer(
  recordId: string,
  data: Partial<Pick<MarketPlaceOffer, "state">>
): Promise<MarketPlaceOffer> {
  return await marketPlaceTable
    .update(recordId, data)
    .then(unwrapRecord)
    .then(decodeMarketPlaceOffer);
}

//
// Helpers
//

/** Compare offers by time of creation, first created gets first */
export const compareOffersByTime = (a: MarketPlaceOffer, b: MarketPlaceOffer) =>
  Date.parse(a.createdAt) - Date.parse(b.createdAt);
