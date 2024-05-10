import type { RichTextList } from "@slack/types";
import type { RichTextSection } from "@slack/types/dist/block-kit/block-elements";

/**
 * Simplified type for Slack’s BlockKit
 *
 * See https://api.slack.com/block-kit for details.
 */
export type Block = LayoutBlock;

//
// Layout Blocks
//

/** https://api.slack.com/reference/block-kit/blocks */
export type LayoutBlock = Section | Actions;

/** https://api.slack.com/reference/block-kit/blocks#section */
export type Section = {
  type: "section";
  text: TextBlock;
  block_id?: string;
};

/** https://api.slack.com/reference/block-kit/blocks#actions */
export type Actions = {
  type: "actions";
  elements: BlockElement[];
  block_id?: string;
};

//
// Block Elements
//

/** https://api.slack.com/reference/block-kit/block-elements */
export type BlockElement = TextBlock | ButtonBlock | Divider;

/** https://api.slack.com/reference/block-kit/composition-objects#text */
export type TextBlock = {
  type: "plain_text" | "mrkdwn";
  text: string;
  emoji?: boolean;
  verbatim?: boolean;
};

/** https://api.slack.com/reference/block-kit/block-elements#button */
export type ButtonBlock = {
  type: "button";
  text: TextBlock;
  /**
   * An identifier for this action. You can use this when you receive an interaction payload
   * to identify the source of the action. Should be unique among all other action_ids in the
   * containing block. Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * The value to send along with the interaction payload. Maximum length for this field is
   * 2000 characters.
   */
  value?: string;
  style?: "primary" | "danger";
};

export type Divider = {
  type: "divider";
};

export type TextElement = {
  text: string;
  style?: { bold?: boolean; italic?: boolean };
};

export function section(elements: TextElement[]): RichTextSection {
  return {
    type: "rich_text_section",
    elements: elements.map((elem) => ({ ...elem, type: "text" })),
  };
}

export function bullet(elements: TextElement[]): RichTextList {
  return {
    type: "rich_text_list",
    style: "bullet",
    indent: 0,
    border: 0,
    elements: [section(elements)],
  };
}

export const divider: Divider = {
  type: "divider",
};
