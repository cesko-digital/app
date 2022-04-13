import React, { useReducer } from "react";
import Input from "components/onboarding/form/input";
import { Button } from "components/buttons";
import Callout from "components/onboarding/callout";
import { Field } from "lib/airtable/skills";
import Strings from "../strings.json";
import * as Components from "components/onboarding/styles";
import * as S from "./styles";
import { Route } from "lib/utils";
import {
  areSkillsValid,
  canSubmitForm,
  createState,
  isValidEmail,
  isValidName,
  reduce,
} from "./reducer";

export interface RegistrationData {
  name: string;
  email: string;
  skills: string[];
}

export interface OnboardingFormProps {
  skills: readonly Field[];
  onSubmit: (data: RegistrationData) => Promise<boolean>;
}

const OnboardingForm: React.FC<OnboardingFormProps> = (props) => {
  const [state, updateState] = useReducer(reduce, createState(props.skills));
  const submitting = state.submissionState === "submitting";

  // TODO: Do we need to valide the form?
  const submitForm = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    updateState({ action: "submit" });
    const { name, email, selectedSkillIds } = state;
    const success = await props.onSubmit({
      name,
      email,
      skills: selectedSkillIds,
    });
    updateState({ action: "receiveResponse", success });

    // It would be better to have this side effect somewhere else
    if (success) {
      setTimeout(() => {
        document.location.href = Route.slackOnboarding;
      }, 8000);
    }
  };

  return (
    <S.Form onSubmit={submitForm}>
      <Components.H4>{Strings.form_heading}</Components.H4>
      <Input
        type="text"
        id="name"
        name="name"
        label={Strings.field_name}
        placeholder="celé jméno"
        onChange={(e) =>
          updateState({ action: "updateName", value: e.target.value })
        }
        isValid={isValidName(state.name)}
        maxLength={60}
        validationMessage={Strings.validation_name}
        disabled={submitting}
      />
      <Input
        type="email"
        id="email"
        name="email"
        label={Strings.field_email}
        placeholder="@"
        onChange={(e) =>
          updateState({ action: "updateEmail", value: e.target.value })
        }
        isValid={isValidEmail(state.email)}
        validationMessage={Strings.validation_email}
        disabled={submitting}
      />

      <Components.H4>{Strings.skills_heading}</Components.H4>
      <Components.Body>{Strings.skills_body}</Components.Body>
      <S.StyledSkillTree
        selected={state.selectedSkillIds}
        skills={props.skills}
        disabled={submitting}
        handleChange={(skillId) =>
          updateState({ action: "toggleSkill", skillId })
        }
      />

      {!areSkillsValid(state) && (
        <S.FormValidationError role="alert">
          {Strings.skills_none}
        </S.FormValidationError>
      )}

      {state.submissionState === "error" && (
        <Callout type="error">{Strings.form_submit_error}</Callout>
      )}
      {state.submissionState === "success" && (
        <Callout type="success">
          <TemplateStringWithLink template={Strings.form_submit_success} />
        </Callout>
      )}

      <S.Footer>
        <Button type="submit" disabled={!canSubmitForm(state)}>
          {Strings.form_submit}
        </Button>
      </S.Footer>
    </S.Form>
  );
};

const TemplateStringWithLink: React.FC<{ template: string }> = ({
  template,
}) => {
  const linkTemplates = template.match(/(\[([^\]]+)\])\(([^)]+)\)/g);
  if (linkTemplates === null) return <>template</>;
  // we only count that there will be one link
  const linkText = linkTemplates[0].match(/(\[([^\]]+)\])/);
  const linkUrl = linkTemplates[0].match(/(\(([^\)]+)\))/);
  if (linkText === null || linkUrl === null) return <>template</>;
  const partialStrings = template.split(linkTemplates[0]);
  return (
    <>
      {partialStrings[0]}
      <a href={linkUrl[0].replace(/[\(\)]/g, "")}>
        {linkText[0].replace(/[\[\]]/g, "")}
      </a>
      {partialStrings[1]}
    </>
  );
};

export default OnboardingForm;
