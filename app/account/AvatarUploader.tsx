import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { type PutBlobResult } from "@vercel/blob";
import clsx from "clsx";

import { FormError } from "~/components/form/FormError";
import { defaultAvatarUrl } from "~/src/utils";

type Props = {
  currentImageUrl?: string;
  onImageChange: (uploadedImageUrl: string | undefined) => void;
};

export function AvatarUploader({ currentImageUrl, onImageChange }: Props) {
  const [previewImageUrl, setPreviewImageUrl] = useState(currentImageUrl);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPreviewImageUrl(currentImageUrl);
  }, [currentImageUrl]);

  const handleUpload = async (file: File, imageDataUrl: string) => {
    setUploading(true);
    setErrorMessage("");
    setPreviewImageUrl(imageDataUrl);

    const response = await fetch(
      `/account/profile-picture?filename=${file.name}`,
      {
        method: "POST",
        body: file,
      },
    );

    if (response.ok) {
      const newBlob = (await response.json()) as PutBlobResult;
      onImageChange(newBlob.url);
    } else {
      setErrorMessage("Něco se nepovedlo, zkus to prosím ještě jednou?");
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <AvatarPreview
        imageUrl={previewImageUrl}
        showProgressIndicator={uploading}
      />
      <ImageFilePicker handleImageData={handleUpload} />
      {errorMessage && <FormError error={errorMessage} />}
    </div>
  );
}

type ImageFilePickerProps = {
  handleImageData: (file: File, imageDataUrl: string) => void;
};

const ImageFilePicker = ({ handleImageData }: ImageFilePickerProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileSelection = () => {
    setErrorMessage("");

    if (!inputFileRef.current?.files) {
      setErrorMessage("Není vybraný soubor");
      return;
    }

    const file = inputFileRef.current.files[0];

    if (file.size > 4500000) {
      setErrorMessage("Soubor musí být menší než 4,5 MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Soubor musí mít formát obrázku");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        handleImageData(file, e.target.result);
      } else {
        setErrorMessage("Něco se nepovedlo, zkus to znovu");
      }
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        className="max-w-prose"
        name="file"
        ref={inputFileRef}
        type="file"
        required
        onChange={handleFileSelection}
      />
      {errorMessage && <FormError error={errorMessage} />}
    </div>
  );
};

const AvatarPreview = ({
  imageUrl,
  showProgressIndicator = false,
}: {
  imageUrl?: string;
  showProgressIndicator?: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor="avatarImage" className="block">
      Profilová fotka:
    </label>
    <Image
      src={imageUrl ?? defaultAvatarUrl}
      className={clsx(
        "h-[100px] w-[100px] rounded-full bg-gray object-cover shadow",
        showProgressIndicator && "animate-pulse",
      )}
      alt="Náhled současné profilovky"
      width={100}
      height={100}
    />
  </div>
);
