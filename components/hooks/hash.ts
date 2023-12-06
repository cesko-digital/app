"use client";

import { useEffect, useState } from "react";

const getHash = () =>
  typeof window !== "undefined"
    ? decodeURIComponent(window.location.hash.replace("#", ""))
    : undefined;

/**
 * Return the hash part of the current page URL
 *
 * https://github.com/vercel/next.js/discussions/49465#discussioncomment-6966993
 */
const useHash = () => {
  const [hash, setHash] = useState(getHash());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleHashChange = () => {
      setHash(getHash());
    };
    setHash(getHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return isClient ? hash : undefined;
};

export default useHash;
