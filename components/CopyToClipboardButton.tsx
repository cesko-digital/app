"use client";

import { useState } from "react";
import Image from "next/image";

import clsx from "clsx";

import { Copy as CopyIcon } from "~/components/icons/generic";

type Props = {
  value?: string;
  title?: string;
};

/** A button that copies given value to clipboard when clicked */
export const CopyToClipboardButton = ({
  title = "Zkopírovat do schránky",
  value = "",
}: Props) => {
  const [clipboardWriteFinished, setClipboardWriteFinished] = useState(false);
  return (
    <button
      disabled={clipboardWriteFinished}
      className={clsx(clipboardWriteFinished && "opacity-20")}
      title={title}
      onClick={async (e) => {
        e.preventDefault();
        await navigator.clipboard.writeText(value);
        setClipboardWriteFinished(true);
      }}
    >
      <Image src={CopyIcon} width={20} height={20} alt={title} />
    </button>
  );
};
