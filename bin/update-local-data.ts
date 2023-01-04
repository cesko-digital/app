#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

import fs from "fs";

/**
 * Updates sample data stored in `content/samples`. We go through the
 * public API intentially here to make it possible to update the data
 * without any API keys.
 */
async function updateLocalData() {
  const files = [
    "events",
    "opportunities",
    "projects",
    "users",
    "partners",
    "skills",
    "marketplaceoffers",
  ];
  for (const file of files) {
    const response = await fetch(`https://cesko.digital/api/${file}`);
    const data = await response.text();
    const path = `content/samples/${file}.json`;
    fs.writeFileSync(path, data, { encoding: "utf-8" });
    console.log(`Updated ${path}.`);
  }
}

updateLocalData().catch(console.error);
