import assert from "node:assert";
import test from "node:test";

import { decodeYTSnippet } from "./youtube";

test("Decode snippet", () => {
  const payload = {
    publishedAt: "2022-08-19T15:24:34Z",
    channelId: "UCylOefq0Efb-A452MlTuejw",
    title: "Radek Šamšula, Piráti",
    description: "Popisek",
    thumbnails: {
      default: {
        url: "https://i.ytimg.com/vi/msDUzJvo6a0/default.jpg",
        width: 120,
        height: 90,
      },
      medium: {
        url: "https://i.ytimg.com/vi/msDUzJvo6a0/mqdefault.jpg",
        width: 320,
        height: 180,
      },
    },
    resourceId: {
      kind: "youtube#video",
      videoId: "msDUzJvo6a0",
    },
  };
  assert.deepStrictEqual(decodeYTSnippet(payload), {
    publishedAt: "2022-08-19T15:24:34Z",
    channelId: "UCylOefq0Efb-A452MlTuejw",
    title: "Radek Šamšula, Piráti",
    description: "Popisek",
    resourceId: {
      kind: "youtube#video",
      videoId: "msDUzJvo6a0",
    },
    thumbnails: [
      {
        url: "https://i.ytimg.com/vi/msDUzJvo6a0/default.jpg",
        width: 120,
        height: 90,
      },
      {
        url: "https://i.ytimg.com/vi/msDUzJvo6a0/mqdefault.jpg",
        width: 320,
        height: 180,
      },
    ],
  });
});
