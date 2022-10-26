import { NextApiRequest, NextApiResponse } from "next";
import { addPerformanceLogging } from "lib/apm";
import { getMemberCount } from "lib/airtable/user-profile";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const count = await getMemberCount();
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Cache-Control", "max-age=86400, s-maxage=86400");
  response.status(200).send({
    timestamp: new Date(),
    count,
  });
}

export default addPerformanceLogging(handler);
