"use client";

import { useRef, useState, type FormEvent } from "react";

import { type PutBlobResult } from "@vercel/blob";
import clsx from "clsx";

import { FormError } from "~/components/form/FormError";
import { defaultAvatarUrl } from "~/src/utils";

type Props = {
  setAvatarImage: React.Dispatch<React.SetStateAction<string>>;
  avatarImage: string;
  onChange: (url: string) => void;
};

export const UploadImage = ({
  setAvatarImage,
  avatarImage,
  onChange,
}: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  // const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingChanges, setPendingChanges] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    setUploading(true);
    const response = await fetch(`/account/picture?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    if (response.ok) {
      const newBlob = (await response.json()) as PutBlobResult;
      setUploading(false);
      onChange(newBlob.url);
    } else {
      setUploading(false);
    }
  };

  const uploadHandler = () => {
    setErrorMessage("");
    setPendingChanges(true);
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    if (file.size > 4500000) {
      setErrorMessage("Soubor musí být menší než 4.5 MB");
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      setAvatarImage(defaultAvatarUrl);
      setPendingChanges(false);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Soubor musí mít formát obrázku");
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      setAvatarImage(defaultAvatarUrl);
      setPendingChanges(false);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        setAvatarImage(e.target.result);
      } else {
        throw new Error("FileReader result is not a string");
      }
    };
    fileReader.readAsDataURL(file);
  };

  const handleRemoval = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
    setAvatarImage(defaultAvatarUrl);
    setPendingChanges(false);
    onChange(defaultAvatarUrl);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-7">
        <input
          className="max-w-prose"
          name="file"
          ref={inputFileRef}
          type="file"
          required
          onChange={uploadHandler}
        />
        {errorMessage && (
          <div className="py-1">
            <FormError error={errorMessage} />
          </div>
        )}
        <div className="flex gap-2">
          <button
            type="submit"
            className={clsx(
              uploading || !pendingChanges ? "btn-disabled" : "btn-primary",
            )}
            disabled={uploading}
          >
            {uploading ? "Ukladam" : "Uložit profilovou fotku"}
          </button>
          <button
            className={clsx(
              uploading || avatarImage === defaultAvatarUrl
                ? "btn-disabled"
                : "btn-inverted",
            )}
            onClick={handleRemoval}
            disabled={uploading}
          >
            Smazat profilovou fotku
          </button>
        </div>
      </form>
    </div>
  );
};
