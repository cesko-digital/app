import { ButtonLink } from "components/links";
import { communitySize } from "lib/utils";
import Image, { StaticImageData } from "next/image";
import { Fragment, ReactNode } from "react";
import Balancer from "react-wrap-balancer";
import PartnerLogos from "./logos";
import People from "./people";
import Photos from "./photos";
import ProjectLogos from "./projects";
import { CzechiaMapBitmap } from "components/illustrations";
import Illustrations from "./misc";

const CasePage = () => (
  <Fragment>
    <Intro />
    <Challenges />
    <AboutCeskoDigital />
    <SystemicChangeExplainer />
    <SystemicChangePlan />
    <PledgeSection />
    <FooterSection />
  </Fragment>
);

const Intro = () => (
  <Slide>
    <Image
      src={CzechiaMapBitmap}
      width={753}
      height={416}
      className="opacity-10 grayscale absolute -right-[200px] -top-[20px]"
      alt=""
    />
    <h1 className="text-[44px] font-bold leading-snug mb-[140px]">
      Změňme spolu Česko k lepšímu
    </h1>
    <div className="max-w-prose font-semibold leading-relaxed pb-10">
      <Perex>
        Technologiím se v Česku daří. Máme kvalitní technické univerzity,
        vznikly u nás velmi úspěšné technologické firmy známé po celém světě –
        Avast, Seznam nebo Satoshi Labs. A přesto jsme svědky těchto případů…
      </Perex>
    </div>
  </Slide>
);

const Challenges = () => (
  <Fragment>
    <ImageQuoteSlide image={Photos.pracak}>
      Lidé v nouzi sice mohou získat podporu, ale neví jak. Čekají měsíce, úřady
      s nimi vůbec nekomunikuji. Nemají často ani na jídlo.
    </ImageQuoteSlide>
    <TwoColumnSlide>
      <div>
        <p className="mt-0">
          Čtyřicátník v kapuci vysvětluje, že na úřad práce přišel v září, kdy
          mu doporučili, aby si o příspěvek na bydlení zažádal online. A od té
          doby čeká. „Plyn a energie mi od ledna stouply o dva a půl tisíce
          korun. Nově mám platit šest a půl tisíce,“ říká muž, a raději se proto
          rozhodl hned po Novém roce vydat na úřad, aby se zeptal, co se s jeho
          žádostí děje.
        </p>
        <p>
          Samoživitelka Zuzana vysvětluje, že se k ní dostala pouze informace,
          že její žádost o dávku zpracovává „metodik“. Nerozumí ale tomu, jestli
          je potřeba něco doložit, nebo je dávka schválená, případně kdy bude
          vyplacená.
        </p>
      </div>
      <TextQuote
        quote="Online žádost jsem zkoušela a nikdo se mi neozval."
        author="Zuzana P. pro Seznam Zprávy (leden 2023)"
        source="https://www.seznamzpravy.cz/clanek/domaci-zivot-v-cesku-ve-fronte-pred-uradem-prace-na-prispevek-cekaji-mesice-a-urednici-nekomunikuji-222350"
      />
    </TwoColumnSlide>

    <ImageQuoteSlide image={Photos.psychiatrie}>
      Katastrofální stav dětské psychiatrie má zlepšit telemedicína. Psychiatrům
      je ale v průmětu 64 let.
    </ImageQuoteSlide>
    <TwoColumnSlide>
      <p className="mt-0">
        „Nejbližší termín za 5 měsíců,“ tak často vypadá odpověď rodičům, kteří
        akutně shání dětskou psychiatrickou pomoc. Nedávné objevy v telemedicíně
        by mohly díky digitálním technologiím vyřešit dlouholetý problém českého
        zdravotnictví. Jenže drtivá většina našich dětských psychiatrů patři
        mezi seniory, kteří s technologiemi neumí, nerozumí jim nebo se jich
        dokonce bojí.
      </p>
      <TextQuote
        quote="I kdyby byli psychiatři mladší a digitálně gramotní, zavádění telemedicíny provází řada zmatků a budeme si na ni muset ještě dlouho počkat."
        author="Zdravotnický deník, 2023"
        source="https://www.zdravotnickydenik.cz/2023/01/novela-zakona-o-zdravotnich-sluzbach-pod-palbou-kritiky-mzd-obdrzelo-zasadni-pripominky-k-uprave-telemediciny-i-vedeni-elektronicke-dokumentace/"
      />
    </TwoColumnSlide>

    <ImageQuoteSlide image={Photos.graf}>
      495 milionů korun šlo během pandemie na informační podporu, která podle
      analýzy nebyla využita. Vytvořené řešení se už nepoužije.
    </ImageQuoteSlide>
    <TwoColumnSlide>
      <div>
        <p className="mt-0">
          NKÚ také upozorňuje, že Ministerstvo zdravotnictví (MZd) nezapracovalo
          nově vytvořenou informační podporu do Pandemického plánu ČR ani do
          informační koncepce MZd. Existuje tak reálná možnost, že navzdory
          vynaloženým penězům nebude systém služeb Chytrá karanténa využíván při
          budoucích epidemiích.
        </p>
        <p>
          „Teď se musíme zaměřit na to, aby vynaložené peníze nepřišly vniveč a
          aby se s vytvořenou infrastrukturou dál pracovalo. Bylo by velkou
          chybou, kdyby se stát za čas dostal do podobné situace jako teď a my
          bychom zjistili, že věci opět nejsou připravené a jsme znovu na
          začátku,“ řekl prezident NKÚ Miloslav Kala.
        </p>
      </div>
      <TextQuote
        quote="387 milionů korun stál systém chytré karantény, která nefungovala."
        author="Výroční zpráva Nejvyššího kontrolního úřadu, 2022"
        source="https://www.nku.cz/assets/publikace-a-dokumenty/vyrocni-zprava/vyrocni-zprava-nku-2022.pdf"
      />
    </TwoColumnSlide>

    <hr className="mb-20" />

    <TwoColumnSlide>
      <div className="mb-20 max-md:order-2">
        <H2>
          Brzdí nás to všechny. Od jednotlivce přes firmy až po celý stát.
        </H2>
        <p>
          Zastarávání v oblasti digitálních technologií má negativní vliv na
          celou společnost. Zvyšující se digitální propast způsobuje sociální
          problémy, snižuje konkurenceschopnost firem, brzdí pokrok státního
          aparátu.
        </p>
        <p>
          Nesrozumitelnost procesů ve veřejné sféře a nevyužití digitálních
          technologií <Em>zpomaluje celou společnost</Em>.
        </p>
        <p>
          <Em>Pokud s tím něco neuděláme, budeme dál zaostávat.</Em>
        </p>
      </div>
      <div className="relative">
        <div className="md:absolute md:w-[768px] md:h-[416px]">
          <Image src={CzechiaMapBitmap} alt="" />
        </div>
      </div>
    </TwoColumnSlide>
  </Fragment>
);

