import {
  decodeSlackProfile,
  decodeSlackUser,
  sampleProfilePayload,
  sampleUserPayload,
} from "./user";

test("Decode user", () => {
  expect(decodeSlackUser(sampleUserPayload)).toEqual({
    id: "U038G4SGK9Q",
    team_id: "TG21XF887",
    name: "zoul_test",
    real_name: "Tomáš Znamenáček",
    is_bot: false,
    is_email_confirmed: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    profile: expect.anything(),
    deleted: false,
  });
});

test("Decode profile", () => {
  expect(decodeSlackProfile(sampleProfilePayload)).toEqual({
    real_name: "Tomáš Znamenáček",
    display_name: "Tomáš Znamenáček",
    image_512: "https://…512.png",
    email: undefined,
    fields: {
      Xf01F0M3N546: {
        alt: "",
        value: "zoul@cesko.digital",
      },
      XfNQG9GG77: {
        alt: "",
        value: "velmi aktivně (10+h/týdně)",
      },
      XfRZG8T8TU: {
        alt: "",
        value: "https://github.com/zoul",
      },
    },
  });
});
