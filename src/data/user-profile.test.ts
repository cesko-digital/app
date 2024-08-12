import { defaultAvatarUrl } from "~/src/utils";

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
      competencies: undefined,
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
    skills: "",
    occupation: undefined,
    organizationName: undefined,
    profileUrl: undefined,
    slackUserRelationId: undefined,
    slackId: "slack-id",
    state: "confirmed",
    slackAvatarUrl: undefined,
    avatarUrl: defaultAvatarUrl,
    slackProfileUrl: undefined,
    featureFlags: [],
    notificationFlags: [],
    privacyFlags: [],
    availableInDistricts: undefined,
    createdAt: "2022-03-23T08:31:54.500Z",
    lastModifiedAt: "2022-03-23T08:31:54.500Z",
    gdprPolicyAcceptedAt: undefined,
    codeOfConductAcceptedAt: undefined,
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
    skills: "Dev / Go",
    occupation: undefined,
    organizationName: undefined,
    profileUrl: undefined,
    slackUserRelationId: undefined,
    slackId: "slack-id",
    state: "confirmed",
    slackAvatarUrl: undefined,
    avatarUrl: defaultAvatarUrl,
    slackProfileUrl: undefined,
    featureFlags: [],
    notificationFlags: ["receiveNewRoleNotifications"],
    privacyFlags: [],
    availableInDistricts: undefined,
    createdAt: "2022-03-23T08:31:54.500Z",
    lastModifiedAt: "2022-03-23T08:31:54.500Z",
    gdprPolicyAcceptedAt: undefined,
    codeOfConductAcceptedAt: undefined,
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
      notificationFlags: undefined,
      createdAt: "2022-03-23T08:31:54.500Z",
      lastModifiedAt: "2022-03-23T08:31:54.500Z",
    }),
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
    slackAvatarUrl: undefined,
    avatarUrl: defaultAvatarUrl,
    slackProfileUrl: undefined,
    featureFlags: [],
    notificationFlags: [],
    privacyFlags: [],
    availableInDistricts: undefined,
    createdAt: "2022-03-23T08:31:54.500Z",
    lastModifiedAt: "2022-03-23T08:31:54.500Z",
    gdprPolicyAcceptedAt: undefined,
    codeOfConductAcceptedAt: undefined,
    daysSinceRegistered: undefined,
  });
});

test("Compare names", () => {
  const equal = 0;
  const ordered = -1;
  const reversed = 1;
  expect(compareNames("A", "A")).toBe(equal);
  expect(compareNames("A", "B")).toBe(ordered);
  expect(compareNames("B", "A")).toBe(reversed);
  expect(compareNames("A B", "A A")).toBe(reversed);
  expect(compareNames("Č", "B")).toBe(reversed);
  expect(compareNames("B", "C A")).toBe(reversed);
});
