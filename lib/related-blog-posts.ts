import fetch from "node-fetch";
import { array, decodeType, record, string } from "typescript-json-decoder";
import { withDefault } from "./decoding";
import { buildEnv } from "./build-env";

/**
 * A blog posts from our blog
 *
 * We use this data to link to related blog posts for projects.
 */
export type Article = decodeType<typeof decodeArticle>;

export const decodeArticle = record({
  url: string,
  title: string,
  description: string,
  cover: string,
  tags: withDefault(array(string), []),
});

export async function getArticleIndex(): Promise<Article[]> {
  const response = await fetch("https://blog.cesko.digital/api/articles");
  const articles: Article[] = [];

  const json = await response.json();
  if (!Array.isArray(json)) {
    throw "Invalid article index format";
  }

  json.forEach((item, index) => {
    try {
      articles.push(decodeArticle(item));
    } catch (e) {
      console.warn(
        buildEnv.verboseLog
          ? `Parse error for record #${index} in article index: ${e}`
          : `Parse error for record #${index} in article index, skipping (set VERBOSE_LOG to see more).`
      );
    }
  });

  console.log(`Successfully parsed ${articles.length} blog posts.`);
  return articles;
}
