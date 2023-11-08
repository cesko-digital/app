import Image from "next/image";
import { Project } from "src/data/project";
import { Route } from "src/routing";

// TBD: Image sizing
export const ProjectCard = (project: Project) => (
  <a
    className="block border-2 border-gray rounded-xl overflow-clip relative hover:border-it hover:shadow-lg"
    key={project.id}
    href={Route.toProject(project)}
  >
    <div className="aspect-[2] relative">
      <Image
        src={project.coverImageUrl}
        alt=""
        className="bg-gray object-cover"
        fill
      />
    </div>
    <Image
      src={project.logoUrl}
      alt=""
      width={80}
      height={80}
      className="drop-shadow-xl rounded-full -mt-[55px] ml-7 bg-white"
    />
    <div className="p-7 flex flex-col gap-4">
      <h3 className="typo-title3">{project.name}</h3>
      <p>{project.tagline}</p>
    </div>
  </a>
);