const AboutCeskoDigital = () => {
  const ProjectCard = ({
    name,
    image,
    children,
  }: {
    name: string;
    image: StaticImageData;
    children: ReactNode;
  }) => (
    <div className="max-md:max-w-[40ex] max-md:m-auto max-md:text-center">
      <div className="mb-7">
        <Image
          src={image}
          className="max-md:m-auto"
          width={100}
          height={100}
          alt=""
        />
      </div>
      <H4>{name}</H4>
      {children}
    </div>
  );

  return (
    <Fragment>
      <ImageHeaderSlide image={Photos.meetup}>
        <H2>Skrz 1 a 0 měníme Česko k lepšímu</H2>
        <Perex>
          Říkali nám, že jsme naivní. My ale už roky dokazujeme, že změna je
          možná. Trpělivě krok po kroku učíme neziskové organizace a státní
          správu, jak využívat digitální technologie.
        </Perex>
        <p>
          Jádrem komunity je {communitySize}+ expertních dobrovolníků a
          dobrovolnic. Ti do komunity přináší to nejcennější – svůj čas a také
          svou expertízu, typicky v oblastech softwarového vývoje, produktového
          designu nebo projektového řízení. Díky jejich propojení v komunitě
          vznikají veřejně prospěšná řešení v podobě open source digitálních
          produktů.
        </p>
      </ImageHeaderSlide>

      <section className="bg-pebble py-20 mb-20">
        <div className="max-w-content m-auto px-5 text-xl">
          <div className="text-center mb-20">
            <H3>
              V pandemii i na začátku války Česko.Digital pomohlo v těch
              největších krizích
            </H3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-7">
            <ProjectCard name="Covid portál" image={ProjectLogos.CovidPortal}>
              <p>
                Informace o vládních opatřeních v pandemii přehledně na jednom
                místě pro občany Česka.
              </p>
              <p className="font-bold">
                Dopad: 250 000+ lidí navštívilo portál prvních 48 hodin jeho
                provozu
              </p>
            </ProjectCard>
            <ProjectCard
              name="Stojíme za Ukrajinou"
              image={ProjectLogos.StojimeZaUkrajinou}
            >
              <p>
                Informační rozcestník, který vznikl takřka přes víkend, nabídl
                desítky návodů, jak pomoc nabídnout či získat.
              </p>
              <p className="font-bold">
                Dopad: téměř 800 000 lidí navštívilo rozcestník do 3 dnů od
                vypuknutí války
              </p>
            </ProjectCard>
            <ProjectCard name="Dáme roušky" image={ProjectLogos.DameRousky}>
              <p>
                Komunitní mapa roušek, která v kritický moment pandemie covid-19
                umožnila získat klíčovou ochrannou pomůcku.
              </p>
              <p className="font-bold">
                Dopad: 600 000+ roušek se předalo díky online komunitní mapě
              </p>
            </ProjectCard>
            <ProjectCard name="Movapp" image={ProjectLogos.Movapp}>
              <p>
                Do 3 dnů od vypuknutí války nabídla aplikace řešení, jak
                usnadnit komunikaci mezi Čechy a Ukrajinci.
              </p>
              <p className="font-bold">
                Dopad: 12 000+ uživatelů si už stáhlo aplikaci do mobilu
              </p>
            </ProjectCard>
          </div>
        </div>
      </section>

      <Slide>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-7 text-center">
          <div>
            <H3>20+ digitálních řešení</H3>
            <p className="text-base">vytvořených v komunitě</p>
          </div>
          <div>
            <H3>{communitySize}+ dobrovolníků</H3>
            <p className="text-base">registrovaných v komunitě</p>
          </div>
          <div>
            <H3>252 000+ hodin</H3>
            <p className="text-base">dobrovolnické práce</p>
          </div>
          <div>
            <H3>4 000 000+ lidí</H3>
            <p className="text-base">oslovila naše digitální řešení</p>
          </div>
        </div>
      </Slide>

      <hr className="mb-20" />

      <Slide>
        <div className="text-center mb-20">
          <H2>
            Na začátku nadšenci do technologií. Po 4 letech respektovaným
            partnerem pro úředníky i politiky.
          </H2>
        </div>
        <Image src={Photos.panel} alt="" className="mb-20" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          <div>
            <H4>
              Jsme zástupci občanské společnosti v Radě vlády pro informační
              společnost (RVIS)
            </H4>
            <p>
              Rada je stálý řídicí, poradní, iniciační a koordinační orgán vlády
              Česka pro rozvoj digitálních služeb ve veřejné správě, jsme
              součástí předsednictva jako jediní zástupci akademické sféry a
              občanské společnosti.
            </p>
          </div>
          <div>
            <H4>
              Spojili jsme neziskovky se zájmem na digitalizaci státu v jeden
              hlas – platforma Společně a digitálně
            </H4>
            <p>
              Platforma{" "}
              <a href="https://spolecneadigitalne.cz" className="text-black">
                Společně a digitálně
              </a>{" "}
              je společnou iniciativou deseti nevládních neziskových organizací,
              které se dlouhodobě věnují digitální transformaci státu.
              Propojujeme klíčové aktéry, formulujeme doporučení, diskutujeme s
              politiky i veřejností.
            </p>
          </div>
          <div>
            <H4>
              Pomáhali jsme se vznikem Digitální informační agentury (DIA)
            </H4>
            <p>
              V Česku jsme po vzoru Velké Británie a Dánska pomohli prosadit
              vznik{" "}
              <a href="https://www.dia.gov.cz" className="text-black">
                Digitální a informační agentury
              </a>
              , která systematicky naplňuje potřeby pro digitalizaci a využívání
              technologií ve veřejné správě a bude ji dále svědomitě rozvíjet ve
              prospěch občanů Česka.
            </p>
          </div>
        </div>
      </Slide>
    </Fragment>
  );
};

