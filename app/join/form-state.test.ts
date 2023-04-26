import { validateForm, ValidationResult } from "./form-state";

test("Validate correctly filled form", () => {
  const now = new Date();
  expect(
    validateForm(
      {
        name: "Aloisie Citronová",
        email: "aloisie@cesko.digital",
        organizationName: "",
        profileUrl: "",
        occupation: "whatever",
        skills: { Marketing: { Copywriting: null } },
        privacyConsent: true,
        gdprConsent: true,
        submissionState: { tag: "not_submitted_yet" },
      },
      now
    )
  ).toEqual<ValidationResult>({
    result: "success",
    validatedData: {
      name: "Aloisie Citronová",
      email: "aloisie@cesko.digital",
      skills: { Marketing: { Copywriting: null } },
      occupation: "whatever",
      organizationName: "",
      profileUrl: "",
      gdprPolicyAcceptedAt: now.toISOString(),
    },
  });
});
