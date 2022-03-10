import { MarkdownString, markdownToHTML } from "lib/utils";

interface Props {
  source: MarkdownString;
}

/** Render given Markdown string into HTML wrapped in a `div` */
const RenderMarkdown: React.FC<Props> = ({ source: mdown }) => {
  // TODO: Sanitize output HTML
  // TODO: Fix the element hierarchy to avoid <p> inside <p>
  const html = markdownToHTML(mdown.source);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default RenderMarkdown;
