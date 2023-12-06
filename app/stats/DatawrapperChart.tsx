"use client";

import { useEffect, useRef } from "react";

type Props = {
  id: string;
  version?: number;
  title?: string;
};

export const DatawrapperChart = ({ id, version = 1 }: Props) => {
  const elem = useRef<HTMLDivElement | null>(null);
  const script = useRef<HTMLScriptElement>();
  useEffect(() => {
    if (!script.current) {
      script.current = document.createElement("script");
      script.current.src = `https://datawrapper.dwcdn.net/${id}/embed.js?v=${version}`;
      script.current.defer = true;
      elem.current!.appendChild(script.current);
    }
  }, [elem, script, id, version]);

  return (
    <div ref={elem} style={{ marginTop: "30px", marginBottom: "30px" }}></div>
  );
};
