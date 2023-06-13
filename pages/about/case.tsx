import { Layout } from "components/layout";
import pracak from "app/about/case/photos/pracak.jpg";
import pracak2 from "app/about/case/photos/pracak2.jpg";
import psychiatrie from "app/about/case/photos/psychiatrie.jpg";
import gradient from "app/about/case/gradient.png";
import meetup from "app/about/case/photos/meetup.jpg";
import graf from "app/about/case/photos/graf.png";
import nezisk from "app/about/case/photos/nezisk.jpg";
import nezisk2 from "app/about/case/photos/nezisk2.jpg";
import hackday from "app/about/case/photos/hackday.jpg";
import panel from "app/about/case/photos/panel.jpg";
import kolac from "app/about/case/kolac.png";
import mariana from "app/about/case/quotes/mariana.jpg";
import martha from "app/about/case/quotes/martha.jpg";
import oliver from "app/about/case/quotes/oliver.jpg";
import steve from "app/about/case/quotes/steve.jpg";
import {
  Aswa,
  Avast,
  BankID,
  Deloitte,
  Fakturoid,
  FIT,
  Google,
  H1,
  Livesport,
  Mapotic,
  NPI,
  OpenContent,
  Opero,
  OSF,
  PaleFire,
  PPF,
  Praha,
  Principal,
  Rekonstrukce,
  SolidPixels,
} from "app/about/case/logos";
import Image, { StaticImageData } from "next/image";
import { Fragment, ReactNode } from "react";
import { communitySize } from "lib/utils";
import { ButtonLink } from "components/links";
import Balancer from "react-wrap-balancer";

const CasePage = () => (
  <Layout crumbs={[{ label: "O nás" }]} head={{ title: "Case for Support" }}>
    <Intro />
    <Challenges />
    <AboutCeskoDigital />
    <SystemicChangeExplainer />
    <SystemicChangePlan />
    <PledgeSection />
    <FooterSection />
  </Layout>
);

const Intro = () => (
  <Slide>
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
  </Slide>
);

const Challenges = () => (
  <Fragment>
    <ImageQuoteSlide image={pracak}>
      Lidé v nouzi sice mohou získat podporu, ale neví jak. Čekají měsíce, úřady
      s nimi vůbec nekomunikuji. Nemají často ani na jídlo.
    </ImageQuoteSlide>
    <TwoColumnSlide>
      <div>
        <p className="mt-0">
          Čtyřicátník v kapuci vysvětluje, že na úřad práce přišel v září, kdy
          mu doporučili, aby si o příspěvek na bydlení zažádal on-line. A od té
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
        quote="On-line žádost jsem zkoušela a nikdo se mi neozval."
        author="Zuzana P. pro Seznam Zprávy (leden 2023)"
        source="https://www.seznamzpravy.cz/clanek/domaci-zivot-v-cesku-ve-fronte-pred-uradem-prace-na-prispevek-cekaji-mesice-a-urednici-nekomunikuji-222350"
      />
    </TwoColumnSlide>
    <ImageQuoteSlide image={psychiatrie}>
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
    <ImageQuoteSlide image={graf}>
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
          případných budoucích epidemiích.
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
        author="Výroční zpráva Nejvyššího kontrolního ústavu, 2022"
        source="https://www.nku.cz/assets/publikace-a-dokumenty/vyrocni-zprava/vyrocni-zprava-nku-2022.pdf"
      />
    </TwoColumnSlide>
    <Slide>
      <Head2>
        Brzdí nás to všechny. Od jednotlivce, přes firmy až po celý stát.
      </Head2>
      <p>
        Zastarávání v oblasti digitálních technologií má negativní vliv na celou
        společnost. Zvyšující se digitální propast způsobuje sociální problémy,
        snižuje konkurenceschopnost firem, brzdí pokrok státního aparátu.
      </p>
      <p>
        Nesrozumitelnost procesů ve veřejné sféře a nevyužití digitálních
        technologií <em>zpomaluje celou společnost</em>.
      </p>
      <p>Pokud s tím něco neuděláme, budeme dál zaostávat.</p>
    </Slide>
  </Fragment>
);

