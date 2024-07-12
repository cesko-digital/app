import { validateForm, type ValidationResult } from "./form-state";

test("Validate correctly filled form", () => {
  const now = new Date();
  expect(
    validateForm(
      {
        name: "Aloisie Citronová",
        email: "aloisie@cesko.digital",
        emailAlreadyTaken: false,
        organizationName: "",
        profileUrl: "",
        occupation: "whatever",
        skills: { Marketing: { Copywriting: null } },
        availableInDistricts: "Praha, Brno",
        bio: "Ahoj, já jsem Aloisie a chci se zapojit do vašeho projektu.",
        privacyConsent: true,
        enablePublicProfile: true,
        gdprConsent: true,
        cocConsent: true,
        submissionState: { tag: "not_submitted_yet" },
      },
      now,
    ),
  ).toEqual<ValidationResult>({
    result: "success",
    validatedData: {
      name: "Aloisie Citronová",
      email: "aloisie@cesko.digital",
      skills: { Marketing: { Copywriting: null } },
      occupation: "whatever",
      availableInDistricts: "Praha, Brno",
      bio: "Ahoj, já jsem Aloisie a chci se zapojit do vašeho projektu.",
      organizationName: "",
      profileUrl: "",
      privacyFlags: ["enablePublicProfile"],
      gdprPolicyAcceptedAt: now.toISOString(),
      codeOfConductAcceptedAt: now.toISOString(),
    },
  });
});
