import { Layout } from "components/layout";
import pracak from "app/about/case/pracak.jpg";
import gradient from "app/about/case/gradient.png";
import Image, { StaticImageData } from "next/image";

const CasePage = () => (
  <Layout crumbs={[{ label: "O nás" }]} head={{ title: "Case for Support" }}>
    <div className="max-w-content m-auto px-5 text-xl">
      <h1 className="text-[44px] font-bold leading-snug mb-10">
        Změňme spolu Česko k lepšímu
      </h1>
      <div className="max-w-prose font-bold leading-relaxed">
        <p>
          Technologiím se v Česku daří. Máme kvalitní technické univerzity,
          vznikly u nás velmi úspěšné technologické firmy, které jsou známé po
          celém světě – Avast, Seznam nebo Satoshi Labs.
        </p>
        <p>A i přes to jsme svědky těchto případů…</p>
      </div>
    </div>

    <ImageQuoteSection image={pracak}>
      Lidé v nouzi sice mohou získat podporu, ale neví jak. Čekají měsíce, úřady
      s nimi vůbec nekomunikuji. Nemají často ani na jídlo.
    </ImageQuoteSection>

    <div className="max-w-content m-auto px-5 py-20 text-xl">
      <div className="grid grid-cols-2 gap-7">
        <div>
          <p>
            Čtyřicátník v kapuci vysvětluje, že na úřad práce přišel v září, kdy
            mu doporučili, aby si o příspěvek na bydlení zažádal on-line. A od
            té doby čeká. „Plyn a energie mi od ledna stouply o dva a půl tisíce
            korun. Nově mám platit šest a půl tisíce,“ říká muž, a raději se
            proto rozhodl hned po Novém roce vydat na úřad, aby se zeptal, co se
            s jeho žádostí děje.
          </p>
          <p>
            Samoživitelka Zuzana vysvětluje, že se k ní dostala pouze informace,
            že její žádost o dávku zpracovává „metodik“. Nerozumí ale tomu,
            jestli je potřeba něco doložit, nebo je dávka schválená, případně
            kdy bude vyplacená.
          </p>
        </div>
        <TextQuote
          quote="On-line žádost jsem zkoušela a nikdo se mi neozval."
          author="Zuzana P. pro Seznam Zprávy (leden 2023)"
          source="https://www.seznamzpravy.cz/clanek/domaci-zivot-v-cesku-ve-fronte-pred-uradem-prace-na-prispevek-cekaji-mesice-a-urednici-nekomunikuji-222350"
        />
      </div>
    </div>
  </Layout>
);

//
// Components
//

const ImageQuoteSection = ({
  image,
  children,
}: {
  image: StaticImageData;
  children: React.ReactNode;
}) => (
  <div className="max-w-content m-auto px-5">
    <div className="w-full aspect-video relative">
      <Image src={image} alt="" className="absolute" />
      <Image src={gradient} alt="" className="absolute" fill />
      <h2 className="absolute w-[50%] text-white px-20 py-20">{children}</h2>
    </div>
  </div>
);

const TextQuote = ({
  quote,
  author,
  source,
}: {
  quote: string;
  author: string;
  source: string;
}) => (
  <div>
    <blockquote className="text-2xl font-bold">„{quote}“</blockquote>
    <p>
      <a href={source}>{author}</a>
    </p>
  </div>
);

export default CasePage;