const AboutCeskoDigital = () => (
  <Fragment>
    <ImageHeaderSlide image={meetup}>
      <Head2>Skrz 1 a 0 měníme Česko k lepšímu</Head2>
      <p>
        Říkali nám, že jsme naivní. My ale už roky dokazujeme, že změna je
        možná. Trpělivě krok po kroku učíme neziskové organizace a státní
        správu, jak využívat digitální technologie.
      </p>
      <p>
        Jádrem komunity je {communitySize}+ expertních dobrovolníků a
        dobrovolnic. Ti do komunity přináší to nejcennější – svůj čas a také
        svou expertízu (typicky v oblastech softwarového vývoje, produktového
        designu nebo projektového řízení). Díky jejich propojení v komunitě
        vznikají veřejně prospěšná řešení v podobě open source digitálních
        produktů.
      </p>
    </ImageHeaderSlide>
    <Slide>
      <h3>
        V pandemii i na začátku války Česko.Digital pomohlo v těch největších
        krizích
      </h3>
      <div className="grid grid-cols-4 gap-7">
        <div>
          <Head4>Covid portál</Head4>
          <p>
            Informace o vládních opatřeních v pandemii přehledně na jednom místě
            pro občany Česka.
          </p>
          <p>
            Dopad: 250 000+ lidí navštívilo portál prvních 48 hodin jeho provozu
          </p>
        </div>
        <div>
          <Head4>Stojíme za Ukrajinou</Head4>
          <p>
            Informační rozcestník, který vznikl takřka přes víkend, nabídl
            desítky návodů, jak pomoc nabídnout či získat.
          </p>
          <p>
            Dopad: téměř 800 000 lidí navštívilo rozcestník do 3 dnů od
            vypuknutí války
          </p>
        </div>
        <div>
          <Head4>Dáme roušky</Head4>
          <p>
            Komunitní mapa roušek, která v kritický moment pandemie COVID-19
            umožnila získat klíčovou ochrannou pomůcku.
          </p>
          <p>Dopad: 600 000+ roušek se předalo díky online komunitní mapě</p>
        </div>
        <div>
          <Head4>Movapp</Head4>
          <p>
            Do 3 dnů od vypuknutí války nabídla aplikace řešení, jak usnadnit
            komunikaci mezi Čechy a Ukrajinci.
          </p>
          <p>Dopad: 12 000+ uživatelů si už stáhlo aplikaci do mobilu</p>
        </div>
      </div>
    </Slide>
    <Slide>
      <div className="grid grid-cols-4 gap-7">
        <div>
          <h3>20+ digitálních řešení</h3>
          <p>vytvořených v komunitě</p>
        </div>
        <div>
          <h3>{communitySize}+ dobrovolníků</h3>
          <p>registrovaných v komunitě</p>
        </div>
        <div>
          <h3>252 000+ hodin</h3>
          <p>pro-bono dobrovolnické práce</p>
        </div>
        <div>
          <h3>4 000 000+ lidí</h3>
          <p>oslovila naše digitální řešení</p>
        </div>
      </div>
    </Slide>
    <Slide>
      <Head2>
        Na začátku nadšenci do technologií. Po 4 letech respektovaným partnerem
        pro úředníky i politiky.
      </Head2>
      <Image src={panel} alt="" />
      <div className="grid grid-cols-3 gap-7">
        <div>
          <h3>
            Jsme zástupci občanské společnosti v Radě vlády pro informační
            společnost (RVIS)
          </h3>
          <p>
            Rada je stálý řídicí, poradní, iniciační a koordinační orgán vlády
            Česka pro rozvoj digitálních služeb ve veřejné správě, jsme součástí
            předsednictva jako jediní zástupci akademické́ sféry a občanské́
            společnosti.
          </p>
        </div>
        <div>
          <h3>
            Spojili jsme neziskovky se zájmem na digitalizaci státu v jeden hlas
            – platforma Společně a digitálně
          </h3>
          <p>
            Platforma{" "}
            <a href="https://spolecneadigitalne.cz">Společně a digitálně</a> je
            společnou iniciativou deseti nevládních neziskových organizací,
            které se dlouhodobě věnují digitální transformací státu. Propojujeme
            klíčové aktéry, formulujeme doporučení, diskutujeme s politiky i
            veřejností.
          </p>
        </div>
        <div>
          <h3>Pomáhali jsme se vznikem Digitální informační agentury (DIA)</h3>
          <p>
            V Česku jsme po vzoru Velké Británie a Dánska pomohli prosadit vznik{" "}
            <a href="https://www.dia.gov.cz">Digitální a informační agentury</a>
            , která systematicky naplňuje potřeby pro digitalizaci a využívání
            technologií ve veřejné správě a bude ji dále svědomitě rozvíjet ve
            prospěch občanů Česka.
          </p>
        </div>
      </div>
    </Slide>
  </Fragment>
);

