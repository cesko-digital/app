import { Mark404 } from "~/components/Mark404";

export default async function Page() {
  return (
    <main className="m-auto flex max-w-content flex-col gap-20 px-7 py-20">
      <Mark404 />
      <section>
        <h1 className="typo-title mb-4 mt-20 text-center">
          404: Stránka nenalezena
        </h1>
        <p className="m-auto max-w-prose">
          Na tomto místě se dříve nacházela otevřená role.
          Zobrazuje-li se nyní tento text, znamená to, že už daná role není aktuální.
          Díky za pochopení!
          Všechny otevřené role můžete najít 
          <a
            href="https://app.cesko.digital/opportunities"
            className="typo-link"
          >
            tady.
          </a>
        </p>
      </section>
    </main>
  );
}
