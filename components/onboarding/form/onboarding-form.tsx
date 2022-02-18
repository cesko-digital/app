import React, { useContext, useState, useEffect, useRef } from "react";
import Input from "components/onboarding/form/input";
import { Button } from "components/buttons";
import Callout from "components/onboarding/callout";
import { FormStatus, FormContext } from "./";
import { Field } from "lib/skills";
import Strings from "../strings.json";
import * as Components from "components/onboarding/styles";
import * as S from "./styles";
import { Route } from "lib/routing";

export interface OnboardingFormProps {
  skills: Field[];
}

interface OnboardingFormState {
  name: string;
  email: string;
  selectedSkills: string[];
  validations: {
    [name: string]: boolean;
  };
}

const OnboardingForm = (props: OnboardingFormProps) => {
  const [state, setState] = useState<OnboardingFormState>({
    name: "",
    email: "",
    selectedSkills: [],
    validations: {
      name: true,
      email: true,
      skills: true,
    },
  });

  const usePrevious = (state: OnboardingFormState) => {
    const ref = useRef(state);
    useEffect(() => {
      (ref.current as unknown) = state;
    }, [state]);
    return ref.current as never;
  };

  const { status, setStatus } = useContext(FormContext);
  const previousState: OnboardingFormState = usePrevious(state);

  // validate skills after change
  useEffect(() => {
    const validateSkills = async () => await validateFieldSkills();
    if (previousState.selectedSkills.length !== state.selectedSkills.length) {
      validateSkills();
    }
  }, [state]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState((prev) => ({
      ...prev,
      name: value,
    }));
    validateName(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState((prev) => ({
      ...prev,
      email: value,
    }));
    validateEmail(value);
  };

  const handleSkillChange = async (id: string) => {
    const selected = state.selectedSkills.slice();
    const isSelected = selected.indexOf(id) !== -1;
    const args: [number, number, string?] = [
      isSelected ? selected.indexOf(id) : selected.length,
      isSelected ? 1 : 0,
    ];
    if (!isSelected) {
      args.push(id);
    }
    Array.prototype.splice.apply(selected, args);
    setState((prev) => ({
      ...prev,
      selectedSkills: selected,
    }));
  };

  const validateName = async (value: string) => {
    const validation = !!value.trim();
    setState((prev) => ({
      ...prev,
      validations: {
        ...prev.validations,
        name: validation,
      },
    }));
    return validation;
  };

  const validateEmail = async (value: string) => {
    const validation =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
        value.trim()
      );
    setState((prev) => ({
      ...prev,
      validations: {
        ...prev.validations,
        email: validation,
      },
    }));
    return validation;
  };

  const validateFieldSkills = async () => {
    const onlyFieldSkills = props.skills
      .map((field) => (field.skills ? field.skills.map((s) => s.id) : []))
      .flat();

    const fieldSkillsSelected = onlyFieldSkills.some(
      (id) => state.selectedSkills.indexOf(id) !== -1
    );

    setState((prev) => ({
      ...prev,
      validations: {
        ...prev.validations,
        skills: fieldSkillsSelected,
      },
    }));
    return fieldSkillsSelected;
  };

  const validateForm = async () => {
    const name = await validateName(state.name);
    const email = await validateEmail(state.email);
    const skills = await validateFieldSkills();
    return name && email && skills;
  };

  const sendFormData = async () => {
    setStatus(FormStatus.SUBMIT_PROGRESS);
    try {
      const payload = {
        name: state.name,
        email: state.email,
        skills: state.selectedSkills,
      };
      const response = await fetch("/api/registrations", {
        method: "post",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(
        response.ok ? FormStatus.SUBMIT_SUCCESS : FormStatus.SUBMIT_ERROR
      );
    } catch (e) {
      setStatus(FormStatus.SUBMIT_ERROR);
      throw e;
    }
  };

  const onFormSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    // run validations on submit
    if (!(await validateForm())) return;
    try {
      await sendFormData();
    } catch (e) {
      return;
    }
    // FIXME: Don’t redirect on error
    const redirect = setTimeout(() => {
      document.location.href = Route.slackOnboarding;
    }, 8000);
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

  const FormValidation = () =>
    !state.validations.skills ? (
      <S.FormValidationError role="alert">
        {Strings.skills_none}
      </S.FormValidationError>
    ) : null;

  return (
    <S.Form onSubmit={onFormSubmit}>
      <Components.H4>{Strings.form_heading}</Components.H4>
      <Input
        type="text"
        id="name"
        name="name"
        label={Strings.field_name}
        placeholder="celé jméno"
        onChange={handleNameChange}
        isValid={state.validations.name}
        maxLength={60}
        validationMessage={Strings.validation_name}
        disabled={status === FormStatus.SUBMIT_PROGRESS}
      />
      <Input
        type="email"
        id="email"
        name="email"
        label={Strings.field_email}
        placeholder="@"
        onChange={handleEmailChange}
        isValid={state.validations.email}
        validationMessage={Strings.validation_email}
        disabled={status === FormStatus.SUBMIT_PROGRESS}
      />
      <Components.H4>{Strings.skills_heading}</Components.H4>
      <Components.Body>{Strings.skills_body}</Components.Body>
      <S.StyledSkillTree
        selected={state.selectedSkills}
        skills={props.skills}
        handleChange={handleSkillChange}
        fetching={status === FormStatus.FETCHING_PROGRESS}
      />
      <FormValidation />
      {status === FormStatus.FETCHING_ERROR && (
        <Callout type="error">{Strings.form_fetching_error}</Callout>
      )}
      {status === FormStatus.SUBMIT_ERROR && (
        <Callout type="error">{Strings.form_submit_error}</Callout>
      )}
      {status === FormStatus.SUBMIT_SUCCESS && (
        <Callout type="success">
          <TemplateStringWithLink template={Strings.form_submit_success} />
        </Callout>
      )}
      <S.Footer>
        <Button
          type="submit"
          disabled={[
            FormStatus.SUBMIT_PROGRESS,
            FormStatus.SUBMIT_SUCCESS,
            FormStatus.FETCHING_ERROR,
          ].includes(status)}
        >
          {Strings.form_submit}
        </Button>
      </S.Footer>
    </S.Form>
  );
};

export default OnboardingForm;
