import { Layout } from "components/layout";
import Image, { StaticImageData } from "next/image";
import { communitySize } from "lib/utils";
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
  Jakub,
  Dita,
  Robert,
  Ondrej,
  Michal,
} from "components/about/team";
import {
  Tereza,
  Tomas,
  Radka,
  Jan,
  Katerina,
  Lucia,
  Ondrej as OndrejK,
  RadkaH,
} from "components/about/volunteers";

const AboutPage = () => (
  <Layout crumbs={[{ label: "O nás" }]} head={{ title: "O nás" }}>
    <IntroSection />
    <VolunteerSection />
    <CoreTeamSection />
    <BoardSection />
  </Layout>
);

//
// Intro
//

const IntroSection = () => (
  <section className="max-w-content m-auto py-10 px-5 text-xl">
    <h1 className="text-[44px] font-bold leading-snug mb-10">
      Komunita Česko.Digital
    </h1>
    <p className="max-w-prose">
      Česko.Digital je komunita expertních dobrovolníků z mnoha oborů od IT přes
      projektové řízení až po marketing, kteří ve svém volném čase pomáhají
      státu a neziskovým organizacím, a mění tak Česko k lepšímu. V roce 2019 ji
      založili Jakub Nešetřil, Radka Horáková a Eva Pavlíková. Aktuálně je v
      komunitě přes {communitySize} dobrovolníků a je tak největší civic-tech
      organizací v Evropě. Cílem Česko.Digital je budoucnost, ve které
      technologie slouží lidem, bez ohledu na čas, místo nebo sociální podmínky.
    </p>
  </section>
);

//
// Volunteers
//

const VolunteerSection = () => (
  <section className="max-w-content m-auto py-10 px-5 text-xl">
    <h2 className="mb-12 mt-0">Expertní dobrovolníci</h2>
    <p className="max-w-prose mb-7">
      Ti nejdůležitější, bez kterých by to nešlo. Samotná komunita více než{" "}
      {communitySize} expertních dobrovolníků z mnoha oborů od IT přes
      projektové řízení až po marketing. Jejich role je nenahraditelná – pro
      bono pomáhali nebo pomáhají státu i neziskovým organizacím s digitalizací
      a mění tak Česko k lepšímu. A co na svou zkušenost s Česko.Digital říkají
      někteří z nich?
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
      <VolunteerCard
        image={Tereza}
        text="Prošla jsem spoustou různých kurzů, webinářů a přednášek, tady se ale člověk naučí mnohem víc, daleko rychleji a ještě k tomu zadarmo."
      />
      <VolunteerCard
        image={Tomas}
        text="Potkal jsem nové lidi, mám pocit, že pomáhám smysluplné věci. Mám dobrý pocit, že spolupracuji na projektu, který má celospolečenský dopad."
      />
      <VolunteerCard
        image={Radka}
        text="Česko.Digital se mi líbí celkově – od myšlenky, přes způsob uchopení a realizované projekty, až po lidi, kteří se zapojili. Celé mi to dává smysl a moc tomu fandím."
      />
      <VolunteerCard
        image={Katerina}
        text="Cítím se tu strašně dobře – fungujeme jako tým, všichni jsou ochotní pomoci, konzultovat, diskutovat, dostává se vám konstruktivní kritika. Pokaždé se tak něco nového naučím a opravdu cítím, že se tu posouvám."
      />
      <VolunteerCard
        image={RadkaH}
        text="Spolupráce s Česko.Digital se mi moc líbila. Byl to první krůček k oboru IT."
      />
      <VolunteerCard
        image={Tomas}
        text="Česko.Digital mi umožňuje pomáhat svými znalostmi a zkušenostmi a efektivně tak využít / předat to, co jsem se naučil."
      />
      <VolunteerCard
        image={OndrejK}
        text="Proč Česko.Digital? Nové výzvy a radost z toho, že mohu pomáhat."
      />
      <VolunteerCard
        image={Lucia}
        text="Som hrdá na to, že sme to v jeden slabý moment celé nevzdali a poskladali nakoniec skvelý a vytrvalý tím profíkov, ktorý teraz web Jehlomat.cz doťahuje do zdarného konca."
      />
      <VolunteerCard
        image={Jan}
        text="Baví mě se potkávat s inspirativními lidmi, od kterých mohu čerpat nové zkušenosti a informace a zároveň jsem rád, když jim s něčím mohu pomoci i já."
      />
    </div>
  </section>
);

type Volunteer = {
  image: StaticImageData;
  text: string;
};

const VolunteerCard = ({ image, text }: Volunteer) => (
  <div className="-mx-5 sm:mx-0 sm:rounded-md overflow-clip">
    <Image
      src={image}
      alt={text}
      layout="responsive"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  </div>
);

//
// Core Team
//

