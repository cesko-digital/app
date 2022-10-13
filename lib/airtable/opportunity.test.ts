import { decodeOpportunity } from "./opportunity";

test("Decode opportunity", () => {
  expect(
    decodeOpportunity({
      "ID": "reclKrwSllzgEWOnl",
      "Name": "Frontend developer - React (PWA)",
      "Project": ["recSci1ztMeeakzg2"],
      "Owner": ["rec0ABdJtGIK9AeCB"],
      "Status": "live",
      "Summary": "- Práce na **mobilní** _aplikaci_.",
      "Time Requirements": "3–5 hodin týdně",
      "Cover URL":
        "https://data.cesko.digital/web/projects/loono/cover-loono.jpg",
      "RSVP URL": "https://cesko-digital.slack.com/archives/C01AENB1LPP",
      "Junior Friendly": true,
      "Skills": ["Dev"],
      "Created Time": "2021-09-02T17:20:26.000Z",
    })
  ).toEqual({
    id: "reclKrwSllzgEWOnl",
    name: "Frontend developer - React (PWA)",
    slug: "reclKrwSllzgEWOnl",
    projectId: "recSci1ztMeeakzg2",
    summary: { source: "- Práce na **mobilní** _aplikaci_." },
    timeRequirements: "3–5 hodin týdně",
    ownerId: "rec0ABdJtGIK9AeCB",
    contactUrl: "https://cesko-digital.slack.com/archives/C01AENB1LPP",
    creationTime: "2021-09-02T17:20:26.000Z",
    coverImageUrl:
      "https://data.cesko.digital/web/projects/loono/cover-loono.jpg",
    skills: ["Dev"],
    juniorFriendly: true,
    status: "live",
  });
});
