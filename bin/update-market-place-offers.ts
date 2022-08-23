#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

import { markExpiredOffers } from "lib/market-place";

async function main() {
  await markExpiredOffers();
}

main().catch((e) => console.error(e));
