import { getDataSource } from "lib/site-data";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const offers = await getDataSource().marketPlaceOffers();
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(offers, null, 2));
}

export default handler;
