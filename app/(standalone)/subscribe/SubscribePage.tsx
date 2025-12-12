"use client";

import { useState } from "react";

import { RequiredFieldMarker } from "~/components/form/RequiredFieldMarker";
import { looksLikeEmailAdress } from "~/src/utils";

//
// Model
//

type TargetGroupId = "cist.digital" | "nezisk.digital" | "sluzby.digital";

type TargetGroup = {
  id: TargetGroupId;
  name: string;
  description: string;
};

//
// Subscribe Page
//

export const SubscribePage = () => {
  const targetGroups: TargetGroup[] = [
    {
      id: "cist.digital",
      name: "Číst.Digital",
      description: "Jednou měsíčně hlavní novinky z Česko.Digital",
    },
    {
      id: "nezisk.digital",
      name: "Nezisk.Digital",
      description: "Digitální transformace nezisku",
    },
    {
      id: "sluzby.digital",
      name: "Služby.Digital",
      description: "Digitální transformace veřejné správy",
    },
  ];

  return (
    <Form
      options={targetGroups}
      onSubmit={async (state) => {
        // TBD: Handle errors and success
        await fetch("/subscribe/submit", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(state),
        });
      }}
    />
  );
};

//
// Subscribe Form
//

type FormState = {
  submitting: boolean;
  selectedTargetGroups: TargetGroupId[];
  firstName: string;
  lastName: string;
  email: string;
};

const initialFormState: FormState = {
  submitting: false,
  selectedTargetGroups: ["cist.digital"],
  firstName: "",
  lastName: "",
  email: "",
};

const canSubmit = (state: FormState) =>
  state.firstName !== "" &&
  state.lastName !== "" &&
  state.selectedTargetGroups.length > 0 &&
  looksLikeEmailAdress(state.email) &&
  !state.submitting;

type FormProps = {
  options: TargetGroup[];
  onSubmit: (state: FormState) => Promise<void>;
};

const Form = ({ options, onSubmit }: FormProps) => {
  const [state, setState] = useState<FormState>(initialFormState);

  const toggleTargetGroup = (id: TargetGroupId) => {
    const oldValue = state.selectedTargetGroups;
    const selectedTargetGroups = oldValue.includes(id)
      ? oldValue.filter((g) => g !== id)
      : [...oldValue, id];
    setState({ ...state, selectedTargetGroups });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-3">Která témata vás zajímají?</p>
        <div className="mb-2 mt-1 flex flex-col">
          {options.map(({ id, name, description }) => (
            <label key={id} className="mb-2 flex flex-col">
              <span className="mb-1 flex items-center">
                <input
                  type="checkbox"
                  className="mr-3"
                  name={id}
                  checked={state.selectedTargetGroups.includes(id)}
                  onChange={() => toggleTargetGroup(id)}
                />
                {name}
              </span>
              <span className="typo-caption ml-6">{description}</span>
            </label>
          ))}
        </div>
      </div>

      <TextInput
        id="firstName"
        label="Jméno"
        autoComplete="given-name"
        required={true}
        value={state.firstName}
        onChange={(firstName) => setState({ ...state, firstName })}
      />
      <TextInput
        id="lastName"
        label="Příjmení"
        autoComplete="family-name"
        value={state.lastName}
        required={true}
        onChange={(lastName) => setState({ ...state, lastName })}
      />
      <TextInput
        id="email"
        label="E-mail"
        autoComplete="email"
        value={state.email}
        required={true}
        type="email"
        onChange={(email) => setState({ ...state, email })}
      />

      <p className="typo-caption">
        Váš email nikomu nedáme, kdykoliv se můžete odhlásit. Podrobné informace
        o tom, jak zpracováváme vaše osobní údaje,{" "}
        <a href="https://cesko.dev/pp" className="typo-link">
          najdete tady
        </a>
        .
      </p>

      <div>
        {canSubmit(state) && (
          <button
            className="btn-primary mt-4"
            onClick={async () => {
              setState({ ...state, submitting: true });
              await onSubmit(state);
              setState({ ...state, submitting: false });
            }}
          >
            Přihlásit odběr
          </button>
        )}
        {state.submitting && (
          <button className="btn-disabled mt-4" disabled>
            Moment…
          </button>
        )}
        {!canSubmit(state) && !state.submitting && (
          <button className="btn-disabled mt-4" disabled>
            Přihlásit odběr
          </button>
        )}
      </div>
    </div>
  );
};

//
// Helpers
//

type TextInputProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "url";
  value?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (newValue: string) => void;
};

const TextInput = ({
  id,
  label,
  type = "text",
  value = undefined,
  placeholder = undefined,
  required = false,
  disabled = false,
  autoComplete,
  onChange = (_) => {},
}: TextInputProps) => {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block">
        {label}
        {required && <RequiredFieldMarker />}
      </label>
      <input
        id={id}
        required={required}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        type={type}
        className="w-full rounded-md border-2 border-gray p-2"
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </div>
  );
};

const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));
