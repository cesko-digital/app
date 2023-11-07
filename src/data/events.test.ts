import { decodeEvent, getEventDuration } from "./events";

test("Decode event", () => {
  expect(
    decodeEvent({
      "ID": "rec9ujcN8HSkE0hgh",
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
    published: false,
    registrationUrl: "https://cesko.digital/rsvp",
    registrationTitle: "Sleduj!",
    quickRegistrationMode: false,
    registeredUserSlackIds: [],
    registeredUsers: [],
    slug: "show-and-tell-2",
    endTime: "2021-06-24T18:00:00.000Z",
    tagIds: ["foo", "bar"],
  });
});

describe("Get event duration", () => {
  test("No result for same dates", () => {
    expect(
      getEventDuration({
        startTime: "2022-01-14T14:00:00.00Z",
        endTime: "2022-01-14T14:00:00.00Z",
      })
    ).toBe(null);
  });
  test("No result when end time is missing", () => {
    expect(
      getEventDuration({
        startTime: "2022-01-14T14:00:00.00Z",
        endTime: undefined,
      })
    ).toBe(null);
  });
  test("Shorter duration in minutes", () => {
    expect(
      getEventDuration({
        startTime: "2022-01-14T14:00:00.00Z",
        endTime: "2022-01-14T15:00:00.00Z",
      })
    ).toBe("60 minut");
  });
  test("Longer duration in hours", () => {
    expect(
      getEventDuration({
        startTime: "2022-01-14T14:00:00.00Z",
        endTime: "2022-01-14T17:00:00.00Z",
      })
    ).toBe("3 hodiny");
  });
  test("Longer duration in hours", () => {
    expect(
      getEventDuration({
        startTime: "2022-01-14T14:00:00.00Z",
        endTime: "2022-01-14T19:00:00.00Z",
      })
    ).toBe("5 hodin");
  });
});
