import { decodeProject } from "./project";

test("Decode project", () => {
  expect(
    decodeProject({
      ID: "rec4KOruzwIFU8ieR",
      slug: "loono",
      name: "Loono – průvodce prevencí",
      tags: ["recVa4LnmzmtfoYTg"],
      tagline:
        "Platforma poskytující veškeré informace o prevenci přehledně a na jednom místě",
      logoUrl: "https://data.cesko.digital/web/projects/loono/logo-loono.jpg",
      coverImageUrl:
        "https://data.cesko.digital/web/projects/loono/cover-loono.jpg",
      description: "Vytvoříme místo!",
      coordinators: [
        "recd8xvbWp7K1nZn8",
        "recwOLHFJUPCoPnLX",
        "rec0ABdJtGIK9AeCB",
      ],
      serializedLinks: "[]",
    }),
  ).toEqual({
    id: "rec4KOruzwIFU8ieR",
    name: "Loono – průvodce prevencí",
    slug: "loono",
    tagline:
      "Platforma poskytující veškeré informace o prevenci přehledně a na jednom místě",
    description: { source: "Vytvoříme místo!" },
    coverImageUrl:
      "https://data.cesko.digital/web/projects/loono/cover-loono.jpg",
    logoUrl: "https://data.cesko.digital/web/projects/loono/logo-loono.jpg",
    highlighted: false,
    state: "draft",
    tagIds: ["recVa4LnmzmtfoYTg"],
    teamEngagementIds: [],
    links: [],
  });
});
