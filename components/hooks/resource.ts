import { useEffect, useState } from "react";

import { getJSON, postJSON } from "~/src/utils";

export function useResource<Value, Response>(
  get: () => Promise<Value>,
  post: (_: Value) => Promise<Response>,
) {
  const [model, setModel] = useState<Value | undefined>();
  const [updating, setUpdating] = useState(false);

  // GET current resource value when mounted
  useEffect(() => {
    const doAsyncWork = async () => {
      setUpdating(true);
      try {
        setModel(await get());
      } catch {
        // TBD: Set error?
      }
      setUpdating(false);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    doAsyncWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // POST new resource value when requested
  const saveModel = (newValue: Value) => {
    const doAsyncWork = async () => {
      setUpdating(true);
      const oldValue = model;
      setModel(newValue);
      try {
        await post(newValue);
      } catch {
        // TBD: Set error?
        setModel(oldValue);
      }
      setUpdating(false);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    doAsyncWork();
  };

  return { model, updating, setModel: saveModel };
}

export const useJSONResource = <T>(url: string, decoder: (_: unknown) => T) =>
  useResource(getJSON(url, decoder), postJSON(url));
