import React from "react";

export type Lang = "cs" | "en";

export const LangContext = React.createContext<Lang>("cs");

export function detectLanguageFromUrl(siteUrl: string): Lang {
  return siteUrl.startsWith("https://en.cesko.digital") ||
    siteUrl.startsWith("http://en.cesko.digital")
    ? "en"
    : "cs";
}
