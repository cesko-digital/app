"use client";

import { useRef, useState, type FormEvent } from "react";

import { type PutBlobResult } from "@vercel/blob";
import clsx from "clsx";

export const UploadForm = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    setUploading(true);
    const response = await fetch(`/upload/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;
    setBlob(newBlob);
    setUploading(false);
  };

  const getPublicUrl = (blobUrl: string) =>
    "https://assets.cesko.digital" + new URL(blobUrl).pathname;

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-7">
        <input name="file" ref={inputFileRef} type="file" required />
        <div>
          <button
            type="submit"
            className={clsx(uploading ? "btn-disabled" : "btn-primary")}
            disabled={uploading}
          >
            {uploading ? "Malý moment…" : "Nahrát soubor"}
          </button>
        </div>
        {blob && (
          <div>
            <a href={getPublicUrl(blob.url)} className="typo-link">
              {getPublicUrl(blob.url)}
            </a>
          </div>
        )}
      </form>
    </div>
  );
};
