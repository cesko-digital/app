import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

/**
 * Defer subtree rendering to client
 *
 * This is mostly used to prevent hydration errors in cases like these:
 *
 * https://stackoverflow.com/questions/50883916
 */
export const ClientRender = ({ children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted ? <>{children}</> : null;
};
