import {
  decodeSlackProfile,
  decodeSlackUser,
  sampleUserPayload,
  sampleProfilePayload,
} from "./user";

test("Decode user", () => {
  expect(decodeSlackUser(sampleUserPayload)).toEqual({
    id: "U038G4SGK9Q",
    team_id: "TG21XF887",
    name: "zoul_test",
    real_name: "Tomáš Znamenáček",
    is_bot: false,
    is_email_confirmed: true,
    profile: expect.anything(),
    deleted: false,
  });
});

test("Decode profile", () => {
  expect(decodeSlackProfile(sampleProfilePayload)).toEqual({
    real_name: "Tomáš Znamenáček",
    display_name: "Tomáš Znamenáček",
    email: undefined,
  });
});