const SystemicChangeExplainer = () => {
  const BlueHeading = ({ children }: { children: ReactNode }) => (
    <p className="text-it text-5xl font-bold mt-0 -mb-4">{children}</p>
  );

  const ProblemStatement = ({
    number,
    text,
  }: {
    number: string;
    text: string;
  }) => (
    <p className="text-2xl font-bold">
      <span className="text-it mr-4">{number}</span> {text}
    </p>
  );

  return (
    <Fragment>
      <ImageHeaderSlide image={Photos.pracak2}>
        <H2>
          Dílčí projekty nestačí. Pokud chceme problém skutečně vyřešit, musíme
          na to jít systémově
        </H2>
        <Perex>
          Díky 4 letům práce na individuálních projektech jsme si uvědomili, že
          za veřejnou sféru touto cestou většinou jen „hasíme požáry“. Nechceme,
          aby takto hodnotné iniciativy vznikaly pouze z dobré vůle lidí, kteří
          na nich pracují po večerech a víkendech. Chceme, aby s nimi veřejná
          sféra dokázala přicházet sama, strategicky, a práce dobrovolníků
          nebyla tolik potřebná.
        </Perex>
        <p>
          Povedlo se nám vytvořit unikátní propojení expertů z firem, státní
          správy a neziskových organizací, díky čemuž máme komplexní pohled na
          to, jak systém veřejné správy funguje. Máme za sebou stovky hodin
          rozhovorů s různými organizacemi o tom, jaké jsou hlavní bariéry při
          využití digitálních technologií. To vše nás přivedlo k definici
          problému:
        </p>
      </ImageHeaderSlide>

      <div className="bg-it">
        <Slide>
          <div className="text-white leading-relaxed text-center relative">
            <div className="w-full absolute top text-center">
              <p className="bg-black m-0 px-10 py-2 inline-block text-base uppercase tracking-widest">
                Problém
              </p>
            </div>
            <div className="p-5 py-20 md:p-20 flex flex-col gap-10">
              <H2>
                Veřejná sféra* neumí využívat potenciál technologií k řešení
                celospolečenských problémů a zhoršuje tak podmínky pro život
                lidí v České republice.
              </H2>
              <p>
                <Balancer>
                  *Veřejnou sférou máme na mysli všechny aktéry české
                  společnosti, kteří tímto problémem trpí: státní správa a
                  samospráva, neziskové organizace, univerzity a média.
                </Balancer>
              </p>
            </div>
          </div>
        </Slide>
      </div>

      <Slide>
        <div className="text-center">
          <H2>Neděje se to jen tak. Známe všechny bariéry.</H2>
          <p>
            <Balancer>
              Z dlouhodobé zkušenosti, z dat a průzkumů z Česka i zahraničí jsme
              identifikovali 4 hlavní bariéry veřejné sféry: chybí sdílená vize,
              informace, kompetence a finance.
            </Balancer>
          </p>
        </div>
        <hr className="my-20" />
      </Slide>

      <TwoColumnSlide>
        <div>
          <BlueHeading>01</BlueHeading>
          <H2>Chybí sdílená vize</H2>
          <p>
            Sdílená vize znamená, že lidé ve veřejné správě i mimo ni mají
            společnou představu o tom, kam společně směřují a čeho chtějí
            dosáhnout. Je to jako mapa, která ukazuje, kudy chceme jít a jaké
            jsou cíle naší cesty. Pokud máme jasnou sdílenou vizi, víme, co máme
            dělat a proč to děláme, což nás motivuje a inspiruje.
          </p>
          <p>
            Chybějící sdílená vize potom vede k nedorozuměním, neshodám a
            rozdílným zájmům, což zpomaluje nebo dokonce zastavuje řešení. Také
            často vede k neefektivnímu využití peněz a času, protože organizace
            nemusí být jasně informována o tom, co se od ní očekává. A konečně
            nedostatek sdílené vize ovlivňuje také motivaci lidí a organizací,
            kteří nemají jasnou představu o tom, jaký je smysl a cíl jejich
            práce.
          </p>
          <p>
            <a
              href="https://drive.google.com/file/d/1BLLChViCvNAS0Q9Kptz6Fi5pdUyJCUOM/edit"
              className="text-black"
            >
              Náš průzkum
            </a>{" "}
            potvrdil hypotézu, že v Česku chybí sdílená vize, jak využívat
            digitální technologie ve veřejné správě. Bez jasně definovaného a
            sdíleného směřování, například ve formě vize, se jen těžko něco
            změní.
          </p>
        </div>
        <div>
          <Image src={People.Oliver} alt="" className="mb-7" />
          <TextQuote
            quote="Abychom dosáhli našich ambicí, vláda musí mít společnou vizi, která vychází z potřeb našich uživatelů. To znamená, že je potřeba prolomit resortismus a přemýšlet o službách z pohledu lidí, kteří je využívají."
            author="Oliver Dowden, Ministr pro implementaci, Spojené království"
          />
        </div>
      </TwoColumnSlide>

      <Slide>
        <hr />
      </Slide>

      <TwoColumnSlide>
        <div>
          <BlueHeading>02</BlueHeading>
          <H2>Chybí informace</H2>
          <p>
            Mít všechny potřebné informace znamená mít jednoduše dostupná a
            relevantní data, znalosti k interpretaci dat a jejich praktickému
            použití. Dostupnými daty myslíme výstupy z výzkumů, srozumitelné
            analýzy dat a příklady dobré praxe z Česka i zahraničí, které
            pomohou v informovaném rozhodování. Všechny potřebné informace musí
            být jednoduše dostupné a otevřené všem bez omezení.
          </p>
          <p>
            Bez přístupu k aktuálním informacím o nových technologiích a jejich
            potenciálních přínosech si lidé – ať už úředníci, politici nebo
            občané – často ani neuvědomují možnosti, které existují. To je potom
            promarněná příležitost ke zlepšení efektivity, snížení nákladů a
            poskytování lepších služeb všem.
          </p>
          <p>
            Když organizace veřejné sféry postrádají informace o potenciálu
            technologií, neumí adekvátně plánovat jejich praktické nasazení a
            používání. To vede k problémům, jako jsou nedostatečné školení,
            nedostatečné zdroje a špatná integrace se stávajícími systémy – ve
            výsledku jde o další špatnou zkušenost s technologií a další odpor
            ke změně.
          </p>
        </div>
        <div>
          <Image src={People.Mariana} alt="" className="mb-7" />
          <TextQuote
            quote="Ve světě, kde ve znalostech spočívá síla, může být nedostatek informací překážkou pokroku, růstu i rozvoje."
            author="Mariana Mazzucato, Profesorka ekonomie na University College London"
          />
        </div>
      </TwoColumnSlide>

      <Slide>
        <hr />
      </Slide>

      <TwoColumnSlide>
        <div>
          <BlueHeading>03</BlueHeading>
          <H2>Chybí kompetence</H2>
          <p>
            V kontextu technologií ve veřejném sektoru se kompetencemi rozumí
            znalosti, dovednosti a schopnosti, které jsou pro lidi nezbytné k
            efektivnímu využívání a řízení technologií při jejich práci. To
            zahrnuje řadu kompetencí, jako jsou technické dovednosti související
            s hardwarem a softwarem, stejně jako širší dovednosti související se
            strategickým uvažováním, analýzou dat, řízením projektů, komunikací.
          </p>
          <p>
            Pokud lidem ve veřejném sektoru chybí potřebné kompetence k
            efektivnímu využívání nových technologií, negativně to ovlivňuje
            jejich úspěšnou implementaci a praktické využití. To v důsledku vede
            k rezistenci a neschopnosti adaptovat se na změnu nebo zavádění
            nových nástrojů, což brání pokroku a inovaci celého veřejného
            sektoru.
          </p>
          <p>
            Chybějící kompetence, respektive jejich nedostatky, ukazuje
            každoroční evropský index DESI (Digital Economy and Society Index),
            kde se Česko v roce 2022 mezi 27 členskými státy Evropské Unie řadí
            pod průměr na 19. místo v oblasti integrace digitálních technologií.
            Ve srovnání s rokem 2021 jsme si navíc pohoršili o čtyři příčky.
          </p>
          <p>
            Digitálním kompetencím se věnuje také průzkum Českého statistického
            úřadu, který ovšem u úředníků vyhodnocuje jen základní dovednosti
            jako práce s tabulkovým nebo textovým editorem, a námi zmíněné
            kompetence nesleduje vůbec.
          </p>
        </div>
        <div>
          <Image src={People.Martha} alt="" className="mb-7" />
          <TextQuote
            quote="Digitální dovednosti nejsou jen o nástrojích, jsou o lidech. Digitální technologie spolu se správnou kombinací dovedností a schopností mají moc změnit způsob poskytování veřejných služeb."
            author="Martha Lane Fox, Nezávislá členka Sněmovny lordů, kancléřka Open University a členka představenstva společnosti Twitter"
          />
        </div>
      </TwoColumnSlide>

      <Slide>
        <hr />
      </Slide>

      <TwoColumnSlide>
        <div>
          <BlueHeading>04</BlueHeading>
          <H2>Chybí finance</H2>
          <p>
            Tato příčina úzce souvisí s předcházející – veřejná sféra typicky
            není schopna přilákat špičkové talenty, mimo jiné kvůli neschopnosti
            konkurovat odměnám v komerčním sektoru. Z průzkumu „Stav IT v českém
            nezisku“ z roku 2021 provedeného Techsoup ČR a Nadací OSF vyplývá,
            že 62 % středně velkých neziskových organizací uvádí jako hlavní
            překážku svého rozvoje právě nedostatek finančních prostředků.
          </p>
          <p>
            Zrychlená digitalizace by mohla České republice přinést růst
            produktivity vyšší až o 70 %, konstatuje poradenská společnost
            McKinsey ve své analýze Vzestup digitálních vyzyvatelů, Perspektiva
            ČR. Podle této zprávy může zrychlení digitalizace do roku 2025
            přinést až 26 miliard EUR dodatečného hrubého domácího produktu
            (HDP), což znamená navýšení roční míry růstu HDP o téměř jeden
            procentní bod.
          </p>
        </div>
        <div>
          <Image src={People.Steve} alt="" className="mb-7" />
          <TextQuote
            quote="Neinvestovat do technologií je ve výsledku často nákladnější než do nich investovat."
            author="Steve VanRoekel, Bývalý hlavní informační ředitel USA"
          />
        </div>
      </TwoColumnSlide>

      <Slide>
        <hr className="pb-20" />
      </Slide>

      <TwoColumnSlide>
        <div>
          <H2>
            Zaostáváme každým dnem, a to na několika frontách. Pokud nezměníme
            směr, kterým se technologie ubírají, bude se situace dále zhoršovat.
          </H2>
          <p>
            Bariéry, kvůli kterým Česko zaostává v efektivním používání
            technologií, jako chybějící vize, kompetence, informace a finance,
            jsou ze své podstaty velmi komplexní. Můžeme se pokoušet o jejich
            dílčí řešení a v oblasti kompetencí toho už mnoho děláme – ať jsou
            to digitální řešení s nevládními organizacemi nebo systematické
            vzdělávání skrz hackdays nebo webináře. Pokud však chceme být v
            řešení opravdu úspěšní, potřebujeme jednotlivé bariéry řešit
            propojeně a systematicky tak, aby proměna veřejné sféry byla trvalá
            a přežila více volebních období. Po důkladné rešerši a čtyřleté
            přímé práci i spolupráci s klíčovými aktéry na poli českých
            digitálních technologií věříme tomu, že je správný čas na systémovou
            změnu.
          </p>
        </div>
        <div className="bg-pebble p-10 flex flex-col gap-5 relative">
          <ProblemStatement number="01" text="Chybí sdílená vize" />
          <ProblemStatement number="02" text="Chybí informace" />
          <ProblemStatement number="03" text="Chybí kompetence" />
          <ProblemStatement number="04" text="Chybí finance" />
          <Image
            src={Illustrations.circle}
            width={189}
            height={189}
            className="absolute -top-[60px] -right-[95px]"
            alt=""
          />
        </div>
      </TwoColumnSlide>
    </Fragment>
  );
};

