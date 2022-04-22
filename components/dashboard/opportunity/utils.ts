/** Get an appropriate label for given contact URL */
export const getContactButtonLabel = (contactUrl: string) => {
  if (contactUrl.startsWith("https://cesko-digital.slack.com/")) {
    return "Kontaktovat přes Slack";
  } else if (contactUrl.startsWith("mailto:")) {
    return "Kontaktovat mailem";
  } else {
    return "Kontaktovat";
  }
};
