import type { NextApiRequest, NextApiResponse } from "next";
import { dataSource } from "lib/data-source";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const partners = await dataSource.getAllPartners();
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(partners, null, 2));
}
