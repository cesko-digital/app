#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

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
