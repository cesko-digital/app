"use client";

import { useRef, useState, type FormEvent } from "react";

import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import clsx from "clsx";

import { CopyToClipboardButton } from "~/components/CopyToClipboardButton";

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
    if (!inputFileRef.current.files[0].name) {
      throw new Error("Missing filename");
    }

    setUploading(true);
    setError(false);

    try {
      const file = inputFileRef.current.files[0];
      const newBlob = await uploadFile(file);
      setBlob(newBlob);
    } catch {
      setError(true);
    }

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
        {error && <ErrorView />}
      </form>
    </div>
  );
};

const ErrorView = () => (
  <p className="max-w-prose">
    ⚠️ Soubor se nepovedlo nahrát. Jsi přihlášený nebo přihlášená? Máš oprávnění
    nahrávat soubory? Samé otázky. V případě potřeby se{" "}
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
    <p className="flex flex-row items-center gap-4">
      <a href={publicUrl} className="typo-link">
        {publicUrl}
      </a>
      <CopyToClipboardButton
        title="Zkopírovat URL do schránky"
        value={publicUrl}
      />
    </p>
  );
};

/**
 * Function for generating SHA-1 hash of a file contents.
 *
 * Courtesy of MDN Web Docs:
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
 */
async function SHA1Hash(file: File): Promise<string> {
  const data = await file.arrayBuffer();
  const hashBuffer = await window.crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // Convert bytes to hex string.
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function SHA1Prefix(file: File): Promise<string> {
  return (await SHA1Hash(file)).slice(0, 8);
}

async function uploadFile(file: File): Promise<PutBlobResult> {
  const hash = await SHA1Prefix(file);
  const fileExtension = file.name.split(".").pop();
  const target = `${hash}.${fileExtension}`;
  return await upload(target, file, {
    access: "public",
    handleUploadUrl: "/upload/upload",
  });
}
