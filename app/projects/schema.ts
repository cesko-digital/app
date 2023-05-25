import {
  Schema,
  Config,
  Tag,
  Node,
  RenderableTreeNode,
} from "@markdoc/markdoc";

/**
 * A callout is a “box that stands out”, a part of a document we want to emphasize
 *
 * The expected output is something like `<div class="highlighted">Callout content</div>`.
 */
export const callout: Schema = {
  render: "Callout",
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
    return new Tag(
      `h${node.attributes["level"]}`,
      { ...attributes, id },
      children
    );
  },
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
  nodes: {
    heading,
  },
};

//
// Helpers
//

function generateID(
  children: RenderableTreeNode[],
  attributes: Record<string, any>
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
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
