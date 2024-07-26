import { type PrivacyFlags } from "~/src/data/user-profile";
import { looksLikeEmailAdress } from "~/src/utils";

export type SubmissionState =
  | { tag: "not_submitted_yet" }
  | { tag: "submitting" }
  | { tag: "submitted_successfully" }
  | { tag: "submission_error"; msg: string };

export type RegistrationData = {
  name: string;
  email: string;
  tags: string;
  occupation: string;
  organizationName?: string;
  privacyFlags: PrivacyFlags;
  gdprPolicyAcceptedAt: string;
  codeOfConductAcceptedAt: string;
  availableInDistricts: string;
  bio: string;
  profileUrl?: string;
};

export type FormState = {
  name: string;
  email: string;
  emailAlreadyTaken: boolean;
  occupation: string;
  organizationName: string;
  profileUrl: string;
  tags: string;
  privacyConsent: boolean;
  availableInDistricts: string;
  bio: string;
  enablePublicProfile: boolean;
  gdprConsent: boolean;
  cocConsent: boolean;
  submissionState: SubmissionState;
};

export const emptyFormState: FormState = {
  name: "",
  email: "",
  emailAlreadyTaken: false,
  organizationName: "",
  occupation: "",
  profileUrl: "",
  tags: "",
  availableInDistricts: "",
  bio: "",
  privacyConsent: false,
  enablePublicProfile: true,
  gdprConsent: false,
  cocConsent: false,
  submissionState: { tag: "not_submitted_yet" },
};

export type ValidationResult =
  | { result: "success"; validatedData: RegistrationData }
  | { result: "error"; msg: string };

export function validateForm(
  data: FormState,
  now = new Date(),
): ValidationResult {
  const {
    name,
    email,
    tags,
    privacyConsent,
    gdprConsent,
    cocConsent,
    occupation,
  } = data;
  const error = (msg: string) => ({ result: "error" as const, msg });
  if (!name) {
    return error("Je třeba vyplnit jméno.");
  } else if (!email) {
    return error("Je třeba vyplnit email.");
  } else if (!looksLikeEmailAdress(email)) {
    return error("V e-mailové adrese je nějaká chyba.");
  } else if (!privacyConsent) {
    return error("Je třeba odsouhlasit podmínky zpracování osobních údajů.");
  } else if (!gdprConsent) {
    return error("Je třeba odsouhlasit směrnici GDPR.");
  } else if (!cocConsent) {
    return error("Je třeba odsouhlasit pravidla chování v komunitě.");
  } else if (!occupation) {
    return error("Vyber prosím, čemu se aktuálně věnuješ.");
  } else {
    const {
      organizationName,
      profileUrl,
      availableInDistricts,
      bio,
      enablePublicProfile,
    } = data;
    const gdprPolicyAcceptedAt = now.toISOString();
    const codeOfConductAcceptedAt = now.toISOString();

    const privacyFlags: PrivacyFlags = [];
    if (enablePublicProfile) {
      privacyFlags.push("enablePublicProfile");
    }

    return {
      result: "success",
      validatedData: {
        name,
        email,
        tags,
        organizationName,
        availableInDistricts,
        bio,
        occupation,
        profileUrl,
        gdprPolicyAcceptedAt,
        codeOfConductAcceptedAt,
        privacyFlags,
      },
    };
  }
}
