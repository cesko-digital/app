import { type NextRequest } from "next/server";

import { waitUntil } from "@vercel/functions";

import {
  decodeNewTopicCallback,
  getPost,
  getTopic,
  getTopicUrl,
} from "~/src/discourse";
import { sendDirectMessageToChannel } from "~/src/slack/message";

// How long to wait before fetching the new topic and sending the message.
// Since the poster may often edit the topic right after publishing it to
// fix mistakes, we give them some time to finish before reporting the topic.
// Note that the longest we can wait is given by Vercel, currently it’s
// about 5 minutes.
const fetchDelayInSeconds = 60 * 4;

const { DISKUTUJ_DIGITAL_SLACK_TOKEN = "" } = process.env;

export async function POST(request: NextRequest): Promise<Response> {
  const newTopicInfo = await request
    .json()
    .then(decodeNewTopicCallback)
    .catch((_) => null);

  if (!newTopicInfo) {
    return new Response("Failed to decode payload, but thanks anyway.", {
      status: 500,
    });
  }

  console.log(
    `New topic was created, #${newTopicInfo.topic.id}, will fetch it after a brief pause.`,
  );

  waitUntil(
    sleep(fetchDelayInSeconds).then(async () => {
      await reportNewTopic(newTopicInfo.topic.id);
    }),
  );

  return new Response("Thanks!", { status: 200 });
}

type NewTopicMetadata = {
  topicId: number;
  title: string;
  tags: string[];
  bodyMarkdown?: string;
};

export function buildSlackMessage(metadata: NewTopicMetadata) {
  const topicUrl = getTopicUrl({ id: metadata.topicId });
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: metadata.title,
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "plain_text",
          text: metadata.tags.map((t) => "#" + t).join(" "),
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: metadata.bodyMarkdown,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        // We need to disable link unfurling here, see documentation:
        // https://api.slack.com/reference/messaging/link-unfurling
        text: `👉 <${topicUrl}|${topicUrl.replace("https://", "")}>`,
      },
    },
  ];
}

const reportNewTopic = async (topicId: number): Promise<void> => {
  const topic = await getTopic(topicId);
  const firstPost = await getPost(topic.post_stream.posts[0].id);
  const message = buildSlackMessage({
    topicId: topic.id,
    title: topic.title,
    tags: topic.tags,
    bodyMarkdown: firstPost.raw,
  });
  await sendDirectMessageToChannel({
    token: DISKUTUJ_DIGITAL_SLACK_TOKEN,
    channel: "C070LKUBV8W", // #diskutuj-digital-feed
    text: firstPost.raw!,
    blocks: message,
  });
};

const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));
