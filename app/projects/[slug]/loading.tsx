import { Breadcrumbs } from "~/components/Breadcrumbs";
import { Route } from "~/src/routing";

export default function Loading() {
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[
          { label: "Homepage", path: "/" },
          { label: "Projekty", path: Route.projects },
        ]}
        currentPage="…"
      />
    </main>
  );
}
