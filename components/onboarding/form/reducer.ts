import { Field } from "lib/skills";

export type Msg =
  | { action: "updateEmail"; value: string }
  | { action: "updateName"; value: string }
  | { action: "toggleSkill"; skillId: string }
  | { action: "submit" }
  | { action: "receiveResponse"; success: boolean };

export type SubmissionState = "fillingIn" | "submitting" | "success" | "error";

export type State = {
  skills: Field[];
  email: string;
  name: string;
  selectedSkillIds: string[];
  submissionState: SubmissionState;
};

export function createState(skills: Field[]): State {
  return {
    skills,
    email: "",
    name: "",
    selectedSkillIds: [],
    submissionState: "fillingIn",
  };
}

export function reduce(state: State, msg: Msg): State {
  switch (msg.action) {
    case "updateEmail":
      const email = msg.value;
      return { ...state, email };
    case "updateName":
      const name = msg.value;
      return { ...state, name };
    case "toggleSkill":
      const skillId = msg.skillId;
      const wasChecked = state.selectedSkillIds.includes(skillId);
      const selectedSkillIds = wasChecked
        ? state.selectedSkillIds.filter((skill) => skill !== skillId)
        : [...state.selectedSkillIds, skillId];
      return { ...state, selectedSkillIds };
    case "submit":
      return { ...state, submissionState: "submitting" };
    case "receiveResponse":
      return {
        ...state,
        submissionState: msg.success ? "success" : "error",
      };
  }
}

const mailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export const isValidName = (name: string) => !!name.trim();
export const isValidEmail = (email: string) => mailRegex.test(email);

export const areSkillsValid = (state: State) => {
  const specialSkillIds = state.skills
    .map((skill) => [skill.mentorSkillId, skill.seniorSkillId])
    .flat()
    .filter(notEmpty);
  const selectedRegularSkills = state.selectedSkillIds.filter(
    (id) => !specialSkillIds.includes(id)
  );
  return selectedRegularSkills.length >= 1;
};

export const canSubmitForm = (state: State) =>
  (state.submissionState === "fillingIn" ||
    state.submissionState === "error") &&
  isValidName(state.name) &&
  isValidEmail(state.email) &&
  areSkillsValid(state);

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
