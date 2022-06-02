import { FieldSet } from "airtable";
import { unwrapRecord, unwrapRecords, webBase } from "./request";
import { decodeUserProfile, Schema as UserProfileSchema } from "./user-profile";
import { relationToOne, takeFirst } from "lib/decoding";
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
  state: string;
  text: string;
}

/** A market-place offer */
export type MarketPlaceOffer = decodeType<typeof decodeMarketPlaceOffer>;
export const decodeMarketPlaceOffer = record({
  id: string,
  owner: relationToOne,
  ownerName: string,
  ownerEmail: string,
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
    .select({ maxRecords: 1000 })
    .all()
    .then(unwrapRecords)
    .then(array(decodeMarketPlaceOffer));
}

/** Insert new market-place offer */
export async function insertNewMarketPlaceOffer(
  offer: Pick<MarketPlaceOffer, "state" | "text" | "owner">
): Promise<MarketPlaceOffer> {
  const { state, text, owner } = offer;

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
    .create({ state, text, owner: [ownerProfileId] })
    .then(unwrapRecord)
    .then(decodeMarketPlaceOffer);
}
