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

const reportNewTopic = async (topicId: number): Promise<void> => {
  const topic = await getTopic(topicId);
  const firstPost = await getPost(topic.post_stream.posts[0].id);
  const topicUrl = getTopicUrl(topic);

  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: topic.title,
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "plain_text",
          text: topic.tags.map((t) => "#" + t).join(" "),
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: firstPost.raw,
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

  await sendDirectMessageToChannel({
    token: DISKUTUJ_DIGITAL_SLACK_TOKEN,
    channel: "C070LKUBV8W",
    text: firstPost.raw!,
    blocks,
  });
};

const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));
