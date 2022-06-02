import { FieldSet } from "airtable";
import { unwrapRecord, unwrapRecords, webBase } from "./request";
import {
  array,
  decodeType,
  record,
  string,
  union,
} from "typescript-json-decoder";

const marketPlaceTable = webBase<Schema>("Market Place");

/** The schema of the Market Place table in Airtable */
export interface Schema extends FieldSet {
  id: string;
  state: string;
  text: string;
}

/** A market-place offer */
export type MarketPlaceOffer = decodeType<typeof decodeMarketPlaceOffer>;
export const decodeMarketPlaceOffer = record({
  id: string,
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
  offer: Pick<MarketPlaceOffer, "state" | "text">
): Promise<MarketPlaceOffer> {
  const { state, text } = offer;
  return await marketPlaceTable
    .create({ state, text })
    .then(unwrapRecord)
    .then(decodeMarketPlaceOffer);
}
