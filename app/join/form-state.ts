import { SkillSelection } from "lib/skills";
import { looksLikeEmailAdress } from "lib/utils";

export type SubmissionState =
  | { tag: "not_submitted_yet" }
  | { tag: "submitting" }
  | { tag: "submitted_successfully" }
  | { tag: "submission_error"; msg: string };

export type RegistrationData = {
  name: string;
  email: string;
  skills: SkillSelection;
  occupation: string;
  organizationName?: string;
  gdprPolicyAcceptedAt: string;
  codeOfConductAcceptedAt: string;
  availableInDistricts: string;
  profileUrl?: string;
};

export type FormState = {
  name: string;
  email: string;
  occupation: string;
  organizationName: string;
  profileUrl: string;
  skills: SkillSelection;
  privacyConsent: boolean;
  availableInDistricts: string;
  gdprConsent: boolean;
  cocConsent: boolean;
  submissionState: SubmissionState;
};

export const emptyFormState: FormState = {
  name: "",
  email: "",
  organizationName: "",
  occupation: "",
  profileUrl: "",
  skills: {},
  availableInDistricts: "",
  privacyConsent: false,
  gdprConsent: false,
  cocConsent: false,
  submissionState: { tag: "not_submitted_yet" },
};

export type ValidationResult =
  | { result: "success"; validatedData: RegistrationData }
  | { result: "error"; msg: string };

export function validateForm(
  data: FormState,
  now = new Date()
): ValidationResult {
  const {
    name,
    email,
    skills,
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
  } else if (Object.entries(skills).length === 0) {
    return error("Je třeba vyplnit aspoň jednu dovednost.");
  } else if (!privacyConsent) {
    return error("Je třeba odsouhlasit podmínky zpracování osobních údajů.");
  } else if (!gdprConsent) {
    return error("Je třeba odsouhlasit směrnici GDPR.");
  } else if (!cocConsent) {
    return error("Je třeba odsouhlasit pravidla chování v komunitě.");
  } else if (!occupation) {
    return error("Vyber prosím, čemu se aktuálně věnuješ.");
  } else {
    const { organizationName, profileUrl, availableInDistricts } = data;
    const gdprPolicyAcceptedAt = now.toISOString();
    const codeOfConductAcceptedAt = now.toISOString();
    return {
      result: "success",
      validatedData: {
        name,
        email,
        skills,
        organizationName,
        availableInDistricts,
        occupation,
        profileUrl,
        gdprPolicyAcceptedAt,
        codeOfConductAcceptedAt,
      },
    };
  }
}
