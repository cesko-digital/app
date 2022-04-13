/** A paging helper to get all pages from a paged Slack API call */
export async function getAllPages<Value, Response>(
  getPage: (cursor: string) => Promise<Response>,
  extractItems: (response: Response) => Value[],
  nextPage: (response: Response) => string | undefined
): Promise<Value[]> {
  var items: Value[] = [];
  var cursor = "";
  var page = 1;

  do {
    const response = await getPage(cursor);
    items.push(...extractItems(response));
    cursor = nextPage(response) ?? "";
    page++;
  } while (cursor != "");

  return items;
}
