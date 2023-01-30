import { NextApiRequest, NextApiResponse } from "next";
import { renderOpportunitiesBySkill } from "lib/markdown-opportunities";
import { getDataSource } from "lib/site-data";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const dataSource = getDataSource();
  const projects = await dataSource.projects();
  const users = await dataSource.users();
  const opportunities = (await dataSource.opportunities())
    // Only show live
    .filter((o) => o.status === "live");
  const oneHour = 60 * 60;
  const mdown = renderOpportunitiesBySkill(opportunities, projects, users);
  response.setHeader(
    "Cache-Control",
    `max-age=${oneHour}, s-maxage=${oneHour}`
  );
  response.setHeader("Content-Type", "text/markdown; charset=UTF-8");
  response.status(200).send(mdown.source);
}

export default handler;