const CoreTeamSection = () => (
  <section className="max-w-content m-auto py-10 px-5 text-xl">
    <h2 className="mb-12 mt-0">Kmenový tým</h2>
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
      <PersonCard
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
      </PersonCard>
      <PersonCard
        name="Jan Kotara"
        title="Chief Operations Officer"
        image={Yen}
      >
        Ve své roli umožňuji ostatním se maximálně soustředit na jejich úkoly a
        maximalizovat produktivitu, a to podílením se na usnadnění chodu a
        procesů organizace.
      </PersonCard>
      <PersonCard
        name="Tereza Gagnon"
        title="Head of Partnership & Fundraising"
        image={Terka}
      >
        Zodpovídám za fundraising a péči o dárce a partnery Česko.Digital, aby
        se báze našich podporovatelů rozšiřovala a pomohla tak dosahovat našich
        cílů.
      </PersonCard>
      <PersonCard
        name="Romana Pokorná"
        title="Program & Project Lead"
        image={Romana}
      >
        Zodpovídám za rozvoj akcelerátoru pro neziskové organizace. Pracuji na
        vylepšování projektové metodiky. Organizuji na daná témata setkání a
        školení pro dobrovolníky i zástupce veřejné sféry.
      </PersonCard>
      <PersonCard
        name="Anežka Müller"
        title="Event & Community Lead"
        image={Anezka}
      >
        Starám se o vše, co v organizaci souvisí s oblastí akcí (eventů) – tedy
        o eventovou strategii i operativu s tím spojenou. Kromě toho se také
        věnuji péči o komunitu.
      </PersonCard>
      <PersonCard
        name="Jindřich Oukropec"
        title="Brand Product Owner"
        image={Jindra}
      >
        Mám na starosti nadchnout Čechy do expertního dobrovolnictví a také
        směřování značky Česko.Digital. Rovněž zastávám roli Scrum Support
        Mastera na projektech.
      </PersonCard>
      <PersonCard
        name="Terézia Palaščáková"
        title="Content Lead"
        image={Terezia}
      >
        Mám na starosti obsah, který propaguje Česko.Digital i jeho jednotlivé
        projekty. Zároveň vedu a motivuju dobro.obsahový tým a působím jako
        obsahový mentor. Když je potřeba, stanu se na chvíli copywriTerkou.
      </PersonCard>
      <PersonCard
        name="Martina Habová"
        title="Marketing & Communication Lead"
        image={Martina}
      >
        Zodpovídám za zviditelnění a propagaci komunity expertních dobrovolníků,
        jejich aktivit a dopadů. Spolupracuji s marketingovými specialisty.
      </PersonCard>
      <PersonCard
        name="Lukáš Návesník"
        title="Digital & Production Lead"
        image={Lukas}
      >
        Spravuji audiovizuální obsah a vedu dobro.produkční tým a naši
        vzdělávací platformu edu.digital. Tvořím grafiku pro sociální sítě,
        blogové články a vzdělávací materiály. Působím jako spojka mezi
        marketingem & IT.
      </PersonCard>
      <PersonCard name="Tomáš Znamenáček" title="Programmer" image={Zoul}>
        Starám se o programování webu Česko.Digital a obecně údržbu a rozvoj
        interních nástrojů.
      </PersonCard>
      <PersonCard
        name="Gabriela Chladilová"
        title="Data Specialist"
        image={Gabi}
      >
        Starám se jak o příchozí dobrovolníky, tak o jednotlivce neziskových a
        veřejnosprávních organizací v naší komunitě. Mám na starosti data o
        komunitě.
      </PersonCard>
    </div>
  </section>
);

//
// Board
//

const BoardSection = () => (
  <section className="max-w-content m-auto py-10 px-5 text-xl mb-20">
    <h2 className="mb-12 mt-0">Správní rada</h2>
    <p className="max-w-prose mb-7">
      Správní rada se skládá ze zkušených expertů s různými kompetencemi. Pomáhá
      se směřováním organizace a šíří její dobré jméno. Zároveň je podporou pro
      CEO, konzultuje a přináší návrhy řešení pro důležité milníky organizace a
      zajišťuje dodržování legislativy a pravidel. Průběžně konzultuje a setkává
      se každé 3–4 měsíce.
    </p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
      <PersonCard
        name="Jakub Nešetřil"
        title="Startup Founder, Non-Profit Founder, Tech Geek"
        image={Jakub}
      />
      <PersonCard
        name="Dita Formánková"
        title="Director & Founder Czechitas, Director Diversity & Inclusion and Communities / Gen"
        image={Dita}
      />
      <PersonCard
        name="Robert Basch"
        title="Corporate Social Responsibility, Manager / Livesport"
        image={Robert}
      />
      <PersonCard
        name="Michal Bláha"
        title="Director & Founder / Hlídač státu"
        image={Michal}
      />
      <PersonCard
        name="Ondřej Zapletal"
        title="Collaborative Philanthropy and Nonprofit Strategist"
        image={Ondrej}
      />
    </div>
  </section>
);

//
// Shared
//

type Person = {
  name: string;
  title: string;
  image: StaticImageData;
  children?: React.ReactNode;
};

const PersonCard = ({ name, title, image, children }: Person) => (
  <div className="sm:border-2 border-pebble sm:rounded-lg overflow-clip -mx-5 sm:mx-0">
    <Image
      src={image}
      alt=""
      placeholder="blur"
      layout="responsive"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
    <div className="px-4 pb-4">
      <h3 className="mb-0">{name}</h3>
      <h3 className="mt-0 font-normal">{title}</h3>
      {children}
    </div>
  </div>
);

export default AboutPage;
