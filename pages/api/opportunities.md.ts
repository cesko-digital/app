import type { NextApiRequest, NextApiResponse } from "next";
import { siteData } from "lib/site-data";
import { renderOpportunitiesBySkill } from "lib/markdown-opportunities";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { projects, users } = siteData;
  const opportunities = siteData.opportunities.filter(
    (o) => o.status === "live"
  );
  const mdown = renderOpportunitiesBySkill(opportunities, projects, users);
  response.setHeader("Content-Type", "text/markdown; charset=UTF-8");
  response.status(200).send(mdown.source);
}
