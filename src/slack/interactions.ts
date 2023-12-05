import {
  array,
  literal,
  record,
  string,
  type decodeType,
} from "typescript-json-decoder";

/**
 * Simplified type of a response to user interaction
 *
 * When user responds to a BlockKit message, Slack sends us
 * a notification (HTTP POST) describing the interaction. In return
 * we may send this response that will be displayed to the user again.
 */
export type InteractionResponse = {
  text: string;
  response_type?: "ephemeral";
  replace_original?: boolean;
};

/** A single action taken by user in a BlockKit message */
export type BlockAction = decodeType<typeof decodeBlockAction>;
export const decodeBlockAction = record({
  type: string,
  block_id: string,
  action_id: string,
  value: string,
});

/** User that triggered block action response */
export const decodeBlockActionUser = record({
  id: string,
  username: string,
  name: string,
});

/** The structure used by Slack to deliver action responses */
export type BlockActionCallback = decodeType<typeof decodeBlockActionCallback>;
export const decodeBlockActionCallback = record({
  type: literal("block_actions"),
  user: decodeBlockActionUser,
  api_app_id: string,
  token: string,
  response_url: string,
  actions: array(decodeBlockAction),
});
