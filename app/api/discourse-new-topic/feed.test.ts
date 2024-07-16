import { buildSlackMessage } from "./route";

test("Build Slack message", () => {
  const msg = buildSlackMessage({
    topicId: 123,
    title: "Test topic",
    tags: ["azure", "cloud"],
    bodyMarkdown: "Post body",
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
          text: "#azure #cloud",
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

const _sample = {
  topic: {
    tags: ["nástroje"],
    tags_descriptions: {},
    id: 518,
    title: "Testing new topic webhook",
    fancy_title: "Testing new topic webhook",
    posts_count: 1,
    created_at: "2024-07-12T11:25:15.272Z",
    views: 0,
    reply_count: 0,
    like_count: 0,
    last_posted_at: "2024-07-12T11:25:15.321Z",
    visible: true,
    closed: false,
    archived: false,
    archetype: "regular",
    slug: "testing-new-topic-webhook",
    category_id: 3,
    word_count: 6,
    deleted_at: null,
    user_id: 1,
    featured_link: null,
    pinned_globally: false,
    pinned_at: null,
    pinned_until: null,
    unpinned: null,
    pinned: false,
    highest_post_number: 1,
    deleted_by: null,
    has_deleted: false,
    bookmarked: false,
    participant_count: 1,
    thumbnails: null,
    created_by: {
      id: 1,
      username: "zoul",
      name: "Tomáš Znamenáček",
      avatar_template: "/user_avatar/diskutuj.digital/zoul/{size}/461_2.png",
    },
    last_poster: {
      id: 1,
      username: "zoul",
      name: "Tomáš Znamenáček",
      avatar_template: "/user_avatar/diskutuj.digital/zoul/{size}/461_2.png",
    },
  },
};
