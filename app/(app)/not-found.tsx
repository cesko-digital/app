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
          Nedávno jsme web hodně měnili, možná nám něco uteklo? Pardon! Pokud
          jste v našem Slacku, ozvěte se nám prosím v kanálu{" "}
          <a
            href="https://cesko-digital.slack.com/archives/CHG9NA23D"
            className="typo-link"
          >
            #ceskodigital-web
          </a>
          , případně můžete napsat na{" "}
          <a
            href="mailto:zoul@cesko.digital?Subject=Chybějící stránka na webu"
            className="typo-link"
          >
            zoul@cesko.digital
          </a>{" "}
          nebo rovnou{" "}
          <a
            href="https://github.com/cesko-digital/web/issues/new"
            className="typo-link"
          >
            vytvořit nový ticket na GitHubu
          </a>
          . Děkujeme!
        </p>
      </section>
    </main>
  );
}
