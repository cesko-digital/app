import { decodePortalUser } from "./user";

describe("Decode portal user", () => {
  test("Decode valid payload", () => {
    expect(
      decodePortalUser({
        ID: "recA5nftMpxJmwpr4",
        email: "zoul@cesko.digital",
        profilePictureUrl:
          "https://data.cesko.digital/people/tomas-znamenacek.jpg",
        name: "Tomáš Znamenáček",
      })
    ).toEqual({
      id: "recA5nftMpxJmwpr4",
      name: "Tomáš Znamenáček",
      profilePictureUrl:
        "https://data.cesko.digital/people/tomas-znamenacek.jpg",
      email: "zoul@cesko.digital",
    });
  });
  test("Supply default profile picture", () => {
    expect(
      decodePortalUser({
        ID: "recA5nftMpxJmwpr4",
        email: "zoul@cesko.digital",
        name: "Tomáš Znamenáček",
      })
    ).toEqual({
      id: "recA5nftMpxJmwpr4",
      name: "Tomáš Znamenáček",
      profilePictureUrl:
        "https://data.cesko.digital/people/generic-profile.jpg",
      email: "zoul@cesko.digital",
    });
  });
});
