import { Breadcrumbs } from "~/components/Breadcrumbs";

import { UploadForm } from "./UploadForm";

export default async function UploadPage() {
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs currentPage="Nahrát data" />
      <h1 className="typo-title mb-10 mt-7">Nahrát data</h1>
      <p className="mb-10 max-w-prose">
        Tady můžeš snadno nahrát například obrázek nebo PDF, ke kterému chceš
        mít veřejné URL. Aktuálně jde takhle nahrávat pouze soubory zhruba do
        velikosti 4 MB, pokud potřebuješ větší, ozvi se.
      </p>
      <UploadForm />
    </main>
  );
}
