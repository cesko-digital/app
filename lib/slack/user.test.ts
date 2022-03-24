import { decodeSlackUser, samplePayload } from "./user";

test("Decode user", () => {
  expect(decodeSlackUser(samplePayload)).toEqual({
    id: "U038G4SGK9Q",
    team_id: "TG21XF887",
    name: "zoul_test",
    real_name: "Tomáš Znamenáček",
    is_bot: false,
    is_email_confirmed: true,
  });
});
