import { Schema, Config } from "@markdoc/markdoc";

/**
 * A callout is a “box that stands out”, a part of a document we want to emphasize
 *
 * The expected output is something like `<div class="highlighted">Callout content</div>`.
 */
export const callout: Schema = {
  render: "Callout",
};

/**
 * Markdoc config for project descriptions
 *
 * The config defines our custom tags that we use in addition to standard
 * Markdown formatting.
 */
export const projectDescriptionConfig: Config = {
  tags: {
    callout,
  },
};