const SystemicChangeExplainer = () => (
  <Fragment>
    <ImageHeaderSlide image={pracak2}>
      <Head2>
        Dílčí projekty nestačí. Pokud chceme problém skutečně vyřešit, musíme na
        to jít systémově
      </Head2>
      <p>
        Díky 4 letům práce na individuálních projektech jsme si uvědomili, že za
        veřejnou sféru touto cestou většinou jen „hasíme požáry“: nechceme, aby
        takto hodnotné iniciativy vznikaly pouze z dobré vůle lidí, kteří na
        nich pracují po večerech a víkendech. Chceme, aby s nimi veřejná sféra
        dokázala přicházet sama, strategicky a práce dobrovolníků nebyla tolik
        potřebná. 
      </p>
      <p>
        Povedlo se nám vytvořit unikátní propojení expertů z firem, státní
        správy a neziskových organizací, díky čemuž máme komplexní pohled na to,
        jak systém veřejné správy funguje. Máme za sebou stovky hodin rozhovorů
        s různými organizacemi o tom, jaké jsou hlavní bariéry při využití
        digitálních technologií. To vše nás přivedlo k definici problému:
      </p>
    </ImageHeaderSlide>
    <Slide>
      <div className="bg-it text-white p-20 leading-relaxed text-center">
        <p className="bg-black m-0 px-10 py-2 inline-block uppercase">
          Problém
        </p>
        <Head2>
          Veřejná sféra* neumí využívat potenciál technologií k řešení
          celospolečenských problémů a zhoršuje tak podmínky pro život lidí v
          České republice.
        </Head2>
        <p>
          <Balancer>
            *Veřejnou sférou máme na mysli všechny aktéry české společnosti,
            kteří tímto problémem trpí: státní správa a samospráva, neziskové
            organizace, univerzity a média.
          </Balancer>
        </p>
      </div>
    </Slide>
    <Slide>
      <Head2>Neděje se to jen tak. Známe všechny bariéry.</Head2>
      <p>
        Z dlouhodobé zkušenosti, z dat a průzkumů z Česka i zahraničí jsme
        identifikovali 4 hlavní bariéry veřejné sféry: chybí sdílená vize,
        informace, kompetence a finance.
      </p>
    </Slide>
    <TwoColumnSlide>
      <div>
        <p>01</p>
        <Head2>Chybí sdílená vize</Head2>
        <p>
          Sdílená vize znamená, že lidé v veřejné správě i mimo ni mají
          společnou představu o tom, kam společně směřují a co chtějí dosáhnout.
          Je to jako mapa, která ukazuje, kudy se chceme dostat a jaké jsou cíle
          naší cesty. Pokud máme jasnou sdílenou vizi, víme, co máme dělat a
          proč to děláme, což nás motivuje a inspiruje.
        </p>
        <p>
          Chybějící sdílená vize potom vede k nedorozuměním, neshodám a
          rozdílným zájmům, což zpomaluje nebo dokonce zastavuje pokrok řešení.
          Také často vede k neefektivnímu využití peněz a času, protože
          organizace nemusí být jasně informována o tom, co se od ní očekává.
          Nakonec, nedostatek sdílené vize ovlivňuje motivaci lidí a organizací,
          kteří nemají jasnou představu o tom, jaký je smysl a cíl jejich práce.
        </p>
        <p>
          Náš průzkum potvrdil hypotézu, že v Česku chybí sdílená vize, jak
          využívat digitální technologie ve veřejné správě. Bez jasně
          definovaného a sdíleného směřování, například ve formě vize, se jen
          těžko něco změní.
        </p>
      </div>
      <div>
        <Image src={oliver} alt="" className="mb-7" />
        <TextQuote
          quote="To achieve our ambitions, we need a shared vision for government, grounded in the needs of our users. This means breaking down silos and thinking about services from the perspective of the people who use them."
          author="Oliver Dowden, Minister for Implementation, UK"
        />
      </div>
    </TwoColumnSlide>
    <TwoColumnSlide>
      <div>
        <p>02</p>
        <Head2>Chybí informace</Head2>
        <p>
          Mít všechny potřebné informace znamená mít jednoduše dostupná a
          relevantní data, znalosti k interpretaci dat a jejich praktickému
          použití. Dostupnými daty myslíme výstupy z výzkumů, srozumitelné
          analýzy dat a příklady dobré praxe z Česka i zahraničí, které pomohou
          v informovaném rozhodování. Všechny potřebné informace musí být
          jednoduše dostupné a otevřené všem bez omezení.
        </p>
        <p>
          Bez přístupu k aktuálním informacím o nových technologiích a jejich
          potenciálních přínosech si lidé – ať už úředníci, politici nebo občané
          - často ani neuvědomují možnosti, které existují. To je potom
          promarněnou příležitost snahy ke zlepšení efektivity, snížení nákladů
          a poskytování lepších služeb všem.
        </p>
        <p>
          Když potom organizace veřejné sféry postrádají informace o potenciálu
          technologie, neumí adekvátně plánovat jejich praktické nasazení a
          používání. To vede k problémům, jako je nedostatečné školení,
          nedostatečné zdroje a špatná integrace se stávajícími systémy – ve
          výsledku jde o další špatnou zkušenost s technologií a další odpor ke
          změně.
        </p>
      </div>
      <div>
        <Image src={mariana} alt="" className="mb-7" />
        <TextQuote
          quote="In a world where knowledge is power, lack of information can be a barrier to progress, growth and development"
          author="Mariana Mazzucato, Professor of Economics at University College London"
        />
      </div>
    </TwoColumnSlide>
    <TwoColumnSlide>
      <div>
        <p>03</p>
        <Head2>Chybí kompetence</Head2>
        <p>
          V kontextu technologií ve veřejném sektoru se kompetencemi rozumí
          znalosti, dovednosti a schopnosti, které jsou nezbytné pro lidi k
          efektivnímu využívání a řízení technologií při jejich práci. To
          zahrnuje řadu kompetencí, jako jsou technické dovednosti související s
          hardwarem a softwarem, stejně jako širší dovednosti související se
          strategickým uvažováním, analýzou dat, řízením projektů, komunikací.
        </p>
        <p>
          Pokud lidem ve veřejného sektoru chybí potřebné kompetence k
          efektivnímu využívání nových technologií, ovlivňuje to potom negativně
          úspěšnou implementaci a praktické využití. To v důsledku vede k
          rezistenci a neschopnosti adaptovat se na změnu nebo zavádění nových
          nástrojů, což brání pokroku a inovaci celého veřejného sektoru.
        </p>
        <p>
          Chybějící kompetence, resp. jejich nedostatky, ukazuje každoroční
          evropský index DESI (Digital Economy and Society Index), kde se Česko
          v roce 2022 mezi 27 členskými státy Evropské Unie řadí pod průměr na
          19. místo v oblasti integrace digitálních technologií, ve srovnání s
          rokem jsme si navíc pohoršili o čtyři příčky hůř než v roce 2021 (15.
          místo).
        </p>
        <p>
          Digitálním kompetencím se věnuje také průzkum ČSÚ (Český statistický
          úřad), který u úředníků vyhodnocuje jen základní dovednosti jako práce
          s tabulkovým nebo textovým editorem, námi zmíněné kompetence nesleduje
          vůbec.
        </p>
      </div>
      <div>
        <Image src={martha} alt="" className="mb-7" />
        <TextQuote
          quote="Digital skills are not just about machines, they are about people. Digital technologies, when combined with the right mix of skills and capabilities, have the power to transform the way public services are delivered."
          author="Martha Lane Fox, House of Lords crossbench peer, Chancellor at the Open University and a board member at Twitter"
        />
      </div>
    </TwoColumnSlide>
    <TwoColumnSlide>
      <div>
        <p>04</p>
        <Head2>Chybí finance</Head2>
        <p>
          Tato příčina úzce souvisí s předcházející – veřejná sféra typicky není
          schopna přilákat top talent, mj. kvůli neschopnosti konkurovat odměnám
          v komerčním sektoru. Z průzkumu “Stav IT v českém nezisku” z roku 2021
          provedeného Techsoup ČR a Nadací OSF vyplývá, že 62 % středně velkých
          neziskových organizací uvádí jako hlavní překážku svého rozvoje právě
          nedostatek finančních prostředků.
        </p>
        <p>
          Zrychlená digitalizace by mohla České republice přinést růst
          produktivity vyšší až o 70 %, konstatuje poradenská společnost
          McKinsey ve své analýze Vzestup digitálních vyzyvatelů, Perspektiva
          ČR. Podle této zprávy může zrychlení digitalizace do roku 2025 přinést
          až 26 miliard EUR dodatečného hrubého domácího produktu (HDP), což
          znamená navýšení roční míry růstu HDP o téměř jeden procentní bod.
        </p>
      </div>
      <div>
        <Image src={steve} alt="" className="mb-7" />
        <TextQuote
          quote="The cost of not investing in technology is often greater than the cost of investing in it."
          author="Steve VanRoekel, former Chief Information Officer of the United States"
        />
      </div>
    </TwoColumnSlide>
    <TwoColumnSlide>
      <div>
        <Head2>
          Zaostáváme každým dnem, a to na několika frontách. Pokud nezměníme
          směr, kterým se technologie ubírají, bude se situace dále zhoršovat.
        </Head2>
        <p>
          Bariéry, kvůli kterým Česko zaostává v efektivním používání
          technologií jako chybějící vize, kompetence, informace a finance, jsou
          ze své podstaty velmi komplexní. Můžeme se pokoušet o jejich dílčí
          řešení a oblasti kompetencí toho už mnoho děláme – ať jsou to
          digitální řešení s nevládními organizacemi nebo systematické
          vzdělávání skrz hackdays nebo webináře. Pokud však chceme být v řešení
          opravdu úspěšní, potřebujeme jednotlivé bariéry řešit propojeně a
          systematicky tak, aby proměna veřejné sféry byla trvalá a přežila více
          volebních období. Po důkladné rešerši a 4 letům přímé práce i
          spolupráce s klíčovými aktéry na poli českých digitálních technologií
          věříme tomu, že je správný čas na systémovou změnu.
        </p>
      </div>
      <div>TBD rekapitulace problémů</div>
    </TwoColumnSlide>
  </Fragment>
);

