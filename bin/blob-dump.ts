#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { createWriteStream, mkdirSync } from "fs";
import { Readable } from "stream";
import { finished } from "stream/promises";
import { type ReadableStream } from "stream/web";

import { list, type ListBlobResult } from "@vercel/blob";

async function fetchToFile(url: string, fileName: string) {
  const { body } = await fetch(url);
  if (body) {
    const fileStream = createWriteStream(fileName);
    await finished(Readable.fromWeb(body as ReadableStream).pipe(fileStream));
  }
}

/**
 * Dump default blob store contents to `blob`, useful for backups
 *
 * TBD: Once the blob store gets big it would be better to check
 * for local file existence first and only download new files?
 */
async function main() {
  let cursor;
  mkdirSync("blob");

  do {
    const response: ListBlobResult = await list({ cursor, limit: 1000 });

    for (const { url, pathname } of response.blobs) {
      console.log(`${url} -> ${pathname}`);
      await fetchToFile(url, `blob/${pathname}`);
    }

    cursor = response.cursor;
  } while (cursor);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
