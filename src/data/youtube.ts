import { decodeDictValues } from "src/decoding";
import {
  array,
  decodeType,
  literal,
  number,
  record,
  string,
} from "typescript-json-decoder";

//
// Decoders and Types
//

export const decodeYTResourceId = record({
  kind: literal("youtube#video"),
  videoId: string,
});

export const decodeYTThumbnail = record({
  url: string,
  width: number,
  height: number,
});

export const decodeYTSnippet = record({
  publishedAt: string,
  channelId: string,
  thumbnails: decodeDictValues(decodeYTThumbnail),
  title: string,
  description: string,
  resourceId: decodeYTResourceId,
});

export type YTPlaylistItem = decodeType<typeof decodeYTPlaylistItem>;
export const decodeYTPlaylistItem = record({
  kind: literal("youtube#playlistItem"),
  id: string,
  snippet: decodeYTSnippet,
});

export const decodeYTPlaylistResponse = record({
  kind: literal("youtube#playlistItemListResponse"),
  items: array(decodeYTPlaylistItem),
});

//
// API Calls
//

const apiBase = "https://www.googleapis.com/youtube/v3";

export async function getPlaylistItems(
  apiKey: string,
  playlistId: string,
): Promise<YTPlaylistItem[]> {
  const url = `${apiBase}/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=10`;
  return await fetch(url)
    .then((response) => response.json())
    .then(decodeYTPlaylistResponse)
    .then((response) => response.items);
}

//
// Utils
//

export const getVideoPermalink = (item: YTPlaylistItem) =>
  `https://youtu.be/${item.snippet.resourceId.videoId}`;

export async function getAllPlaylistVideos(
  playlistId: string,
  apiKey = process.env.YOUTUBE_API_KEY || "",
): Promise<YTPlaylistItem[]> {
  const isNotPrivateVideo = (v: YTPlaylistItem) =>
    v.snippet.title !== "Private video";
  return getPlaylistItems(apiKey, playlistId).then((videos) =>
    videos.filter(isNotPrivateVideo),
  );
}