const SystemicChangePlan = () => {
  const IllustratedPoint = ({
    image,
    children,
  }: {
    image: StaticImageData;
    children: ReactNode;
  }) => (
    <div className="flex max-md:flex-col gap-10">
      <div className="w-[112px] flex-none">
        <Image src={image} className="object-fit" alt="" />
      </div>
      <div className="max-w-prose -mt-5">{children}</div>
    </div>
  );

  return (
    <Fragment>
      <ImageHeaderSlide image={Photos.hackday}>
        <H2>Řešíme to systémově. Máme konkrétní plán, jak na to.</H2>
        <Perex>
          Víme, že žádný systém není možné změnit jednostranně – musíme
          koordinovaně sjednotit dosavadní, často individuální snažení a
          aktivity jednotlivých hráčů v systému tak, aby kýžená změna byla
          dlouhodobě udržitelná.
        </Perex>
      </ImageHeaderSlide>

      <section className="bg-pebble mb-20 pt-20 pb-1">
        <TwoColumnSlide>
          <div>
            <H2>Náš plán na období 2024–2027</H2>
            <p>
              Strategicky se zaměříme na 3 největší příčiny problému. Propojíme
              klíčové aktéry a podpoříme vznik společné vize, která odolá
              politickým změnám. Zpopularizujeme konkrétní příklady úspěšných
              digitálních řešení z Česka i ze zahraničí a vysvětlíme jejich
              přínos. Dodáme potřebné kompetence k efektivnímu využití
              digitálních technologií.
            </p>
            <p>
              Jednotlivé aktivity na sebe navazují a propojují jak komunitu, tak
              i organizace a jednotlivce, kteří mají zásadní vliv na budoucí
              vývoj digitálních technologií v Česku.
            </p>
          </div>
          <a
            className="aspect-square bg-white hover:bg-yellow relative flex flex-col overflow-clip p-10 no-underline text-black"
            href="https://drive.google.com/file/d/1-RLMuLgPK7UAhPwdZiBgcnCtnZ8Jy7oT/view?usp=share_link"
          >
            <Image
              src={CzechiaMapBitmap}
              className="absolute top-20 -right-[200px] opacity-60"
              alt=""
            />
            <h2 className="text-it leading-normal mt-0">
              Mapa
              <br />
              systémové
              <br />
              změny
            </h2>
            <p className="mt-auto mb-0">
              Klíčové aktivity a milníky jsme zanesli do mapy. Prohlédněte si ji
              v PDF →
            </p>
          </a>
        </TwoColumnSlide>
      </section>

      <Slide>
        <IllustratedPoint image={Illustrations.sparks}>
          <H3>Nadchneme je do společné vize</H3>
          <p>
            Zaměříme se na klíčové aktéry české společnosti, kteří mají zásadní
            vliv na rozvoj digitálních technologií v Česku. Vysvětlíme jim
            přínos sdílené vize, která nastaví jasné směřování a umožní dělat
            strategicky správná rozhodnutí. Nastolíme společnou debatu klíčových
            aktérů, která vyústí ve sdílenou vizi, ke které se aktéři formálně
            zaváží, například formou memoranda.
          </p>
          <p>
            <Em>
              Náš nejbližší milník: začátek roku 2024. Klíčoví aktéři v systému
              se shodnou na sdílené vizi využívání technologií ve veřejné sféře
              formou manifestu.
            </Em>
          </p>
        </IllustratedPoint>
      </Slide>
      <Slide>
        <IllustratedPoint image={Illustrations.bubbles}>
          <H3>Inspirujeme je a dodáme potřebné informace</H3>
          <p>
            Poukážeme na dobré příklady praxe digitálních technologií ve veřejné
            sféře, které měly úctyhodný přínos. Zajistíme, že politické strany s
            potenciálem aspoň 5 % v parlamentních volbách budou mít ve svých
            programech digitální technologie. Spustíme osvětovou kampaň
            zaměřenou na zlepšení postojů lidí k technologiím.
          </p>
          <p>
            <Em>
              Náš nejbližší milník: květen 2025. Digitální technologie jsou
              nedílnou součástí navrhovaných řešení problémů všech politických
              stran s potenciálem 5 % v parlamentních volbách v roce 2025.
            </Em>
          </p>
        </IllustratedPoint>
      </Slide>
      <Slide>
        <IllustratedPoint image={Illustrations.notepad}>
          <H3>Naučíme je to</H3>
          <p>
            Díky kombinaci podpůrných aktivit, jako jsou školicí programy pro
            nevládní organizace, poskytování pomoci digitálním projektům nebo
            školení vlastníků produktů ve veřejném sektoru, dosáhneme větší
            připravenosti veřejné sféry maximálně využívat digitálních
            technologií.
          </p>
          <p>
            <Em>
              Náš nejbližší milník: září 2023. Otevíráme tréninkové programy na
              navyšování kompetencí pro veřejnou sféru.
            </Em>
          </p>
        </IllustratedPoint>
      </Slide>
    </Fragment>
  );
};