const SystemicChangePlan = () => (
  <Fragment>
    <ImageHeaderSlide image={hackday}>
      <Head2>Řešíme to systémově. Máme konkrétní plán, jak na to.</Head2>
      <p>
        Víme, že žádný systém není možné změnit jednostranně – jde o to
        koordinovaně sjednotit dosavadní, často individuální snažení a aktivity
        jednotlivých hráčů v systému tak, aby kýžená změna byla dlouhodobě
        udržitelná.
      </p>
    </ImageHeaderSlide>
    <TwoColumnSlide>
      <div>
        <Head2>Náš plán na období 2024–2027</Head2>
        <p>
          Strategicky se zaměříme na 3 největší příčiny problému. Propojíme
          klíčové aktéry a podpoříme vznik společné vize, která odolá politickým
          změnám. Zpopularizujeme konkrétní příklady úspěšných digitálních
          řešení z Česka i ze zahraničí a vysvětlíme jejich přínos. Dodáme
          potřebné kompetence k efektivnímu využití digitálních technologií.
        </p>
        <p>
          Jednotlivé aktivity na sebe navazují a propojují jak komunitu, tak i
          organizace a jednotlivce, kteří mají zásadní vliv na budoucí vývoj
          digitálních technologií v Česku.
        </p>
      </div>
      <div>TBD odkaz na mapu</div>
    </TwoColumnSlide>
    <Slide>
      <h3>Nadchneme je do společné vize</h3>
      <p>
        Zaměříme se na klíčové aktéry české společnosti, kteří mají zásadní vliv
        na rozvoj digitálních technologií v Česku. Vysvětlíme jim přínos sdílené
        vize, která nastaví jasné směřování a umožní dělat strategicky správná
        rozhodnutí. Nastolíme společnou debatu klíčových aktérů, která vyústí ve
        sdílenou vizi, ke které se aktéři formálně zaváží, například formou
        memoranda.
      </p>
      <p>
        Náš nejbližší milník: 1/2 2024. Klíčoví aktéři v systému se shodnou na
        sdílené vizi využívání technologií ve veřejné sféře formou manifestu.
      </p>
    </Slide>
    <Slide>
      <h3>Inspirujeme je a dodáme potřebné informace</h3>
      <p>
        Poukážeme na dobré příklady praxe digitálních technologií ve veřejné
        sféře, které měly úctyhodný přínos. Zajistíme, že politické strany (s
        potenciálem 5+ % v parlamentních volbách) mají ve svých programech
        digitální technologie. Spustíme osvětovou kampaň zaměřenou na zlepšení
        postojů lidí k technologiím.
      </p>
      <p>
        Náš nejbližší milník: 1/5 2025. Digitální technologie jsou nedílnou
        součástí navrhovaných řešení problémů všech politických stran s
        potenciálem 5% v parlamentních volbách v roce 2025.
      </p>
    </Slide>
    <Slide>
      <h3>Naučíme je to</h3>
      <p>
        Díky kombinaci podpůrných aktivit, jako jsou školicí programy pro
        nevládní organizace, poskytování pomoci digitálním projektům nebo
        školení vlastníků produktů ve veřejném sektoru, dosáhneme větší
        připravenosti veřejné sféry maximálně využívat digitálních technologií.
      </p>
      <p>
        Náš nejbližší milník: 1/9 2023. Otevíráme tréninkové programy na
        navyšování kompetencí pro veřejnou sféru.
      </p>
    </Slide>
  </Fragment>
);

