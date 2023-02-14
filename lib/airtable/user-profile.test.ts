import { decodeUserProfile, UserProfile } from "./user-profile";

test("Decode user with no skills", () => {
  expect(
    decodeUserProfile({
      id: "uisoh7Ei",
      name: "John Smith",
      email: "john@smith.name",
      competencies: undefined,
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
    skills: "",
    occupation: undefined,
    organizationName: undefined,
    profileUrl: undefined,
    slackUserRelationId: undefined,
    slackId: "slack-id",
    state: "confirmed",
    featureFlags: [],
    createdAt: "2022-03-23T08:31:54.500Z",
    lastModifiedAt: "2022-03-23T08:31:54.500Z",
    gdprPolicyAcceptedAt: undefined,
    daysSinceRegistered: undefined,
  });
});

test("Decode Slack Users relation", () => {
  expect(
    decodeUserProfile({
      id: "uisoh7Ei",
      name: "John Smith",
      email: "john@smith.name",
      contactEmail: ["john2@smith.name"],
      competencies: "Dev / Go",
      slackUser: [],
      slackId: ["slack-id"],
      state: "confirmed",
      featureFlags: ["notifications-beta", "bagr"],
      createdAt: "2022-03-23T08:31:54.500Z",
      lastModifiedAt: "2022-03-23T08:31:54.500Z",
    })
  ).toEqual<UserProfile>({
    id: "uisoh7Ei",
    name: "John Smith",
    email: "john@smith.name",
    contactEmail: "john2@smith.name",
    skills: "Dev / Go",
    occupation: undefined,
    organizationName: undefined,
    profileUrl: undefined,
    slackUserRelationId: undefined,
    slackId: "slack-id",
    state: "confirmed",
    featureFlags: ["notifications-beta"],
    createdAt: "2022-03-23T08:31:54.500Z",
    lastModifiedAt: "2022-03-23T08:31:54.500Z",
    gdprPolicyAcceptedAt: undefined,
    daysSinceRegistered: undefined,
  });
  expect(
    decodeUserProfile({
      id: "uisoh7Ei",
      name: "John Smith",
      email: "john@smith.name",
      contactEmail: undefined,
      competencies: "Dev / Go",
      slackUser: ["someDatabaseId"],
      slackId: ["slack-id"],
      state: "confirmed",
      featureFlags: undefined,
      createdAt: "2022-03-23T08:31:54.500Z",
      lastModifiedAt: "2022-03-23T08:31:54.500Z",
    })
  ).toEqual<UserProfile>({
    id: "uisoh7Ei",
    name: "John Smith",
    email: "john@smith.name",
    contactEmail: undefined,
    skills: "Dev / Go",
    occupation: undefined,
    organizationName: undefined,
    profileUrl: undefined,
    slackUserRelationId: "someDatabaseId",
    slackId: "slack-id",
    state: "confirmed",
    featureFlags: [],
    createdAt: "2022-03-23T08:31:54.500Z",
    lastModifiedAt: "2022-03-23T08:31:54.500Z",
    gdprPolicyAcceptedAt: undefined,
    daysSinceRegistered: undefined,
  });
});
