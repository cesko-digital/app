"use client";

import { useEffect, useRef } from "react";

type Props = {
  id: string;
  title?: string;
};

export const DatawrapperChart = ({ id }: Props) => {
  const elem = useRef<HTMLDivElement | null>(null);
  const script = useRef<HTMLScriptElement>();
  useEffect(() => {
    if (!script.current) {
      script.current = document.createElement("script");
      script.current.src = `https://datawrapper.dwcdn.net/${id}/embed.js`;
      script.current.defer = true;
      elem.current!.appendChild(script.current);
    }
  }, [elem, script, id]);

  return (
    <div
      key={id}
      ref={elem}
      style={{ marginTop: "30px", marginBottom: "30px" }}
    ></div>
  );
};