const PledgeSection = () => (
  <Fragment>
    <ImageHeaderSlide image={nezisk}>
      <Head2>Máme dobře našlápnuto. Pomozte nám to dotáhnout.</Head2>
      <p>Žádaná podpora: 25 mio. Kč / rok na období 2024–2027</p>
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
      <div className="grid grid-cols-3">
        <Image src={kolac} alt="" className="col-start-2" />
      </div>
    </Slide>

    <Slide>
      <Head2>Vaše podpora nám konkrétně pomůže</Head2>
      <div className="grid grid-cols-2 gap-7">
        <div>
          <h3>Poskytnout školení a podporu</h3>
          <p>
            Díky vám budeme moci poskytnout expertizu a know-how tam, kde je
            nejvíc potřeba – projektům a organizacím řešící palčivé společenské
            problémy. Pomocí školících programů a strategické podpory pomůžeme
            rozvinout dovednosti a odborné znalosti potřebné k efektivnímu
            využití technologie ke zlepšení jejich služeb.
          </p>
        </div>
        <div>
          <h3>Rozvíjet expertní infrastrukturu</h3>
          <p>
            Úspěch Česko.Digital by nebyl možný bez komunity expertů, kteří se
            snadno propojují s veřejným sektorem. Právě rozvoj komunity, která
            propojuje světy, které se potřebují, ale často si nerozumí, bude
            jeden z klíčových pilířů vynaložené investice. Jedná se o náklady na
            automatizaci procesů v komunitě, analýzu dat, správu software,
            pořádání akcí a komunikaci.
          </p>
        </div>
        <div>
          <h3>Vyvinout technické nástroje a zdroje</h3>
          <p>
            Vaše podpora nám pomůže vyvinout technické nástroje a zdroje, které
            mohou organizace veřejné sféry efektivně využít v rámci svého
            fungování. Bavíme se například o software nebo nástrojích pro
            analýzu dat, které budou pro řadu organizací úplnou novinkou.
          </p>
        </div>
        <div>
          <h3>Prosadit systémovou změnu</h3>
          <p>
            Vaší podporu využijeme pro dlouhodobou a udržitelnou změnu, která
            povede k efektivnímu využívání digitálních technologií na úrovni
            celé společnosti. Díky advokačním aktivitám a ve spolupráci s
            úředníky a politiky budeme prosazovat pozitivní změny pro budoucí
            vývoj.
          </p>
        </div>
      </div>
    </Slide>

    <Slide>
      <Head2>
        Díky efektivnímu používání technologií lepší život v Česku pro každého.
      </Head2>
      <Image src={pracak2} alt="" />
      <p>
        Efektivní používání technologie nám umožní jednoduché a opakované úkoly
        automatizovat tak, že úředníci budou mít více času na péči o lidi v
        nouzi a jejich individuální potřeby. Technologie usnadňuje lidem život a
        díky této zkušenosti veřejná správa bude umět vhodné technologie ve
        větším měřítku poptávat i do jejich rozvoje dlouhodobě hlavně
        investovat. Na konci dne taková veřejná správa přináší zjednodušení
        práce a zkvalitnění služeb pro organizace, firmy i občany Česka - o kus
        lepší život v Česku pro nás všechny.
      </p>
    </Slide>

    <Slide>
      <div className="grid grid-cols-3 gap-7">
        <div>
          <h3>Finanční zodpovědnost</h3>
          <p>
            Partnerstvím s Česko.Digital podpoříte desítky projektů s dalšími
            nevládními organizacemi, které ročně realizujeme. Ve všem, co
            děláme, jsme maximálně transparentní - od bankovního účtu po postupy
            a kódy u všech aplikací a řešení. Vyvíjíme pouze open-source
            technologie s důrazem na řešení reálného problému a uživatele, toto
            know-how dále šíříme se stovkami jednotlivců i organizací.
          </p>
        </div>
        <div>
          <h3>Finanční udržitelnost</h3>
          <p>
            Investice do Česko.Digital je investicí do rozvoje, nikoliv do
            nákladů. Komunita stojí na expertním dobrovolnictví,v rámci jehož si
            týmy a projekty vyměňují mnohdy finančně zatěžující know-how nebo
            technologické nástroje. Právě neformální, přátelské prostředí vedené
            silnou vizí v lepší budoucnost umožňuje Česko.Digital excelovat v
            rychlosti, flexibilitě a škálování v dlouhém časovém horizontu.
          </p>
        </div>
        <div>
          <h3>Spolupráce ušitá na míru</h3>
          <p>
            Partneři a filantropové mohou mít různé preference, pokud jde o
            financování, jako je poskytnutí jednorázového daru nebo poskytování
            trvalé podpory. Nabízíme řadu možností financování a jsme flexibilní
            ve svém přístupu, pro všechny partnery máme připravený marketingový
            balíček, protože na naše partnery s podporovatele jsme náležitě
            hrdí.
          </p>
        </div>
      </div>
    </Slide>

    <Slide>
      <Head2>Každý svým dílem přispívá již několik let</Head2>
      <div className="grid grid-cols-5 gap-1 bg-pebble">
        <Image src={Aswa} alt="" />
        <Image src={Avast} alt="" />
        <Image src={BankID} alt="" />
        <Image src={Deloitte} alt="" />
        <Image src={Fakturoid} alt="" />
        <Image src={FIT} alt="" />
        <Image src={Google} alt="" />
        <Image src={H1} alt="" />
        <Image src={Livesport} alt="" />
        <Image src={Mapotic} alt="" />
        <Image src={NPI} alt="" />
        <Image src={OpenContent} alt="" />
        <Image src={Opero} alt="" />
        <Image src={OSF} alt="" />
        <Image src={PaleFire} alt="" />
        <Image src={PPF} alt="" />
        <Image src={Praha} alt="" />
        <Image src={Principal} alt="" />
        <Image src={Rekonstrukce} alt="" />
        <Image src={SolidPixels} alt="" />
      </div>
    </Slide>

    <ImageHeaderSlide image={nezisk2}>
      <Head2>Pojďme měnit Česko k lepšímu. Potřebuje to.</Head2>
      <p>
        Našli jsme způsob, jak posunout celou naši společnost. Buďte s námi u
        toho a podpořte nás. Už 4 roky prokazujeme, jak mohou digitální
        technologie pomoci, vytvořili jsme automatizovaný ekosystém expertní
        podpory veřejné sféry a s vaší podporou toto budeme moci akcelerovat.
        Máme detailní plán systémové změny, jak problém dlouhodobě vyřešit. Moc
        rádi se s vámi sejdeme a prodiskutujeme možnosti spolupráce.
      </p>
    </ImageHeaderSlide>

    <Slide>
      <div className="grid grid-cols-3 gap-7">
        <div>
          <h3>Vyžádejte si nezávazně více informací</h3>
          <p>
            Hledáte něco, co jste tu nenašli? Rádi vám přiblížíme naší
            organizaci, její fungování a plány.
          </p>
        </div>
        <div>
          <h3>Sejděte se s naším COO</h3>
          <p>
            <a href="https://www.linkedin.com/in/jankotara/">Jan Kotara</a> vede
            kmenový tým komunity a bude tím nejlepším, kdo zodpoví vaše otázky.
            Domluvte si schůzku.
          </p>
        </div>
        <div>
          <h3>Máte zájem? Jak přispět a co dál</h3>
          <p>
            Napište nám a domluvíme se, jak nejlépe využít vaše zdroje a
            kapacity, abychom společně změnili Česko k lepšímu.
          </p>
        </div>
      </div>
      <div className="mt-10 text-center">
        <ButtonLink to="mailto:ahoj@cesko.digital">Ozvěte se nám</ButtonLink>
      </div>
    </Slide>
  </Fragment>
);

