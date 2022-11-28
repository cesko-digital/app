import { Layout } from "components/layout";
import { default as Hero } from "components/merch/hero.jpg";
import { Route } from "lib/utils";
import Image from "next/image";

const MerchPage = () => (
  <Layout crumbs={[{ label: "Podpořit" }]} head={{ title: "Podpořit" }}>
    <DarujmeSection />
    <MerchSection />
  </Layout>
);

const DarujmeSection = () => (
  <section className="max-w-content m-auto py-10 px-5 text-lg">
    <h1 className="text-[44px] font-bold leading-snug mb-10">
      Přispěj komunitě na Darujme.cz
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
      <a className="btn-primary" href={Route.darujme}>
        Přispět na Darujme.cz
      </a>
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
      pošleš slušnou částkou přímo na podporu a rozvoj organizace.
    </p>
    <p className="max-w-prose">
      V komunitě většinou pracujeme na home office nebo v kanceláři. S produkty
      Česko.Digital si i ty můžeš polepit počítač, zapisovat a skicovat ty
      nejlepší nápady, jak měnit Česko k lepšímu, obléct se ve stylu
      Česko.Digital nebo cestovat klidně na druhý konec světa s batohem od
      českých designérů.
    </p>
    <Image src={Hero} alt="" />

    <h2>Czechdesign & Česko.Digital</h2>
    <p className="max-w-prose">
      Ekologické materiály, český design, papírový blok vyrobený lidmi se
      znevýhodněním nebo mikina s veganským certifikátem. To vše stojí za
      kolekcí Merch.Digital, kterou pořídíš pouze na Czechdesign.
    </p>
    <p className="mt-6 mb-14">
      <a className="btn-primary">Koupit merch</a>
    </p>

    <h2>Batoh.Digital</h2>
    <p className="max-w-prose">
      Pomáhat s Česko.Digital můžeš z druhého konce světa, z pláže i z lesa. Na
      všechny tvoje výlety ti poslouží kvalitní batoh vyrobený v pražských
      Holešovicích. Návrh vznikl přímo v komunitě a konzultovali jsme ho s
      výrobcem BRAASI.
    </p>
    <h2>2 dobré skutky najednou</h2>
    <p className="max-w-prose">
      Koupí batohu <b>získáš nejen praktického společníka na cesty</b>, ale
      podpoříš fungování a rozvoj dobrovolnické komunity Česko.Digital slušnou
      částkou <b>1000 Kč</b>. To však není všechno, 400 Kč půjde ještě na
      sociální podnik Becalel, který zaměstnává lidi se znevýhodněním a batoh ti
      pošle až domů.
    </p>
    <p className="mt-6 mb-14">
      <a className="btn-primary">Koupit batoh</a>
    </p>

    <h2>I díky tobě můžeme nadále měnit Česko k lepšímu!</h2>
    <p className="max-w-prose">
      Koupí merche Česko.Digital podporuješ naší komunitu v tom, aby dále dělala
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

export default MerchPage;
