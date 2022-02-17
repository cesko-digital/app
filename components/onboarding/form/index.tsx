import { Field } from "lib/skills";
import { createContext, useState } from "react";
import Form from "./onboarding-form";

export enum FormStatus {
  FETCHING_PROGRESS = "fetching-progress",
  FETCHING_SUCCESS = "fetching-success",
  FETCHING_ERROR = "fetching-error",
  SUBMIT_PROGRESS = "submit-progress",
  SUBMIT_SUCCESS = "submit-success",
  SUBMIT_ERROR = "submit-error",
}

export interface FormContextProps {
  status: FormStatus;
  setStatus: React.Dispatch<React.SetStateAction<FormStatus>>;
}

export const FormContext = createContext<FormContextProps>(
  {} as FormContextProps
);

const OnboardingFormContainer: React.FC<{ skills: Field[] }> = ({ skills }) => {
  const [status, setStatus] = useState<FormStatus>(FormStatus.FETCHING_SUCCESS);
  return (
    <FormContext.Provider value={{ status, setStatus }}>
      <Form skills={skills} />
    </FormContext.Provider>
  );
};

export default OnboardingFormContainer;
