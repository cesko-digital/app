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

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-7">
        <input
          className="max-w-prose"
          name="file"
          ref={inputFileRef}
          type="file"
          required
        />
        <div>
          <button
            type="submit"
            className={clsx(uploading ? "btn-disabled" : "btn-primary")}
            disabled={uploading}
          >
            {uploading ? "Nahrávám…" : "Nahrát soubor"}
          </button>
        </div>
        {blob && <ResultView uploadedFileUrl={blob.url} />}
      </form>
    </div>
  );
};

const ResultView = ({ uploadedFileUrl }: { uploadedFileUrl: string }) => {
  const [clipboardWriteFinished, setClipboardWriteFinished] = useState(false);
  const publicUrl =
    "https://assets.cesko.digital" + new URL(uploadedFileUrl).pathname;
  return (
    <div className="flex flex-col gap-7">
      <p>
        <a href={publicUrl} className="typo-link">
          {publicUrl}
        </a>
      </p>
      <div>
        <button
          className={clsx(
            clipboardWriteFinished ? "btn-disabled" : "btn-primary",
          )}
          onClick={async (e) => {
            e.preventDefault();
            await navigator.clipboard.writeText(publicUrl);
            setClipboardWriteFinished(true);
          }}
          disabled={clipboardWriteFinished}
        >
          {clipboardWriteFinished ? "Máš to tam!" : "Zkopírovat do schránky"}
        </button>
      </div>
    </div>
  );
};
