import {
  compareNames,
  decodeUserProfile,
  type UserProfile,
} from "./user-profile";

test("Decode user with no skills", () => {
  expect(
    decodeUserProfile({
      id: "uisoh7Ei",
      name: "John Smith",
      email: "john@smith.name",
      slackId: ["slack-id"],
      state: "confirmed",
      createdAt: "2022-03-23T08:31:54.500Z",
      lastModifiedAt: "2022-03-23T08:31:54.500Z",
    }),
  ).toEqual<UserProfile>({
    id: "uisoh7Ei",
    name: "John Smith",
    email: "john@smith.name",
    contactEmail: undefined,
    tags: "",
    occupation: undefined,
    organizationName: undefined,
    profileUrl: undefined,
    slackUserRelationId: undefined,
    slackId: "slack-id",
    state: "confirmed",
    profilePictureUrl: undefined,
    slackProfileUrl: undefined,
    featureFlags: [],
    notificationFlags: [],
    privacyFlags: [],
    roles: [],
    availableInDistricts: undefined,
    createdAt: "2022-03-23T08:31:54.500Z",
    gdprPolicyAcceptedAt: undefined,
    codeOfConductAcceptedAt: undefined,
  });
});

test("Decode Slack Users relation", () => {
  expect(
    decodeUserProfile({
      id: "uisoh7Ei",
      name: "John Smith",
      email: "john@smith.name",
      contactEmail: ["john2@smith.name"],
      slackUser: [],
      slackId: ["slack-id"],
      state: "confirmed",
      featureFlags: ["bagr"],
      notificationFlags: ["receiveNewRoleNotifications"],
      createdAt: "2022-03-23T08:31:54.500Z",
      lastModifiedAt: "2022-03-23T08:31:54.500Z",
    }),
  ).toEqual<UserProfile>({
    id: "uisoh7Ei",
    name: "John Smith",
    email: "john@smith.name",
    contactEmail: "john2@smith.name",
    tags: "",
    occupation: undefined,
    organizationName: undefined,
    profileUrl: undefined,
    slackUserRelationId: undefined,
    slackId: "slack-id",
    state: "confirmed",
    profilePictureUrl: undefined,
    slackProfileUrl: undefined,
    featureFlags: [],
    notificationFlags: ["receiveNewRoleNotifications"],
    privacyFlags: [],
    roles: [],
    availableInDistricts: undefined,
    createdAt: "2022-03-23T08:31:54.500Z",
    gdprPolicyAcceptedAt: undefined,
    codeOfConductAcceptedAt: undefined,
  });
  expect(
    decodeUserProfile({
      id: "uisoh7Ei",
      name: "John Smith",
      email: "john@smith.name",
      contactEmail: undefined,
      slackUser: ["someDatabaseId"],
      slackId: ["slack-id"],
      state: "confirmed",
      featureFlags: undefined,
      notificationFlags: undefined,
      createdAt: "2022-03-23T08:31:54.500Z",
      lastModifiedAt: "2022-03-23T08:31:54.500Z",
    }),
  ).toEqual<UserProfile>({
    id: "uisoh7Ei",
    name: "John Smith",
    email: "john@smith.name",
    contactEmail: undefined,
    tags: "",
    occupation: undefined,
    organizationName: undefined,
    profileUrl: undefined,
    slackUserRelationId: "someDatabaseId",
    slackId: "slack-id",
    state: "confirmed",
    profilePictureUrl: undefined,
    slackProfileUrl: undefined,
    featureFlags: [],
    notificationFlags: [],
    privacyFlags: [],
    roles: [],
    availableInDistricts: undefined,
    createdAt: "2022-03-23T08:31:54.500Z",
    gdprPolicyAcceptedAt: undefined,
    codeOfConductAcceptedAt: undefined,
  });
});

test("Compare names", () => {
  const equal = 0;
  const ordered = -1;
  const reversed = 1;
  expect(compareNames("A", "A")).toBe(equal);
  expect(compareNames("A (Company)", "A")).toBe(equal);
  expect(compareNames("A ", "A")).toBe(equal);
  expect(compareNames("A", "B")).toBe(ordered);
  expect(compareNames("B", "A")).toBe(reversed);
  expect(compareNames("A B", "A A")).toBe(reversed);
  expect(compareNames("Č", "B")).toBe(reversed);
  expect(compareNames("B", "C A")).toBe(reversed);
});
