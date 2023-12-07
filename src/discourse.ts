import {
  array,
  number,
  optional,
  record,
  string,
  type decodeType,
} from "typescript-json-decoder";

const baseUrl = "https://diskutuj.digital";

//
// Types and decoding
//

export type User = decodeType<typeof decodeUser>;
export const decodeUser = record({
  id: number,
  username: string,
  name: string,
  avatar_template: optional(string),
});

export type Poster = decodeType<typeof decodePoster>;
export const decodePoster = record({
  user_id: number,
});

export type Topic = decodeType<typeof decodeTopic>;
export const decodeTopic = record({
  id: number,
  title: string,
  posters: array(decodePoster),
});

export type LatestTopicsSummary = decodeType<typeof decodeLatestTopicsSummary>;
export const decodeLatestTopicsSummary = record({
  users: array(decodeUser),
  topic_list: record({
    topics: array(decodeTopic),
  }),
});

//
// API calls
//

export const getLatestTopicsSummary = async (revalidate = 300) =>
  await fetch(`${baseUrl}/latest.json`, { next: { revalidate } })
    .then((response) => response.json())
    .then(decodeLatestTopicsSummary);

//
// Helpers
//

export const getTopicUrl = (topic: Pick<Topic, "id">) =>
  `${baseUrl}/t/${topic.id}/last`;

export const getUserAvatar = (
  user: Pick<User, "avatar_template">,
  size: number,
) => baseUrl + "/" + user.avatar_template?.replace("{size}", size.toString());
