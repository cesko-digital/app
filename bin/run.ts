#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

const toJSON = (val: any) => JSON.stringify(val, null, 2);

async function main() {
  // Your code here
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
