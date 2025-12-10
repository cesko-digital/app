import assert from "node:assert";
import test from "node:test";

import { compareNames, decodeUserProfile } from "./user-profile";

test("Decode user with no skills", () => {
  assert.partialDeepStrictEqual(
    decodeUserProfile({
      id: "uisoh7Ei",
      name: "John Smith",
      email: "john@smith.name",
      slackId: ["slack-id"],
      state: "confirmed",
      createdAt: "2022-03-23T08:31:54.500Z",
      lastModifiedAt: "2022-03-23T08:31:54.500Z",
    }),
    {
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
    },
  );
});

test("Decode Slack Users relation", () => {
  assert.partialDeepStrictEqual(
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
    {
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
    },
  );
  assert.partialDeepStrictEqual(
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
    {
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
    },
  );
});

test("Compare names", () => {
  const equal = 0;
  const ordered = -1;
  const reversed = 1;
  assert.equal(compareNames("A", "A"), equal);
  assert.equal(compareNames("A (Company)", "A"), equal);
  assert.equal(compareNames("A ", "A"), equal);
  assert.equal(compareNames("A", "B"), ordered);
  assert.equal(compareNames("B", "A"), reversed);
  assert.equal(compareNames("A B", "A A"), reversed);
  assert.equal(compareNames("Č", "B"), reversed);
  assert.equal(compareNames("B", "C A"), reversed);
});
