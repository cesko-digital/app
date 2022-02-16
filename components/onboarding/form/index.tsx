import { Field, loadAllSkills } from "lib/skills";
import React, { useState, useEffect } from "react";
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

export const FormContext = React.createContext<FormContextProps>(
  {} as FormContextProps
);

const OnboardingFormContainer = () => {
  const [skills, setSkills] = useState<Field[]>([]);
  const [status, setStatus] = useState<FormStatus>(
    FormStatus.FETCHING_PROGRESS
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadAllSkills();
        setSkills(data);
        setStatus(FormStatus.FETCHING_SUCCESS);
      } catch (e) {
        setStatus(FormStatus.FETCHING_ERROR);
      }
    };

    fetchData();
  }, []);

  return (
    <FormContext.Provider value={{ status, setStatus }}>
      <Form skills={skills} />
    </FormContext.Provider>
  );
};

export default OnboardingFormContainer;
