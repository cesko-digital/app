import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { getJSON, patchJSON, postJSON } from "~/src/utils";

type GetMessageCallback<T> = (oldValue: T | undefined, newValue: T) => string;

type ToastOptions<T> = {
  onSavePendingMsg?: string | GetMessageCallback<T>;
  onSaveMsg?: string | GetMessageCallback<T>;
  onSaveErrorMsg?: string | GetMessageCallback<T>;
};

function getMessage<T>(
  oldValue: T | undefined,
  newValue: T,
  callbackOrString: string | GetMessageCallback<T>,
): string {
  if (typeof callbackOrString === "function") {
    return callbackOrString(oldValue, newValue);
  }
  return callbackOrString;
}

/**
 * Add a toast notification to a promise (loading, on success and on failure).
 *
 * Toast message can be customized via `options` prop.
 */
async function withToast<T>(
  oldValue: T | undefined,
  newValue: T,
  promise: Promise<void>,
  options: ToastOptions<T> = {},
) {
  const loadingMsg = getMessage(
    oldValue,
    newValue,
    options.onSavePendingMsg ?? "Ukládám...",
  );
  const successMsg = getMessage(
    oldValue,
    newValue,
    options.onSaveMsg ?? "Hotovo 🎉",
  );
  const errorMsg = getMessage(
    oldValue,
    newValue,
    options.onSaveErrorMsg ?? "Nastala chyba. 😕\nZkus to, prosím, později.",
  );

  // Get rid of all previous toasts, so it's clear what's happening.
  toast.dismiss();
  let toastId;
  // Show loading toast only if the response takes longer than 250ms.
  // Otherwise, it will just flicker.
  const timeoutId = setTimeout(() => {
    toastId = toast.loading(loadingMsg);
  }, 250);
  try {
    await promise;
    toast.success(successMsg, {
      iconTheme: { primary: "blue", secondary: "white" },
    });
  } catch {
    toast.error(errorMsg);
  } finally {
    clearTimeout(timeoutId);
    if (toastId) {
      toast.dismiss(toastId);
    }
  }
}

export function useResource<Value, Response>(
  loadValue: () => Promise<Value>,
  saveValue: (_: Value) => Promise<Response>,
  toastOptions?: ToastOptions<Value>,
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
      const handleRequestPromise = async () => {
        try {
          await saveValue(newValue);
        } catch (e) {
          // TBD: Set error state?
          console.error(e);
          setModel(oldValue);
          throw e;
        }
      };
      await withToast(oldValue, newValue, handleRequestPromise(), toastOptions);
      setUpdating(false);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    doAsyncWork();
  };

  return { model, updating, setModel: saveModel };
}

type CommonJSONResourceProps<T> = {
  url: string;
  decoder?: (_: unknown) => T;
  toastOptions?: ToastOptions<T>;
};

export type JSONResourceProps<T> = CommonJSONResourceProps<T> & {};

export const useJSONResource = <T>({
  url,
  decoder,
  toastOptions,
}: JSONResourceProps<T>) =>
  useResource(getJSON(url, decoder), postJSON(url), toastOptions);

export type PatchedJSONResourceProps<T> = CommonJSONResourceProps<T> & {
  writeKeys?: (keyof T)[];
};

export const usePatchedJSONResource = <T>({
  url,
  decoder,
  writeKeys,
  toastOptions,
}: PatchedJSONResourceProps<T>) =>
  useResource(getJSON(url, decoder), patchJSON(url, writeKeys), toastOptions);
