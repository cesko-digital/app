import {
  array,
  number,
  optional,
  record,
  string,
  type decodeType,
} from "typescript-json-decoder";

const baseUrl = "https://diskutuj.digital";

export const Categories = {
  general: 4,
  marketplace: 5,
};

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

export type TopicSummary = decodeType<typeof decodeTopicSummary>;
export const decodeTopicSummary = record({
  id: number,
  title: string,
  posters: array(decodePoster),
});

export type ForumSummary = decodeType<typeof decodeForumSummary>;
export const decodeForumSummary = record({
  users: array(decodeUser),
  topic_list: record({
    topics: array(decodeTopicSummary),
  }),
});

export type Post = decodeType<typeof decodePost>;
export const decodePost = record({
  id: number,
  cooked: string,
  raw: optional(string),
});

export type Topic = decodeType<typeof decodeTopic>;
export const decodeTopic = record({
  id: number,
  title: string,
  details: record({
    participants: array(decodeUser),
  }),
  post_stream: record({
    posts: array(decodePost),
  }),
});

//
// API calls
//

/** Get topics summary for whole Discourse instance or given category */
export async function getForumSummary({
  revalidate,
  categoryId,
}: {
  revalidate: number;
  categoryId?: number;
}): Promise<ForumSummary> {
  const url = categoryId
    ? `${baseUrl}/c/${categoryId}.json`
    : `${baseUrl}/latest.json`;
  return await fetch(url, { next: { revalidate } })
    .then((response) => response.json())
    .then(decodeForumSummary);
}

/** Get single topic */
export const getTopic = async (id: number) =>
  await fetch(`${baseUrl}/t/${id}.json`)
    .then((response) => response.json())
    .then(decodeTopic);

/** Get single post */
export const getPost = async (id: number) =>
  await fetch(`${baseUrl}/posts/${id}.json`)
    .then((response) => response.json())
    .then(decodePost);

//
// Convenience API
//

/** Single discussion topic with poster images and first post text */
export type Bubble = {
  id: number;
  title: string;
  rawFirstPost: string;
  posterAvatars: string[];
  topicUrl: string;
};

/** Get a convenience list of topics in given category */
export async function getBubbles({
  categoryId,
  revalidate = 300,
  avatarSize = 200,
  skipTopicIds = [],
  maxCount,
}: {
  categoryId: number;
  revalidate?: number;
  avatarSize?: number;
  skipTopicIds?: number[];
  maxCount: number;
}): Promise<Bubble[]> {
  const summary = await getForumSummary({ categoryId, revalidate });
  const userForId = (id: number) => summary.users.find((u) => u.id === id)!;
  const avatarForUser = (user: { user_id: number }) =>
    getUserAvatar(userForId(user.user_id), avatarSize);
  const topics = summary.topic_list.topics
    .filter((t) => !skipTopicIds.includes(t.id))
    .slice(0, maxCount);
  return await Promise.all(
    topics.map(async (topic) => ({
      id: topic.id,
      title: topic.title,
      posterAvatars: topic.posters.map(avatarForUser),
      rawFirstPost: (await getRawFirstPost(topic)) ?? "",
      topicUrl: getTopicUrl(topic),
    })),
  );
}

const getRawFirstPost = ({ id }: TopicSummary) =>
  getTopic(id)
    .then((response) => response.post_stream.posts[0].id)
    .then(getPost)
    .then((post) => post.raw);

const getTopicUrl = (topic: Pick<TopicSummary, "id">) =>
  `${baseUrl}/t/${topic.id}`;

const getUserAvatar = (user: Pick<User, "avatar_template">, size: number) =>
  baseUrl + "/" + user.avatar_template?.replace("{size}", size.toString());