const FooterSection = () => (
  <Slide>
    <div className="text-center mb-20">
      <Head2>Chci si to víc prostudovat</Head2>
    </div>
    <ul className="grid grid-cols-2 gap-7 list-none px-20">
      <li>
        <a href="https://data.cesko.digital/vyrocni-zpravy/impact-report-2022.pdf">
          Impact Report 2019–22
        </a>
      </li>
      <li>
        <a href="https://blog.cesko.digital">Tiskové zprávy</a>
      </li>
      <li>
        <a href="">Průzkum klíčových aktérů 2023</a>
      </li>
      <li>
        <a href="https://www.e15.cz/nazory-a-analyzy/cesko-v-digitalizaci-zaostava-musime-zmenit-mysleni-pise-pro-e15-cz-sefka-cesko-digital-eva-pavlikova-1382466">
          E15: CEO Česko.Digital o digitalizaci
        </a>
      </li>
      <li>
        <a href="">Mapa systémové změny</a>
      </li>
      <li>
        <a href="https://forbes.cz/neziskovky-objevuji-svet-jednicek-a-nul-pomoci-jim-ma-inkubator-cesko-digital/">
          Forbes: Česko.Digital pomůže nezisku
        </a>
      </li>
    </ul>
  </Slide>
);

//
// Components
//

