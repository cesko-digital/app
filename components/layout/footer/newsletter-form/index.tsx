import { useFormik, FormikErrors } from "formik";
import { useState } from "react";
import * as S from "./styles";
import { CheckIcon } from "components/icons";
import strings from "content/strings.json";

const msg = strings.components.sections.footer.newsletter;

export interface NewsletterFormValues {
  email: string;
}

const Newsletter: React.FC = () => {
  const validate = useValidateNewsletter();
  const [onSubmit, hasServerError, hasSubscribed] = useOnSubmitNewsletter();

  const form = useFormik<NewsletterFormValues>({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit,
  });

  const emailInvalid = !!(form.touched.email && form.errors?.email);
  const shouldDisplayError = hasServerError || emailInvalid;

  return (
    <S.Container>
      <S.Icon />
      <S.Heading>{msg.title}</S.Heading>
      <S.Info>{msg.note}</S.Info>
      {hasSubscribed ? (
        <S.SubscribeDoneWrapper data-test-id="newsletter-submit-success">
          <S.CheckIconWrapper>
            <CheckIcon />
          </S.CheckIconWrapper>
          {msg.subscribed}
        </S.SubscribeDoneWrapper>
      ) : (
        <S.Form onSubmit={form.handleSubmit}>
          <S.FormControl>
            <S.Input
              dark={true}
              name="email"
              placeholder={msg.inputPlaceholder}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.email}
              invalid={emailInvalid}
              disabled={form.isSubmitting}
            />
          </S.FormControl>
          <S.Button
            type="submit"
            loading={form.isSubmitting}
            disabled={form.isSubmitting}
          >
            {msg.subscribe}
          </S.Button>
          {shouldDisplayError && (
            <S.ErrorMessage data-test-id="newsletter-submit-error">
              {hasServerError ? msg.serverError : form.errors.email}
            </S.ErrorMessage>
          )}
          <p className="text-sm">
            Odesláním formuláře vyjadřujete svůj souhlas s{" "}
            <a
              href="https://cesko.digital/go/newsletter-privacy"
              className=" text-white"
            >
              těmito podmínkami zpracování osobních údajů
            </a>
            .
          </p>
        </S.Form>
      )}
    </S.Container>
  );
};

type SubmitFunction = (values: NewsletterFormValues) => Promise<void>;

const useOnSubmitNewsletter = (): [SubmitFunction, boolean, boolean] => {
  const [hasError, setHasError] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  const submit: SubmitFunction = async (values) => {
    setHasError(false);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.status !== 200) {
        setHasError(true);
        return;
      }
      setHasSubscribed(true);
    } catch (error) {
      setHasError(true);
    }
  };

  return [submit, hasError, hasSubscribed];
};

type ValidateFunction = (
  values: NewsletterFormValues
) => FormikErrors<NewsletterFormValues>;

export const useValidateNewsletter = (): ValidateFunction => {
  const validate = ({ email }: NewsletterFormValues) => {
    if (!email || email.length === 0) {
      return {
        email: msg.emailRequiredError,
      };
    }

    // TBD: Improve validation
    if (email.indexOf("@") == -1) {
      return {
        email: msg.invalidEmailError,
      };
    }
    return {};
  };

  return validate;
};

export default Newsletter;
