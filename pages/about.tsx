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
    <p className="max-w-prose mb-7">
      Počet členů kmenového týmu se nepravidelně mění, ale aspirace a hodnoty
      zůstávají stejné. Díky placeným úvazkům a potřebnému kontextu se kmenový
      tým naplno věnuje rozvoji organizace, designu služeb a péči o komunitu.
      Zároveň tvoří strategii organizace i značky, které pomáhají dosahovat
      stanovených cílů. Na starosti má také komunikaci přínosu a jedinečnosti
      organizace a budování vztahů se státem, neziskovkami, veřejností a dalšími
      organizacemi.
    </p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
      <MemberCard
        name="Eva Pavlíková"
        title="Chief Executive Officer"
        image={Eva}
      >
        Vedu komunitu Česko.Digital, zajišťuji její rozvoj a směřování. Mimo
        komunitu mě nejčastěji potkáte v roli CEO nebo ředitelka.{" "}
        <a href="https://cesko-digital.atlassian.net/wiki/spaces/CD/pages/834568254/Moje+AHA+momenty">
          Moje AHA momenty
        </a>
        .
      </MemberCard>
      <MemberCard
        name="Jan Kotara"
        title="Chief Operations Officer"
        image={Yen}
      >
        Ve své roli umožňuji ostatním se maximálně soustředit na jejich úkoly a
        maximalizovat produktivitu, a to podílením se na usnadnění chodu a
        procesů organizace.
      </MemberCard>
      <MemberCard
        name="Tereza Gagnon"
        title="Head of Partnership & Fundraising"
        image={Terka}
      >
        Zodpovídám za fundraising a péči o dárce a partnery Česko.Digital, aby
        se báze našich podporovatelů rozšiřovala a pomohla tak dosahovat našich
        cílů.
      </MemberCard>
      <MemberCard
        name="Romana Pokorná"
        title="Program & Project Lead"
        image={Romana}
      >
        Zodpovídám za rozvoj akcelerátoru pro neziskové organizace. Pracuji na
        vylepšování projektové metodiky. Organizuji na daná témata setkání a
        školení pro dobrovolníky i zástupce veřejné sféry.
      </MemberCard>
      <MemberCard
        name="Anežka Müller"
        title="Event & Community Lead"
        image={Anezka}
      >
        Starám se o vše, co v organizaci souvisí s oblastí akcí (eventů) – tedy
        o eventovou strategii i operativu s tím spojenou. Kromě toho se také
        věnuji péči o komunitu.
      </MemberCard>
      <MemberCard
        name="Jindřich Oukropec"
        title="Brand Product Owner"
        image={Jindra}
      >
        Mám na starosti nadchnout Čechy do expertního dobrovolnictví a také
        směřování značky Česko.Digital. Rovněž zastávám roli Scrum Support
        Mastera na projektech.
      </MemberCard>
      <MemberCard
        name="Terézia Palaščáková"
        title="Content Lead"
        image={Terezia}
      >
        Mám na starosti obsah, který propaguje Česko.Digital i jeho jednotlivé
        projekty. Zároveň vedu a motivuju dobro.obsahový tým a působím jako
        obsahový mentor. Když je potřeba, stanu se na chvíli copywriTerkou.
      </MemberCard>
      <MemberCard
        name="Martina Habová"
        title="Marketing & Communication Lead"
        image={Martina}
      >
        Zodpovídám za zviditelnění a propagaci komunity expertních dobrovolníků,
        jejich aktivit a dopadů. Spolupracuji s marketingovými specialisty.
      </MemberCard>
      <MemberCard
        name="Lukáš Návesník"
        title="Digital & Production Lead"
        image={Lukas}
      >
        Spravuji audiovizuální obsah a vedu dobro.produkční tým a naši
        vzdělávací platformu edu.digital. Tvořím grafiku pro sociální sítě,
        blogové články a vzdělávací materiály. Působím jako spojka mezi
        marketingem & IT.
      </MemberCard>
      <MemberCard name="Tomáš Znamenáček" title="Programmer" image={Zoul}>
        Funguji především jako maintainer webu Česko.Digital a dalších interních
        nástrojů.
      </MemberCard>
      <MemberCard
        name="Gabriela Chladilová"
        title="NGO Program Lead & Jira Specialist"
        image={Gabi}
      >
        Starám se jak o příchozí dobrovolníky, tak o jednotlivce neziskových a
        veřejnosprávních organizací v naší komunitě. Koordinuji také příchozí
        projekty. Mám na starosti data o komunitě.
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
      <h3 className="mb-0">{name}</h3>
      <h3 className="mt-0 font-normal">{title}</h3>
      {children}
    </div>
  </div>
);

export default AboutPage;
