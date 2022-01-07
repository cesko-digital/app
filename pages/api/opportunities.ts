import type { NextApiRequest, NextApiResponse } from "next";
import { appState } from "lib/app-state";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(appState.opportunities, null, 2));
}
