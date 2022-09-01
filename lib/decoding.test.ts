import { number } from "typescript-json-decoder";
import { decodeUrl, decodeValidItemsFromArray } from "./decoding";
import { decodeEvent, decodeOpportunity } from "./portal-types";

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

test("Decode URL", () => {
  expect(() => decodeUrl("bagr")).toThrow();
  expect(() => decodeUrl("")).toThrow();
  expect(decodeUrl("app://deeplink")).toEqual("app://deeplink");
  expect(
    decodeUrl("https://cesko-digital.slack.com/archives/C01AENB1LPP")
  ).toEqual("https://cesko-digital.slack.com/archives/C01AENB1LPP");
  expect(decodeUrl("mailto:bagr@lopata.cz")).toEqual("mailto:bagr@lopata.cz");
});

test("Decode valid items from array", () => {
  const decoder = decodeValidItemsFromArray(number, "Test", () => {});
  expect(decoder(["foo", "bar", 42])).toEqual([42]);
});
