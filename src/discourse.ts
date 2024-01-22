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

/** Get latest topics summary for whole Discourse instance or given category */
export async function getLatestTopicsSummary({
  revalidate = 300,
  categoryId,
}: {
  revalidate?: number;
  categoryId?: number;
}): Promise<LatestTopicsSummary> {
  const url = categoryId
    ? `${baseUrl}/c/${categoryId}.json`
    : `${baseUrl}/latest.json`;
  return await fetch(url, { next: { revalidate } })
    .then((response) => response.json())
    .then(decodeLatestTopicsSummary);
}

//
// Helpers
//

export const Categories = {
  general: 4,
  marketplace: 5,
};

export const getTopicUrl = (topic: Pick<Topic, "id">) =>
  `${baseUrl}/t/${topic.id}/last`;

export const getUserAvatar = (
  user: Pick<User, "avatar_template">,
  size: number,
) => baseUrl + "/" + user.avatar_template?.replace("{size}", size.toString());
