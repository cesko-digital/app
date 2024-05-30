"use client";

import { useRef, useState, type FormEvent } from "react";

import { type PutBlobResult } from "@vercel/blob";
import clsx from "clsx";

export const UploadForm = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    setUploading(true);
    setError(false);
    const response = await fetch(`/upload/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    if (response.ok) {
      const newBlob = (await response.json()) as PutBlobResult;
      setBlob(newBlob);
      setUploading(false);
    } else {
      setError(true);
      setUploading(false);
    }
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
        {error && <ErrorView />}
      </form>
    </div>
  );
};

const ErrorView = () => (
  <p className="max-w-prose">
    ⚠️ Soubor se nepovedlo nahrát. Není moc veliký? Jsi přihlášený nebo
    přihlášená? Máš oprávnění nahrávat soubory? Samé otázky. V případě potřeby
    se{" "}
    <a
      className="typo-link"
      href="https://cesko-digital.slack.com/archives/CHG9NA23D"
    >
      ozvi na Slacku
    </a>
    .
  </p>
);

const ResultView = ({ uploadedFileUrl }: { uploadedFileUrl: string }) => {
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
        <CopyToClipboardButton content={publicUrl} />
      </div>
    </div>
  );
};

const CopyToClipboardButton = ({ content }: { content: string }) => {
  const [clipboardWriteFinished, setClipboardWriteFinished] = useState(false);
  return (
    <button
      className={clsx(clipboardWriteFinished ? "btn-disabled" : "btn-primary")}
      onClick={async (e) => {
        e.preventDefault();
        await navigator.clipboard.writeText(content);
        setClipboardWriteFinished(true);
      }}
      disabled={clipboardWriteFinished}
    >
      {clipboardWriteFinished ? "Máš to tam!" : "Zkopírovat do schránky"}
    </button>
  );
};
