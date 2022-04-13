import { decodeUserProfile, getUserProfile, UserProfile } from "./user-profile";

test("Encode request", () => {
  expect(getUserProfile("slack-id")).toEqual({
    method: "SELECT",
    params: {
      filterByFormula: `{slackId} = "slack-id"`,
      maxRecords: 1,
    },
    decodeResponse: expect.any(Function),
  });
});

test("Decode response", () => {
  const decoder = getUserProfile("slack-id").decodeResponse;
  expect(decoder([])).toBeUndefined();
  expect(
    decoder([
      {
        id: "uisoh7Ei",
        fields: {
          name: "John Smith",
          email: "john@smith.name",
          skills: ["foo", "bar"],
          slackId: "slack-id",
          state: "confirmed",
          createdAt: "2022-03-23T08:31:54.500Z",
          lastModifiedAt: "2022-03-23T08:31:54.500Z",
        },
      },
    ])
  ).toEqual<UserProfile>({
    id: "uisoh7Ei",
    name: "John Smith",
    email: "john@smith.name",
    skills: ["foo", "bar"],
    slackId: "slack-id",
    state: "confirmed",
    createdAt: "2022-03-23T08:31:54.500Z",
    lastModifiedAt: "2022-03-23T08:31:54.500Z",
  });
});

test("Decode user with no skills", () => {
  expect(
    decodeUserProfile({
      id: "uisoh7Ei",
      name: "John Smith",
      email: "john@smith.name",
      skills: undefined,
      slackId: "slack-id",
      state: "confirmed",
      createdAt: "2022-03-23T08:31:54.500Z",
      lastModifiedAt: "2022-03-23T08:31:54.500Z",
    })
  ).toEqual<UserProfile>({
    id: "uisoh7Ei",
    name: "John Smith",
    email: "john@smith.name",
    skills: [],
    slackId: "slack-id",
    state: "confirmed",
    createdAt: "2022-03-23T08:31:54.500Z",
    lastModifiedAt: "2022-03-23T08:31:54.500Z",
  });
});
