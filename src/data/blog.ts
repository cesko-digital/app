import { decodeValidItemsFromArray, withDefault } from "src/decoding";
import {
  array,
  record,
  string,
  type decodeType,
} from "typescript-json-decoder";

/**
 * A blog posts from our blog
 *
 * We use this data to link to related blog posts for projects.
 */
export type BlogPost = decodeType<typeof decodeBlogPost>;
export const decodeBlogPost = record({
  url: string,
  title: string,
  description: string,
  cover: string,
  tags: withDefault(array(string), []),
});

export async function getBlogIndex(): Promise<BlogPost[]> {
  return await fetch("https://blog.cesko.digital/api/articles")
    .then((response) => response.json())
    .then(decodeValidItemsFromArray(decodeBlogPost, "Blog Posts"));
}