const PledgeSection = () => {
  const BulletSection = ({ children }: { children: ReactNode }) => (
    <div className="flex flex-row gap-5">
      <div>→</div>
      <div className="-mt-7">{children}</div>
    </div>
  );

  return (
    <Fragment>
      <ImageHeaderSlide image={Photos.nezisk}>
        <H2>Máme dobře našlápnuto. Pomozte nám to dotáhnout.</H2>
        <p>Žádaná podpora: 25 milionů Kč na rok v období 2024–2027.</p>
        <p>
          Nežádáme peníze na provoz, ale na vyřešení problému. Jakmile ho
          vyřešíme, činnost zaměříme jinam nebo ji ukončíme.
        </p>
        <p>
          80 % financí jde na kmenový tým, ve kterém potřebujeme kvalitní
          odborníky s kompetitivní odměnou ke komerčnímu prostředí.
        </p>
        <p>
          Už víme, že pomalejší změnu lze realizovat také dobrovolnicky. Ale s
          financemi, například investicemi do vývoje, v kombinaci s komunitou,
          výrazně akcelerujeme současné aktivity a podstatnou část problému
          vyřešíme do 4 let.
        </p>
      </ImageHeaderSlide>

      <Slide>
        <div className="grid md:grid-cols-3">
          <Image src={Illustrations.pie} className="md:col-start-2" alt="" />
        </div>
      </Slide>

      <section className="bg-pebble mb-20 pt-20 pb-1">
        <Slide>
          <div className="text-center mb-20">
            <H2>Vaše podpora nám konkrétně pomůže</H2>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            <BulletSection>
              <H3>Poskytnout školení a podporu</H3>
              <p>
                Díky vám budeme moci poskytnout expertizu a know-how tam, kde je
                nejvíc potřeba – projektům a organizacím řešícím palčivé
                společenské problémy. Pomocí školicích programů a strategické
                podpory pomůžeme rozvinout dovednosti a odborné znalosti
                potřebné k efektivnímu využití technologií ke zlepšení jejich
                služeb.
              </p>
            </BulletSection>
            <BulletSection>
              <H3>Rozvíjet expertní infrastrukturu</H3>
              <p>
                Úspěch Česko.Digital by nebyl možný bez komunity expertů, kteří
                se snadno propojují s veřejným sektorem. Právě rozvoj komunity,
                která propojuje světy, které se potřebují, ale často si
                nerozumí, bude jeden z klíčových pilířů vynaložené investice.
                Jedná se o náklady na automatizaci procesů v komunitě, analýzu
                dat, správu software, pořádání akcí nebo komunikaci.
              </p>
            </BulletSection>
            <BulletSection>
              <H3>Vyvinout technické nástroje a zdroje</H3>
              <p>
                Vaše podpora nám pomůže vyvinout technické nástroje a zdroje,
                které mohou organizace veřejné sféry efektivně využít v rámci
                svého fungování. Bavíme se například o softwaru nebo nástrojích
                pro analýzu dat, které budou pro řadu organizací úplnou
                novinkou.
              </p>
            </BulletSection>
            <BulletSection>
              <H3>Prosadit systémovou změnu</H3>
              <p>
                Vaši podporu využijeme pro dlouhodobou a udržitelnou změnu,
                která povede k efektivnímu využívání digitálních technologií na
                úrovni celé společnosti. Díky advokačním aktivitám a ve
                spolupráci s úředníky a politiky budeme prosazovat pozitivní
                změny pro budoucí vývoj.
              </p>
            </BulletSection>
          </div>
        </Slide>
      </section>

      <Slide>
        <div className="my-20 max-w-prose m-auto">
          <H2>
            Díky efektivnímu používání technologií lepší život v Česku pro
            každého.
          </H2>
        </div>
        <Image
          src={Illustrations.circle}
          className="absolute w-[200px] -right-[70px] top-[100px]"
          alt=""
        />
        <Image src={Photos.pracak2} className="mb-20" alt="" />
        <p className="max-w-prose m-auto mb-20">
          Efektivní používání technologie nám umožní jednoduché a opakované
          úkoly automatizovat tak, že úředníci budou mít více času na péči o
          lidi v nouzi a jejich individuální potřeby. Technologie usnadňuje
          lidem život a díky této zkušenosti bude veřejná správa umět vhodné
          technologie ve větším měřítku poptávat a do jejich rozvoje dlouhodobě
          investovat. Taková veřejná správa přináší zjednodušení práce a
          zkvalitnění služeb pro organizace, firmy i občany Česka – o kus lepší
          život v Česku pro nás všechny.
        </p>
      </Slide>

      <Slide>
        <hr className="mb-20" />
        <div className="grid md:grid-cols-3 gap-7 pb-20">
          <div>
            <H3>Finanční zodpovědnost</H3>
            <p>
              Partnerstvím s Česko.Digital podpoříte desítky projektů s dalšími
              nevládními organizacemi, které ročně realizujeme. Ve všem, co
              děláme, jsme maximálně transparentní – od bankovního účtu po
              postupy a zdrojové kódy u všech aplikací a řešení. Vyvíjíme pouze
              open-source technologie s důrazem na řešení reálného problému a
              uživatele, toto know-how dále šíříme mezi stovky jednotlivců i
              organizací.
            </p>
          </div>
          <div>
            <H3>Finanční udržitelnost</H3>
            <p>
              Investice do Česko.Digital je investicí do rozvoje, nikoliv do
              nákladů. Komunita stojí na expertním dobrovolnictví, v rámci něhož
              si týmy a projekty vyměňují mnohdy finančně zatěžující know-how
              nebo technologické nástroje. Právě neformální, přátelské prostředí
              vedené silnou vizí v lepší budoucnost umožňuje Česko.Digital
              excelovat v rychlosti, flexibilitě a škálování v dlouhém časovém
              horizontu.
            </p>
          </div>
          <div>
            <H3>Spolupráce ušitá na míru</H3>
            <p>
              Partneři a filantropové mohou mít ve financování různé preference,
              jako je poskytnutí jednorázového daru nebo poskytování trvalé
              podpory. Nabízíme řadu možností financování a jsme flexibilní ve
              svém přístupu; pro všechny partnery máme připravený marketingový
              balíček, protože na naše partnery a podporovatele jsme náležitě
              hrdí.
            </p>
          </div>
        </div>
      </Slide>

      <Slide>
        <div className="text-center mb-20">
          <H2>Každý svým dílem přispívá již několik let</H2>
        </div>
        <div className="pb-20">
          <div className="grid max-md:grid-cols-3 md:grid-cols-5 gap-1 bg-pebble">
            <Image src={PartnerLogos.Aswa} alt="" />
            <Image src={PartnerLogos.Avast} alt="" />
            <Image src={PartnerLogos.BankID} alt="" />
            <Image src={PartnerLogos.Deloitte} alt="" />
            <Image src={PartnerLogos.Fakturoid} alt="" />
            <Image src={PartnerLogos.FIT} alt="" />
            <Image src={PartnerLogos.Google} alt="" />
            <Image src={PartnerLogos.H1} alt="" />
            <Image src={PartnerLogos.Livesport} alt="" />
            <Image src={PartnerLogos.Mapotic} alt="" />
            <Image src={PartnerLogos.NPI} alt="" />
            <Image src={PartnerLogos.OpenContent} alt="" />
            <Image src={PartnerLogos.Opero} alt="" />
            <Image src={PartnerLogos.OSF} alt="" />
            <Image src={PartnerLogos.PaleFire} alt="" />
            <Image src={PartnerLogos.PPF} alt="" />
            <Image src={PartnerLogos.Praha} alt="" />
            <Image src={PartnerLogos.Principal} alt="" />
            <Image src={PartnerLogos.Rekonstrukce} alt="" />
            <Image src={PartnerLogos.SolidPixels} alt="" />
          </div>
        </div>
      </Slide>

      <ImageHeaderSlide image={Photos.nezisk2}>
        <H2>Pojďme měnit Česko k lepšímu. Potřebuje to.</H2>
        <Perex>
          Našli jsme způsob, jak posunout celou naši společnost. Buďte s námi u
          toho a podpořte nás. Už 4 roky prokazujeme, jak mohou digitální
          technologie pomoci, vytvořili jsme automatizovaný ekosystém expertní
          podpory veřejné sféry a s vaší podporou ho budeme moci akcelerovat.
          Máme detailní plán systémové změny, jak problém dlouhodobě vyřešit.
          Moc rádi se s vámi sejdeme a prodiskutujeme možnosti spolupráce.
        </Perex>
      </ImageHeaderSlide>

      <Slide>
        <div className="grid md:grid-cols-3 gap-7">
          <div>
            <H3>Vyžádejte si nezávazně více informací</H3>
            <p>
              Hledáte něco, co jste tu nenašli? Rádi vám přiblížíme naší
              organizaci, její fungování a plány.
            </p>
          </div>
          <div>
            <H3>Sejděte se s naším COO</H3>
            <p>
              <a
                href="https://www.linkedin.com/in/jankotara/"
                className="text-black"
              >
                Jan Kotara
              </a>{" "}
              vede kmenový tým komunity a bude tím nejlepším, kdo zodpoví vaše
              otázky. Domluvte si schůzku.
            </p>
          </div>
          <div>
            <H3>Máte zájem? Jak přispět a co dál</H3>
            <p>
              Napište nám a domluvíme se, jak nejlépe využít vaše zdroje a
              kapacity, abychom společně změnili Česko k lepšímu.
            </p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <ButtonLink to="mailto:jan.kotara@cesko.digital">
            Ozvěte se nám
          </ButtonLink>
        </div>
      </Slide>
    </Fragment>
  );
};

