import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Project } from "src/data/project";
import { Route } from "src/routing";

export type Props = {
  project: Project;
  fade?: boolean;
};

export const ProjectCard = ({ project, fade = false }: Props) => (
  <Link
    className="block border-2 border-gray rounded-xl overflow-clip relative hover:border-it hover:shadow-lg"
    key={project.id}
    href={Route.toProject(project)}
  >
    <div className="aspect-[2] relative">
      <Image
        src={project.coverImageUrl}
        sizes="(min-width: 1200px) 400px, 100vw"
        alt=""
        className={clsx(
          "bg-gray object-cover",
          fade && "grayscale-[75%] opacity-75"
        )}
        fill
      />
    </div>
    <Image
      src={project.logoUrl}
      alt=""
      width={80}
      height={80}
      className={clsx(
        "drop-shadow-xl rounded-full -mt-[55px] ml-7 bg-white",
        // This fixes the appearance of non-square images
        "aspect-square object-cover object-top"
      )}
    />
    <div className="p-7 flex flex-col gap-4">
      <h3 className="typo-title3">{project.name}</h3>
      <p>{project.tagline}</p>
    </div>
  </Link>
);
