#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

/**
 * This is a template file for any TS scripts that you want to run directly from the command line.
 * You should use it as a starting point for your own scripts; just don't forget to delete this comment. (:
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const toJSON = (val: any) => JSON.stringify(val, null, 2);

async function main() {
  // Your code here
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
