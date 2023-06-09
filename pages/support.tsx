import { Layout } from "components/layout";
import { Route } from "lib/routing";
import Image from "next/image";
import { ArrowIcon } from "components/icons";
import {
  hero,
  backpack,
  hoodie,
  notebook,
  shirt,
  sticker,
} from "components/merch";

const MerchPage = () => (
  <Layout crumbs={[{ label: "Podpořit" }]} head={{ title: "Podpořit" }}>
    <MerchSection />
    <DarujmeSection />
  </Layout>
);

const DarujmeSection = () => (
  <section className="max-w-content m-auto py-10 px-5 text-lg mb-20">
    <h1 className="text-[44px] font-bold leading-snug mb-10">
      Přispěj nám na Darujme.cz
    </h1>
    <p className="max-w-prose">
      S digitálními technologiemi dnes dokážeme téměř zázraky. Taky věříš, že
      díky technologiím může být život mnohem jednodušší, lepší a snadnější?
      {" "}
      <b>
        Podpoř komunitu lidí, kteří ve volném čase mění Česko k lepšímu právě
        díky technologiím.
      </b>
    </p>
    <p className="mt-6">
      <Button title="Přispět na Darujme.cz" href={Route.darujme} />
    </p>
  </section>
);

const MerchSection = () => (
  <section className="max-w-content m-auto py-10 px-5 text-lg">
    <h1 className="text-[44px] font-bold leading-snug mb-10">
      Pořiď si Merch.Digital
    </h1>
    <p className="max-w-prose">
      Nezáleží na tom, zda už v Česko.Digital pomáháš nebo mu fandíš. S kolekcí
      Merch.Digital můžeš hrdě šířit myšlenky komunity a nákupem jejích předmětů
      pošleš slušnou částku přímo na podporu a rozvoj organizace.
    </p>
    <p className="max-w-prose">
      V komunitě většinou pracujeme na home office nebo v kanceláři. S produkty
      Česko.Digital si i ty můžeš polepit počítač, zapisovat a skicovat ty
      nejlepší nápady, jak měnit Česko k lepšímu, nebo se obléct ve stylu
      Česko.Digital.
    </p>
    <Image src={hero} alt="" placeholder="blur" />

    <h2 className="leading-snug">Czechdesign & Česko.Digital</h2>
    <p className="max-w-prose">
      Ekologické materiály, český design, papírový blok vyrobený lidmi se
      znevýhodněním nebo mikina s veganským certifikátem. To vše stojí za
      kolekcí Merch.Digital, kterou pořídíš pouze na Czechdesign.
    </p>
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-7 sm:bg-pebble sm:p-7 sm:rounded-lg">
      <Image src={sticker} alt="" width={600} height={600} placeholder="blur" />
      <Image src={shirt} alt="" width={600} height={600} placeholder="blur" />
      <Image
        src={notebook}
        alt=""
        width={600}
        height={600}
        placeholder="blur"
      />
      <Image src={hoodie} alt="" width={600} height={600} placeholder="blur" />
    </div>
    <p className="mt-7 mb-14 text-center">
      <Button
        title="Koupit merch"
        href="https://shop.czechdesign.cz/ceskodigital/"
      />
    </p>

    <h2 className="leading-snug">
      I díky tobě můžeme nadále měnit Česko k lepšímu!
    </h2>
    <p className="max-w-prose">
      Koupí merche Česko.Digital podporuješ naši komunitu v tom, aby dále dělala
      to, co jí jde nejlépe – měnila Česko a svět kolem nás k lepšímu pomocí
      digitálních technologií. Za první 3 roky oslovily projekty komunity 4 000
      000 lidí. Také díky tvé podpoře můžeme pokračovat dál. Děkujeme!
    </p>
    <p className="max-w-prose">
      Máš nápad, jak merch ještě vylepšit? Nebo máš nějakou připomínku k jeho
      zpracování?{" "}
      <a href="https://airtable.com/shrTLixl0XVbyDm8G">Dej nám vědět!</a>
    </p>
  </section>
);

type ButtonProps = {
  title: string;
  href: string;
};

const Button = ({ title, href: url }: ButtonProps) => (
  <a className="btn-primary" href={url}>
    {title} <ArrowIcon className="ml-2 mb-1 inline align-middle" />
  </a>
);

export default MerchPage;
