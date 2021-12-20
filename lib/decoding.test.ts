import {
  decodeEvent,
  decodeOpportunity,
  decodeProject,
  decodeUser,
} from "./portal-types";

test("Decode portal project", () => {
  expect(
    decodeProject({
      id: "rec4KOruzwIFU8ieR",
      csSlug: "loono",
      csName: "Loono – průvodce prevencí",
      tags: ["recVa4LnmzmtfoYTg"],
      csTagline:
        "Platforma poskytující veškeré informace o prevenci přehledně a na jednom místě",
      logoUrl: "https://data.cesko.digital/web/projects/loono/logo-loono.jpg",
      coverUrl: "https://data.cesko.digital/web/projects/loono/cover-loono.jpg",
      csDescription: "Vytvoříme místo!",
      csContributeText:
        "Děkujeme všem zapojeným dobrovolníkům i pracovníkům z expertních organizací.",
      url: "https://wiki.cesko.digital/pages/viewpage.action?pageId=1584556",
      slackChannelUrl: "https://cesko-digital.slack.com/archives/C01P6CK0DDY",
      coordinators: [
        "recd8xvbWp7K1nZn8",
        "recwOLHFJUPCoPnLX",
        "rec0ABdJtGIK9AeCB",
      ],
      slackChannelName: "inkub-loono_pruvodce_prevenci",
    })
  ).toEqual({
    id: "rec4KOruzwIFU8ieR",
    name: "Loono – průvodce prevencí",
    slug: "loono",
    tagline:
      "Platforma poskytující veškeré informace o prevenci přehledně a na jednom místě",
    description: { source: "Vytvoříme místo!" },
    url: "https://wiki.cesko.digital/pages/viewpage.action?pageId=1584556",
    contributeText: {
      source:
        "Děkujeme všem zapojeným dobrovolníkům i pracovníkům z expertních organizací.",
    },
    coverImageUrl:
      "https://data.cesko.digital/web/projects/loono/cover-loono.jpg",
    logoUrl: "https://data.cesko.digital/web/projects/loono/logo-loono.jpg",
    highlighted: false,
    finished: false,
    silent: false,
    draft: false,
    tagIds: ["recVa4LnmzmtfoYTg"],
    coordinatorIds: [
      "recd8xvbWp7K1nZn8",
      "recwOLHFJUPCoPnLX",
      "rec0ABdJtGIK9AeCB",
    ],
    slackChannelUrl: "https://cesko-digital.slack.com/archives/C01P6CK0DDY",
    slackChannelName: "inkub-loono_pruvodce_prevenci",
  });
});

test("Decode portal user", () => {
  expect(
    decodeUser({
      id: "recA5nftMpxJmwpr4",
      email: "zoul@cesko.digital",
      profilePictureUrl:
        "https://data.cesko.digital/people/tomas-znamenacek.jpg",
      name: "Tomáš Znamenáček",
    })
  ).toEqual({
    id: "recA5nftMpxJmwpr4",
    name: "Tomáš Znamenáček",
    profilePictureUrl: "https://data.cesko.digital/people/tomas-znamenacek.jpg",
    email: "zoul@cesko.digital",
  });
});

test("Decode portal event", () => {
  expect(
    decodeEvent({
      "id": "rec9ujcN8HSkE0hgh",
      "Live URL": "https://cesko.digital/show-and-tell",
      "End Time": "2021-06-24T18:00:00.000Z",
      "RSVP URL": "https://cesko.digital/rsvp",
      "RSVP Title": "Sleduj!",
      "Summary": "Živé vysílání bla bla bla…",
      "Description": "Bude to **pecka**!\n",
      "Attendees": ["recm4CtcAkbzsEbZq"],
      "Name": "Show & Tell #2",
      "Owner": ["rec9ujcN8HSkEdwehgh"],
      "Project": ["rec9ujcN8HSkdedwedd"],
      "Tags": ["foo", "bar"],
      "Slug": "show-and-tell-2",
      "Status": "draft",
      "Follow-Up URL": "https://cesko.digital/show-and-tell",
      "Competence Map": ["dev:100", "marketing:100"],
      "RSVP Deadline": "2021-06-24T17:00:00.000Z",
      "Start Time": "2021-06-24T17:00:00.000Z",
    })
  ).toEqual({
    id: "rec9ujcN8HSkE0hgh",
    name: "Show & Tell #2",
    summary: "Živé vysílání bla bla bla…",
    description: { source: "Bude to **pecka**!\n" },
    startTime: "2021-06-24T17:00:00.000Z",
    ownerId: "rec9ujcN8HSkEdwehgh",
    projectId: "rec9ujcN8HSkdedwedd",
    status: "draft",
    registrationUrl: "https://cesko.digital/rsvp",
    registrationTitle: "Sleduj!",
    slug: "show-and-tell-2",
    endTime: "2021-06-24T18:00:00.000Z",
    tagIds: ["foo", "bar"],
  });
});

test("Decode portal opportunity", () => {
  expect(
    decodeOpportunity({
      "id": "reclKrwSllzgEWOnl",
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
    coverImageUrl:
      "https://data.cesko.digital/web/projects/loono/cover-loono.jpg",
    skills: ["Dev"],
    juniorFriendly: true,
    status: "live",
  });
});
