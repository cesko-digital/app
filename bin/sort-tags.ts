#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import tags from "~/src/tags.json";

async function main() {
  const sorted = tags.sort((a, b) => a.name.localeCompare(b.name));
  console.log(JSON.stringify(sorted, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
