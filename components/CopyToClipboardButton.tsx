"use client";

import { useState } from "react";
import Image from "next/image";

import clsx from "clsx";

import { Copy as CopyIcon } from "~/components/icons/generic";

/** A button that copies given value to clipboard when clicked */
export const CopyToClipboardButton = ({ value }: { value?: string }) => {
  const [clipboardWriteFinished, setClipboardWriteFinished] = useState(false);
  return (
    <button
      disabled={clipboardWriteFinished}
      className={clsx(clipboardWriteFinished && "opacity-20")}
      title="Zkopírovat do schránky"
      onClick={async (e) => {
        e.preventDefault();
        await navigator.clipboard.writeText(value ?? "");
        setClipboardWriteFinished(true);
      }}
    >
      <Image
        src={CopyIcon}
        width={20}
        height={20}
        alt="Zkopírovat do schránky"
      />
    </button>
  );
};