const Slide = ({ children }: { children: ReactNode }) => (
  <div className="max-w-content m-auto px-5 text-xl mb-20">{children}</div>
);

const ImageHeaderSlide = ({
  children,
  image,
}: {
  children: ReactNode;
  image: StaticImageData;
}) => (
  <Slide>
    <Image src={image} alt="" />
    {children}
  </Slide>
);

const TwoColumnSlide = ({ children }: { children: ReactNode }) => (
  <Slide>
    <div className="grid grid-cols-2 gap-20">{children}</div>
  </Slide>
);

const ImageQuoteSlide = ({
  image,
  children,
}: {
  image: StaticImageData;
  children: React.ReactNode;
}) => (
  <Slide>
    <div className="w-full aspect-video relative">
      <Image src={image} alt="" className="absolute" />
      <Image src={gradient} alt="" className="absolute" fill />
      <h2 className="absolute w-[50%] text-white px-20 py-20 leading-normal">
        {children}
      </h2>
    </div>
  </Slide>
);

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

const Head2 = ({ children }: { children: ReactNode }) => (
  <h2 className="leading-normal">
    <Balancer>{children}</Balancer>
  </h2>
);

const Head4 = ({ children }: { children: ReactNode }) => (
  <h4 className="leading-normal font-bold">
    <Balancer>{children}</Balancer>
  </h4>
);

export default CasePage;
