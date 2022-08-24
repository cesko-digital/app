import { decodeBlockActionCallback } from "./interactions";

test("Decode interation callback", () => {
  const payload = {
    type: "block_actions",
    user: {
      id: "UJJ3MNA91",
      username: "tomas.znamenacek",
      name: "tomas.znamenacek",
      team_id: "TG21XF887",
    },
    api_app_id: "A02",
    token: "Shh_its_a_seekrit",
    container: {
      type: "message",
      text: "The contents of the original message where the action originated",
    },
    trigger_id: "12466734323.1395872398",
    team: {
      id: "TG21XF887",
      domain: "cesko-digital",
    },
    enterprise: null,
    is_enterprise_install: false,
    state: {
      values: {},
    },
    response_url: "https://www.postresponsestome.com/T123567/1509734234",
    actions: [
      {
        type: "button",
        block_id: "x++GR",
        action_id: "qpu7a",
        text: {
          type: "plain_text",
          text: "Úspěšně obsazena",
          emoji: true,
        },
        value: "click_me_123",
        style: "primary",
        action_ts: "1661330041.946989",
      },
    ],
  };
  expect(decodeBlockActionCallback(payload)).toEqual({
    type: "block_actions",
    api_app_id: "A02",
    token: "Shh_its_a_seekrit",
    response_url: "https://www.postresponsestome.com/T123567/1509734234",
    actions: [
      {
        type: "button",
        block_id: "x++GR",
        action_id: "qpu7a",
        value: "click_me_123",
      },
    ],
  });
});