const FooterSection = () => {
  const links = {
    "Impact Report 2019–22":
      "https://data.cesko.digital/vyrocni-zpravy/impact-report-2022.pdf",
    "Tiskové zprávy": "https://blog.cesko.digital",
    "Průzkum klíčových aktérů 2023":
      "https://drive.google.com/file/d/1BLLChViCvNAS0Q9Kptz6Fi5pdUyJCUOM/edit",
    "E15: CEO Česko.Digital o digitalizaci":
      "https://www.e15.cz/nazory-a-analyzy/cesko-v-digitalizaci-zaostava-musime-zmenit-mysleni-pise-pro-e15-cz-sefka-cesko-digital-eva-pavlikova-1382466",
    "Mapa systémové změny":
      "https://drive.google.com/file/d/1-RLMuLgPK7UAhPwdZiBgcnCtnZ8Jy7oT/view?usp=share_link",
    "Forbes: Česko.Digital pomůže nezisku":
      "https://forbes.cz/neziskovky-objevuji-svet-jednicek-a-nul-pomoci-jim-ma-inkubator-cesko-digital/",
  };
  return (
    <section className="bg-pebble pt-20 pb-20">
      <Slide>
        <div className="max-md:pl-20 md:text-center mb-20">
          <H2>Chci si to víc prostudovat</H2>
        </div>
        <ul className="grid md:grid-cols-2 gap-7 list-none px-20">
          {Object.entries(links).map(([label, url]) => (
            <li key={label}>
              → 
              <a href={url} className="text-black">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Slide>
    </section>
  );
};

//
// Components
//

const Slide = ({ children }: { children: ReactNode }) => (
  <div className="max-w-content m-auto px-5 text-xl mb-20 relative">
    {children}
  </div>
);

const ImageHeaderSlide = ({
  children,
  image,
}: {
  children: ReactNode;
  image: StaticImageData;
}) => (
  <section>
    <Image src={image} alt="" className="w-full z-0 relative" />
    <div className="max-w-content m-auto text-xl px-5 md:px-20 pb-20 pt-10 bg-white md:-mt-[200px] relative z-20">
      <div className="max-w-prose m-auto">{children}</div>
    </div>
  </section>
);

const TwoColumnSlide = ({ children }: { children: ReactNode }) => (
  <Slide>
    <div className="grid md:grid-cols-2 gap-20">{children}</div>
  </Slide>
);

const ImageQuoteSlide = ({
  image,
  children,
}: {
  image: StaticImageData;
  children: React.ReactNode;
}) => {
  const wideVersion = (
    <section className="mb-20 overflow-hidden">
      <div className="w-full relative">
        <div className="absolute right-0 z-0 w-3/4 h-full">
          <Image
            src={image}
            placeholder="blur"
            className="object-cover"
            alt=""
            fill
          />
        </div>
        <div className="absolute left-0 z-1 w-3/4 h-full">
          <Image src={Illustrations.gradient} placeholder="blur" alt="" fill />
        </div>
        <div className="max-w-content m-auto z-2 relative px-5 pt-[100px] pb-[150px]">
          <blockquote className="text-white leading-normal text-3xl font-bold w-[400px]">
            <Balancer>{children}</Balancer>
          </blockquote>
        </div>
      </div>
    </section>
  );

  const narrowVersion = (
    <section className="mb-20">
      <Image src={image} placeholder="blur" alt="" />
      <blockquote className="leading-normal text-3xl font-bold p-5 mt-10">
        {children}
      </blockquote>
    </section>
  );

  return (
    <div>
      <div className="hidden md:block">{wideVersion}</div>
      <div className="block md:hidden">{narrowVersion}</div>
    </div>
  );
};

const TextQuote = ({
  quote,
  author,
  source,
}: {
  quote: string;
  author: string;
  source?: string;
}) => (
  <div>
    <blockquote className="text-2xl font-bold">
      <Balancer>„{quote}“</Balancer>
    </blockquote>
    <p className="text-base">
      {source && (
        <a href={source} className="text-black">
          {author}
        </a>
      )}
      {!source && author}
    </p>
  </div>
);

//
// Typo
//

type Tag = ({ children }: { children: ReactNode }) => JSX.Element;

const H2: Tag = ({ children }) => (
  <h2 className="leading-normal">
    <Balancer>{children}</Balancer>
  </h2>
);

const H3: Tag = ({ children }) => (
  <h3 className="leading-normal font-bold">
    <Balancer>{children}</Balancer>
  </h3>
);

const H4: Tag = ({ children }) => (
  <h4 className="leading-normal font-bold">
    <Balancer>{children}</Balancer>
  </h4>
);

const Em: Tag = ({ children }) => (
  <em className="not-italic font-bold">{children}</em>
);

const Perex: Tag = ({ children }) => (
  <p className="font-semibold">{children}</p>
);

export default CasePage;
