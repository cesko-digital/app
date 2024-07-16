import { buildSlackMessage } from "./discourse";

test("Build Slack message", () => {
  const msg = buildSlackMessage({
    topicId: 123,
    title: "Test topic",
    tags: ["azure", "cloud"],
    bodyMarkdown: "Post body",
    author: "Aloisie Citronová",
  });
  expect(msg).toEqual([
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Test topic",
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "plain_text",
          text: "Aloisie Citronová #azure #cloud",
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Post body",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `👉 <https://diskutuj.digital/t/123|diskutuj.digital/t/123>`,
      },
    },
  ]);
});
