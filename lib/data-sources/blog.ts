import { array, decodeType, record, string } from "typescript-json-decoder";
import { decodeValidItemsFromArray, withDefault } from "lib/decoding";

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
  return await fetch("https://blog.cesko.digital/api/articles")
    .then((response) => response.json())
    .then(decodeValidItemsFromArray(decodeArticle, "Blog Posts"));
}
