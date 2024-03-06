import Plausible, { type EventOptions } from "plausible-tracker";

export type CustomEvent = "SignUp" | "SignIn" | "404";

export const trackCustomEvent = (
  event: CustomEvent,
  options: EventOptions | undefined = undefined,
) => Plausible({ domain: "app.cesko.digital" }).trackEvent(event, options);
