import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

import { type LegacyUser } from "~/src/data/legacy-user";
import { type Project } from "~/src/data/project";
import { Route } from "~/src/routing";

export type Props = {
  /** URL of the image to display */
  imageUrl: string;
  /** Text to display along with the image */
  label: string;
  /** If set, text will be clickable and lead to this URL */
  link?: string;
  size?: "small" | "normal" | "large";
  order?: "imageFirst" | "labelFirst";
  faded?: boolean;
};

/**
 * Generic circle image with a label
 *
 * TBD: Right-align label when labelFirst
 */
export const ImageLabel = ({
  imageUrl,
  label,
  link,
  size = "normal",
  order = "imageFirst",
  faded = false,
}: Props) => {
  const imageSize = size === "normal" ? 60 : size === "large" ? 80 : 25;
  return (
    <div
      className={clsx(
        "flex items-center gap-4",
        faded && "opacity-50",
        order === "labelFirst" ? "flex-row-reverse" : "flex-row",
      )}
    >
      <Image
        src={imageUrl}
        className={clsx(
          "rounded-full bg-gray shadow",
          // This fixes the appearance of non-square images
          "aspect-square object-cover object-top",
        )}
        width={imageSize}
        height={imageSize}
        alt=""
      />
      {!link && <span>{label}</span>}
      {link && (
        <Link className="typo-link" href={link}>
          {label}
        </Link>
      )}
    </div>
  );
};

export const ProjectImageLabel = ({
  project,
  order = "imageFirst",
  size = "normal",
}: {
  project: Project;
  order?: Props["order"];
  size?: Props["size"];
}) => {
  const link = project.state !== "draft" ? Route.toProject(project) : undefined;
  return (
    <ImageLabel
      imageUrl={project.logoUrl}
      label={project.name}
      link={link}
      order={order}
      size={size}
    />
  );
};

export const LegacyUserImageLabel = ({
  user,
  link,
}: {
  user: LegacyUser;
  link?: string;
}) => (
  <ImageLabel imageUrl={user.profilePictureUrl} label={user.name} link={link} />
);
