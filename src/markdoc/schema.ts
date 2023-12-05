import {
  Tag,
  type Config,
  type Node,
  type RenderableTreeNode,
  type Schema,
} from "@markdoc/markdoc";

/**
 * A callout is a “box that stands out”, a part of a document we want to emphasize
 *
 * The expected output is something like `<div class="highlighted">Callout content</div>`.
 */
export const callout: Schema = {
  render: "Callout",
};

/**
 * A custom image tag
 *
 * One big reason we need a custom image instead of the basic Markdown one is image
 * optimization – we need to have image dimensions to prevent layout shifts.
 */
export const image: Schema = {
  render: "CustomImage",
  selfClosing: true,
  attributes: {
    src: {
      type: String,
      required: true,
      errorLevel: "error",
    },
    alt: {
      type: String,
      required: true,
      errorLevel: "error",
    },
    width: {
      type: Number,
      required: true,
      errorLevel: "error",
    },
    height: {
      type: Number,
      required: true,
      errorLevel: "error",
    },
    link: {
      type: String,
    },
  },
};

/** Custom heading node that auto-generates heading IDs */
export const heading: Schema = {
  children: ["inline"],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const id = generateID(children, attributes);
    return new Tag("Heading", { ...attributes, id }, children);
  },
};

/**
 * Markdoc config for our custom Markdown variant
 *
 * The config defines our custom tags that we use in addition to standard
 * Markdown formatting.
 */
export const customMarkdownConfig: Config = {
  tags: {
    callout,
    image,
  },
  nodes: {
    heading,
  },
};

//
// Helpers
//

function generateID(
  children: RenderableTreeNode[],
  attributes: Record<string, unknown>,
) {
  const stringify = (node: RenderableTreeNode): string => {
    if (Tag.isTag(node)) {
      return node.children.map(stringify).join(" ");
    } else {
      return `${node}`;
    }
  };
  if (attributes.id && typeof attributes.id === "string") {
    return attributes.id;
  }
  const id = children.map(stringify).join(" ");
  return slugify(id);
}

export const slugify = (s: string) =>
  s
    .toLocaleLowerCase() // Lowercase
    .normalize("NFD") // Split accents into standalone characters, ě -> eˇ
    .replace(/[\u0300-\u036f]/g, "") // Remove accent characters
    .replace(/[^a-z0-9]+/g, "-") // Replace all except basic characters by hyphens
    .replace(/-*$/, ""); // Remove trailing hyphens
