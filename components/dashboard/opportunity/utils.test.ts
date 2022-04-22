import { getContactButtonLabel } from "./utils";

test("Contact button label", () => {
  expect(getContactButtonLabel("mailto:foo@bar.cz")).toBe("Kontaktovat mailem");
  expect(
    getContactButtonLabel(
      "https://cesko-digital.slack.com/archives/C01AENB1LPP"
    )
  ).toBe("Kontaktovat přes Slack");
  expect(getContactButtonLabel("https://bagr.cz")).toBe("Kontaktovat");
});
