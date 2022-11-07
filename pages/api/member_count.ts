import { NextApiRequest, NextApiResponse } from "next";
import { addPerformanceLogging } from "lib/apm";
import { getMemberCount } from "lib/airtable/user-profile";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const count = await getMemberCount();
  const oneHour = 60 * 60;
  const oneWeek = oneHour * 24 * 7;
  response.setHeader("Content-Type", "application/json");
  response.setHeader(
    "Cache-Control",
    `s-maxage=${oneWeek}, stale-while-revalidate`
  );
  response.status(200).send({
    timestamp: new Date(),
    count,
  });
}

export default addPerformanceLogging(handler);
