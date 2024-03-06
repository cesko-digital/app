"use client";

import { useEffect } from "react";

import { trackCustomEvent } from "~/src/plausible/events";

/** Client-side component that logs a 404 event for current page into our Plausible Analytics */
export const Mark404 = () => {
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      trackCustomEvent("404", { props: { path: document.location.pathname } });
    });
  }, []);
  return null;
};
