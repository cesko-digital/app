import { Breadcrumbs } from "~/components/Breadcrumbs";

import { UploadForm } from "./UploadForm";

export default async function UploadPage() {
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Upload"
      />
      <h1 className="typo-title mb-10 mt-7">Upload</h1>
      <UploadForm />
    </main>
  );
}
