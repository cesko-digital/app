import Plausible from "plausible-tracker";

export type CustomEvent = "SignUp" | "SignIn";

export const trackCustomEvent = (event: CustomEvent, callback = () => {}) =>
  Plausible({ domain: "app.cesko.digital" }).trackEvent(event, { callback });
