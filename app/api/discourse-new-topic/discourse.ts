import { getTopicUrl } from "~/src/discourse";

type NewTopicMetadata = {
  topicId: number;
  title: string;
  tags: string[];
  author: string;
  bodyMarkdown?: string;
};

export function buildSlackMessage(metadata: NewTopicMetadata) {
  const topicUrl = getTopicUrl({ id: metadata.topicId });
  const byline = [metadata.author, ...metadata.tags.map((t) => "#" + t)];
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
          text: byline.join(" "),
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
