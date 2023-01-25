#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

import { readFileSync } from "fs";
import { getAllOpportunities } from "lib/airtable/opportunity";
import { getPageBreakdown } from "lib/data-sources/plausible";

const toJSON = (val: any) => JSON.stringify(val, null, 2);

async function main() {
  const response = await getPageBreakdown();
  console.log(
    toJSON(response.filter((row) => row.page.startsWith("/opportunities/")))
  );
}

main().catch((error) => console.log(error));

export {};
