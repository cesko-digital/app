import { useEffect, useState } from "react";

import { getJSON, patchJSON, postJSON } from "~/src/utils";

export function useResource<Value, Response>(
  loadValue: () => Promise<Value>,
  saveValue: (_: Value) => Promise<Response>,
) {
  const [model, setModel] = useState<Value | undefined>();
  const [updating, setUpdating] = useState(false);

  // Load resource value when mounted
  useEffect(() => {
    const doAsyncWork = async () => {
      setUpdating(true);
      try {
        const newModel = await loadValue();
        setModel(newModel);
      } catch (e) {
        // TBD: Set error state?
        console.error(e);
      }
      setUpdating(false);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    doAsyncWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save resource value when requested
  const saveModel = (newValue: Value) => {
    const doAsyncWork = async () => {
      setUpdating(true);
      const oldValue = model;
      setModel(newValue);
      try {
        await saveValue(newValue);
      } catch (e) {
        // TBD: Set error state?
        console.error(e);
        setModel(oldValue);
      }
      setUpdating(false);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    doAsyncWork();
  };

  return { model, updating, setModel: saveModel };
}

export type JSONResourceProps<T> = {
  url: string;
  decoder?: (_: unknown) => T;
};

export const useJSONResource = <T>({ url, decoder }: JSONResourceProps<T>) =>
  useResource(getJSON(url, decoder), postJSON(url));

export type PatchedJSONResourceProps<T> = {
  url: string;
  decoder?: (_: unknown) => T;
  writeKeys?: (keyof T)[];
};

export const usePatchedJSONResource = <T>({
  url,
  decoder,
  writeKeys,
}: PatchedJSONResourceProps<T>) =>
  useResource(getJSON(url, decoder), patchJSON(url, writeKeys));
