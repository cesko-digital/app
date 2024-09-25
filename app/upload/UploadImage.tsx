"use client";

import { useRef, useState, type FormEvent } from "react";

import { type PutBlobResult } from "@vercel/blob";
import clsx from "clsx";

import { FormError } from "~/components/form/FormError";
import { defaultAvatarUrl } from "~/src/utils";

type Props = {
  setAvatarImage: React.Dispatch<React.SetStateAction<string>>;
  avatarImage: string;
  onAvatarChange: (url: string) => void;
};

export const UploadImage = ({
  setAvatarImage,
  avatarImage,
  onAvatarChange,
}: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingChanges, setPendingChanges] = useState(false);

  const cleanInputFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const handleProblematicFile = (message: string) => {
    setErrorMessage(message);
    cleanInputFile();
    setAvatarImage(defaultAvatarUrl);
    setPendingChanges(false);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      setErrorMessage("Není vybraný soubor");
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
    setUploading(true);
    setPendingChanges(true);
    const response = await fetch(`/account/picture?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    if (response.ok) {
      const newBlob = (await response.json()) as PutBlobResult;
      cleanInputFile();
      onAvatarChange(newBlob.url);
    } else {
      setErrorMessage("Něco se nepovedlo, zkus to znovu");
    }
    setUploading(false);
    setPendingChanges(false);
  };

  const onUpload = () => {
    setErrorMessage("");
    setPendingChanges(true);
    if (!inputFileRef.current?.files) {
      setErrorMessage("Není vybraný soubor");
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    if (file.size > 4500000) {
      handleProblematicFile("Soubor musí být menší než 4.5 MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      handleProblematicFile("Soubor musí mít formát obrázku");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        setAvatarImage(e.target.result);
      } else {
        setErrorMessage("Něco se nepovedlo, zkus to znovu");
        throw new Error("FileReader result is not a string");
      }
    };
    fileReader.readAsDataURL(file);
  };

  const onDelete = () => {
    cleanInputFile();
    setAvatarImage(defaultAvatarUrl);
    onAvatarChange(defaultAvatarUrl);
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
          onChange={onUpload}
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
            Uložit fotku
          </button>
          <button
            className={clsx(
              uploading || avatarImage === defaultAvatarUrl
                ? "btn-disabled"
                : "btn-inverted",
            )}
            onClick={onDelete}
            disabled={uploading}
          >
            Smazat fotku
          </button>
        </div>
      </form>
    </div>
  );
};
