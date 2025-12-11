import Link from "next/link";

import { Mark404 } from "~/components/Mark404";
import { Route } from "~/src/routing";

export default async function Page() {
  return (
    <main className="m-auto flex max-w-content flex-col gap-20 px-7 py-20">
      <Mark404 />
      <section>
        <h1 className="typo-title mb-4 mt-20 text-center">
          404: Stránka nenalezena
        </h1>
        <p className="m-auto max-w-prose">
          Na tomto místě se dříve nejspíš nacházela otevřená role. Zobrazuje-li
          se nyní tento text, znamená to, že už daná role není aktuální. Díky za
          pochopení! Možná tě budou zajímat{" "}
          <Link href={Route.opportunities} className="typo-link">
            všechny naše otevřené role
          </Link>
          ?
        </p>
      </section>
    </main>
  );
}
