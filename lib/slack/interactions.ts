import {
  array,
  decodeType,
  literal,
  record,
  string,
} from "typescript-json-decoder";

export type InteractionResponse = {
  text: string;
  response_type?: "ephemeral";
  replace_original?: boolean;
};

export type BlockAction = decodeType<typeof decodeBlockAction>;
export const decodeBlockAction = record({
  type: string,
  block_id: string,
  action_id: string,
  value: string,
});

export type BlockActionCallback = decodeType<typeof decodeBlockActionCallback>;
export const decodeBlockActionCallback = record({
  type: literal("block_actions"),
  api_app_id: string,
  token: string,
  response_url: string,
  actions: array(decodeBlockAction),
});
