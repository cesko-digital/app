import { Layout } from "components/layout";
import Image, { StaticImageData } from "next/image";
import {
  Eva,
  Yen,
  Romana,
  Anezka,
  Jindra,
  Terezia,
  Terka,
  Martina,
  Lukas,
  Zoul,
  Gabi,
} from "components/about/images";

const AboutPage = () => (
  <Layout crumbs={[{ label: "O nás" }]} head={{ title: "O nás" }}>
    <IntroSection />
    <CoreTeamSection />
  </Layout>
);

const IntroSection = () => (
  <section className="max-w-content m-auto py-10 px-5 text-lg">
    <h1 className="text-[44px] font-bold leading-snug mb-10">
      Komunita Česko.Digital
    </h1>
    <p className="max-w-prose">
      Jsme největší evropská civic-tech komunita expertních dobrovolníků, kteří
      ve svém volném čase pomáhají státu i nestátním organizacím s digitalizací
      a mění tak Česko k lepšímu.
    </p>
  </section>
);

const CoreTeamSection = () => (
  <section className="max-w-content m-auto py-10 px-5 text-lg">
    <h2 className="mb-12 mt-0">Kmenový tým Česko.Digital</h2>
    <p className="max-w-prose">
      Přes 90 % rozpočtu Česko.Digital tvoří náklady na kmenový tým, který má
      potřebné kompetence a dovednosti, udává směr organizace a pomáhá komunitě
      dosahovat stanovených cílů.
    </p>
    <p className="max-w-prose mb-7">
      Jako kmenový tým zajišťujeme strategické a projektové řízení, péči o
      komunitu, budování networku napříč organizacemi z neziskové a státní
      správy. Věnujeme se také UX a designu služeb, včetně komunikační podpory,
      strategie značky a PR a finančně administrativních úkonů.
    </p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
      <MemberCard name="Eva Pavlíková" title="CEO" image={Eva}>
        Vedu komunitu Česko.Digital, zajišťuju její rozvoj a směřování. Mimo
        komunitu mě nejčastěji potkáte v roli CEO (Chief Executive Officer) nebo
        ředitelka.{" "}
        <a href="https://cesko-digital.atlassian.net/wiki/spaces/CD/pages/834568254/Moje+AHA+momenty">
          Moje AHA momenty
        </a>
        .
      </MemberCard>
      <MemberCard name="Jan Kotara" title="COO" image={Yen}>
        Tj. provozní ředitel. Operations role umožňují ostatním se maximálně
        soustředit na své úkoly a maximalizovat produktivitu, a to podílením se
        na usnadnění chodu a procesů organizace.
      </MemberCard>
      <MemberCard
        name="Tereza Gagnon"
        title="Head of Partnership and Fundraising"
        image={Terka}
      >
        Zodpovídá za péči o partnery a dárce Česko.Digital tak, aby vztah
        probíhal podle očekávání obou stran a ideálně dlouhodobě.
      </MemberCard>
      <MemberCard name="Romana Pokorná" title="Project Lead" image={Romana}>
        Pracuje na rozvoji projektové metodiky. Zajišťuje, že je transparentně a
        srozumitelně komunikována, organizuje na daná témata setkání a
        vzdělávání. Propojuje členy komunity s touto kompetencí.
      </MemberCard>
      <MemberCard name="Anežka Müller" title="Event Lead" image={Anezka}>
        Stará se o vše, co v Česko.Digital souvisí s oblastí eventů, ať už jsou
        přímo pořádané Česko.Digital, participujeme na organizaci nebo se jich
        účastníme. Zodpovídá za eventovou strategii, udržuje aktuální eventový
        plán a má na starosti dobro-tým, který pomáhá s realizací akcí.
      </MemberCard>
      <MemberCard
        name="Jindřich Oukropec"
        title="Brand Product Owner & Support"
        image={Jindra}
      >
        Má na starosti nadchnout Čechy do expertního dobrovolnictví. A také
        směřování projektu Brand Česko.Digital. Rovněž zastává roli Scrum
        Support Mastera na projektech.
      </MemberCard>
      <MemberCard
        name="Terézia Palaščáková"
        title="Content Lead"
        image={Terezia}
      >
        Má na starosti obsah a komunikaci, které propagují Česko.Digital i jeho
        jednotlivé projekty. Zároveň vede a motivuje obsahový tým a slouží jako
        obsahový mentor. Když je potřeba, stane se na chvíli copywriterem.
      </MemberCard>
      <MemberCard
        name="Martina Habová"
        title="Marketing and Communication Lead"
        image={Martina}
      >
        Zodpovídá za zviditelnění a propagaci komunity expertních dobrovolníků
        Česko.Digital, jejich aktivit a realizovaných dopadů. Spolupracuje úzce
        s marketingovými specialisty a dalšími kolegy.
      </MemberCard>
      <MemberCard
        name="Lukáš Návesník"
        title="Digital & Production Lead"
        image={Lukas}
      >
        Má na starosti správu audiovizuálního obsahu. Vede produkční tým.
        Zpracovává příchozí požadavky na informační grafiku na sociální sítě,
        blogové články a vzdělávací materiály. Je spojkou mezi marketingem & IT.
      </MemberCard>
      <MemberCard name="Tomáš Znamenáček" title="Programátor" image={Zoul}>
        Funguje především jako maintainer webu Česko.Digital a souvisejících
        věcí, zejména Portálu dobrovolníka. Pomáhá dobrovolníkům, aby si taky
        mohli hezky zaprogramovat.
      </MemberCard>
      <MemberCard
        name="Gabriela Chladilová"
        title="NGO Program Lead & Jira Specialist"
        image={Gabi}
      >
        Stará se jak o příchozí dobrovolníky, tak o jednotlivce neziskových a
        veřejnosprávních organizací. Koordinuje příchozí projekty.
      </MemberCard>
    </div>
  </section>
);

type Member = {
  name: string;
  title: string;
  image: StaticImageData;
  children: React.ReactNode;
};

const MemberCard = ({ name, title, image, children }: Member) => (
  <div className="border-2 border-pebble rounded-lg overflow-clip">
    <Image src={image} alt="" placeholder="blur" width="768" height="432" />
    <div className="px-4 pb-4">
      <h3>
        {name}, {title}
      </h3>
      {children}
    </div>
  </div>
);

export default AboutPage;
