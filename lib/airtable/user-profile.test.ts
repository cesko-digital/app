import { decodeUserProfile, UserProfile } from "./user-profile";

test("Decode user with no skills", () => {
  expect(
    decodeUserProfile({
      id: "uisoh7Ei",
      name: "John Smith",
      email: "john@smith.name",
      skills: undefined,
      competencies: "Dev / Go",
      slackId: ["slack-id"],
      state: "confirmed",
      createdAt: "2022-03-23T08:31:54.500Z",
      lastModifiedAt: "2022-03-23T08:31:54.500Z",
    })
  ).toEqual<UserProfile>({
    id: "uisoh7Ei",
    name: "John Smith",
    email: "john@smith.name",
    contactEmail: undefined,
    skills: [],
    competencies: "Dev / Go",
    slackUserRelationId: undefined,
    slackId: "slack-id",
    state: "confirmed",
    createdAt: "2022-03-23T08:31:54.500Z",
    lastModifiedAt: "2022-03-23T08:31:54.500Z",
  });
});

test("Decode Slack Users relation", () => {
  expect(
    decodeUserProfile({
      id: "uisoh7Ei",
      name: "John Smith",
      email: "john@smith.name",
      contactEmail: ["john2@smith.name"],
      skills: ["foo", "bar"],
      competencies: "Dev / Go",
      slackUser: [],
      slackId: ["slack-id"],
      state: "confirmed",
      createdAt: "2022-03-23T08:31:54.500Z",
      lastModifiedAt: "2022-03-23T08:31:54.500Z",
    })
  ).toEqual<UserProfile>({
    id: "uisoh7Ei",
    name: "John Smith",
    email: "john@smith.name",
    contactEmail: "john2@smith.name",
    skills: ["foo", "bar"],
    competencies: "Dev / Go",
    slackUserRelationId: undefined,
    slackId: "slack-id",
    state: "confirmed",
    createdAt: "2022-03-23T08:31:54.500Z",
    lastModifiedAt: "2022-03-23T08:31:54.500Z",
  });
  expect(
    decodeUserProfile({
      id: "uisoh7Ei",
      name: "John Smith",
      email: "john@smith.name",
      contactEmail: undefined,
      skills: ["foo", "bar"],
      competencies: "Dev / Go",
      slackUser: ["someDatabaseId"],
      slackId: ["slack-id"],
      state: "confirmed",
      createdAt: "2022-03-23T08:31:54.500Z",
      lastModifiedAt: "2022-03-23T08:31:54.500Z",
    })
  ).toEqual<UserProfile>({
    id: "uisoh7Ei",
    name: "John Smith",
    email: "john@smith.name",
    contactEmail: undefined,
    skills: ["foo", "bar"],
    competencies: "Dev / Go",
    slackUserRelationId: "someDatabaseId",
    slackId: "slack-id",
    state: "confirmed",
    createdAt: "2022-03-23T08:31:54.500Z",
    lastModifiedAt: "2022-03-23T08:31:54.500Z",
  });
});
