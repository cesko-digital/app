import { NextPage } from "next";
import { Layout } from "components/layout";
import Link from "next/link";
import { Petra, RadekH, Julia } from "components/onboarding/images";
import { CzechiaMapArrows } from "components/illustrations";
import Image, { StaticImageData } from "next/image";
import {
  OpennessIcon,
  EfficiencyIcon,
  ProfessionalismIcon,
} from "components/icons";
import {
  AnezkaL,
  AnezkaM,
  Jakub,
  Ondrej,
  Petr,
  RadekP,
  Martin,
  Eva,
} from "components/onboarding/images";

const Page: NextPage = () => {
  return (
    <Layout
      crumbs={[{ label: "Zapojit se" }]}
      head={{
        title: "Zapojit se",
        description: `Staň se součástí Česko.Digital, největší komunity expertních dobrovolníků
        a dobrovolnic. Rádi tě zapojíme do projektů, které tě budou bavit a kde můžeš získat
        nové zkušenosti nebo se podělit o své nápady.`,
      }}
    >
      <Intro />
      <JoinUs />
      <HowWeWork />
      <WhyJoin />
      <ContactUs />
    </Layout>
  );
};

/** Intro section with main heading and intro video */
const Intro = () => (
  <section className="relative max-w-content m-auto mt-10 pb-10 px-5 text-lg">
    <div className="hidden lg:block absolute right-[100px]">
      <Image
        src="/images/onboarding/rightward-arrows.svg"
        alt=""
        width={181}
        height={373}
      />
    </div>
    <h1 className="text-[44px] font-bold leading-snug mb-10">
      Měň s námi Česko k lepšímu!
    </h1>
    <p className="max-w-prose">
      Je nás už více než 5 300. Expertní dobrovolníci a zaměstnanci, členové
      neziskovek a státní správy, partneři a nadšenci. My všichni tvoříme
      komunitu, která pomáhá veřejné sféře s efektivním využíváním digitálních
      technologií.
    </p>
    <div className="max-w-prose aspect-video -mx-5 sm:mx-0">
      <iframe
        src="https://www.youtube-nocookie.com/embed/gwxVBjlG8iQ"
        width="100%"
        height="100%"
        title="Vítejte v Česko.Digital"
        allowFullScreen
      ></iframe>
    </div>
  </section>
);

/**
 * “Join Us” section with the Czechia map and profile picture pins
 *
 * The `div` on the right side that contains the map is constrained to the
 * map aspect ratio to make positioning of the pins easier.
 */
const JoinUs = () => (
  <section className="max-w-content m-auto py-10 px-5 text-lg">
    <h2 className="text-it mt-0 leading-snug">
      Staň se součástí komunity Česko.Digital
    </h2>
    <div className="border-[1px] border-gray rounded-md p-6 lg:p-10 grid lg:grid-cols-3 gap-6 max-w-prose lg:max-w-none">
      <div>
        <p className="mt-0">
          Projdi s námi krátkou registrací a řekni nám o sobě více. Ať už totiž
          pomocnou ruku hledáš nebo sám nabízíš, vždy budeš{" "}
          <b>nepostradatelným členem naší komunity</b>.
        </p>
        <p>
          Věříme, že ve sdílení je síla a že{" "}
          <b>každý z nás má ostatním co nabídnout</b>!
        </p>
        <Link href="/join/form" passHref={true}>
          <a className="btn-primary mt-10 inline-block mb-4">
            Registruj se do komunity →
          </a>
        </Link>
      </div>
      <div className="relative hidden lg:block col-span-2 w-full aspect-[711/393]">
        <CzechiaMapArrows />
        <ProfilePin image={AnezkaM} name="Anežka" top={75} left={70} />
        <ProfilePin image={AnezkaL} name="Anežka" top={45} left={95} />
        <ProfilePin image={Petr} name="Petr" top={35} left={5} />
        <ProfilePin image={Ondrej} name="Ondřej" top={75} left={85} />
        <ProfilePin image={Jakub} name="Jakub" top={80} left={35} />
        <ProfilePin image={RadekP} name="Radek" top={40} left={55} />
        <ProfilePin image={Martin} name="Martin" top={10} left={45} />
        <ProfilePin image={Eva} name="Eva" top={35} left={35} />
      </div>
    </div>
  </section>
);

type ProfilePinProps = {
  image: StaticImageData;
  name: string;
  top: number;
  left: number;
};

const ProfilePin: React.FC<ProfilePinProps> = ({ image, name, top, left }) => (
  <div style={{ position: "absolute", left: `${left}%`, top: `${top}%` }}>
    <div className="rounded-full w-[80px] h-[80px] -ml-[40px] -mt-[40px] overflow-clip">
      <Image src={image} alt={name} />
    </div>
  </div>
);

/** “How we work” section with basic collaboration info */
const HowWeWork = () => (
  <section className="bg-pebble">
    <div className="max-w-content m-auto py-10 px-5 text-lg">
      <h2 className="mb-12 mt-0 font-normal">Zjisti, jak pracujeme</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HowToBox
          title="Kde?"
          text="Online a z pohodlí svého domova, aby se mohl zapojit každý
            odkudkoliv."
          icon={OpennessIcon}
        />
        <HowToBox
          title="Kdy?"
          text="Ve volném čase – ráno, večer, přes víkend… Zkrátka dle našich
            časových možností."
          icon={EfficiencyIcon}
        />
        <HowToBox
          title="Jak?"
          text="Společně – v kolaborativních nástrojích, jako je Slack, Confluence,
          Jira, Miro, GitHub nebo Figma."
          icon={ProfessionalismIcon}
        />
      </div>
    </div>
  </section>
);

type HowToBoxProps = {
  title: string;
  text: string;
  icon: typeof OpennessIcon;
};

const HowToBox: React.FC<HowToBoxProps> = ({ title, text, icon: Icon }) => (
  <div>
    <div className="w-[80px] h-[80px]">
      <Icon width="100%" height="100%" />
    </div>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

/** “Why join?” section with user testimonials */
const WhyJoin = () => (
  <section className="max-w-content m-auto py-10 px-5 text-lg">
    <h2 className="mt-0 mb-12 font-normal">Proč se přidat do komunity?</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Testimonial
        name="Petra Fritsch"
        image={Petra}
        title="Dobrovolnice Česko.Digital"
        blurb="V Česko.Digital cítím, že jsem skutečně součástí týmu, a neustále se učím novým věcem. Nikdy bych nevěřila, že se budu podílet na projektu, kde mohu spojit psychologii s digitalizací."
      />
      <Testimonial
        name="Radek Hábl"
        image={RadekH}
        title="Zakladatel Institutu prevence a řešení předlužení"
        blurb="Česko.Digital přináší know-how v oblasti digitálních technologií a pomáhá vytvářet smysluplné projekty. Setkávám se s lidmi, kteří mají zájem předat své zkušenosti, a sám se při spolupráci odborně posouvám v mnoha mně dosud neznámých oblastech."
      />
      <Testimonial
        name="Julia Szymanska"
        image={Julia}
        title="Employee Engagement manager, Avast Foundation"
        blurb="Díky spolupráci s Česko.Digital můžeme pomáhat neziskovým organizacím vytvářet programy pro rozvoj, na které samy kapacitně nestačí. Expertní dobrovolnictví je také jednou ze základních hodnot společnosti Avast. Naši zaměstnanci mají tak možnost se hojně zapojovat do smysluplných projektů, které rozvíjí nejen širokou společnost, ale i je samotné."
      />
    </div>
  </section>
);

type TestimonialProps = {
  name: string;
  title: string;
  blurb: string;
  image: StaticImageData;
};

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  title,
  blurb,
  image,
}) => (
  <div>
    <div className="flex flex-row gap-4">
      <div className="rounded-full overflow-clip w-[80px] h-[80px] shrink-0">
        <Image src={image} alt={name} />
      </div>
      <div className="border-1 text-sm">
        <h3 className="mt-1 mb-0">{name}</h3>
        <p className="mt-0">{title}</p>
      </div>
    </div>
    <p>{blurb}</p>
  </div>
);

/** “Contact us” section with contact info */
const ContactUs = () => (
  <section className="bg-pebble text-lg">
    <div className="relative max-w-content m-auto py-20 px-5">
      <div className="hidden lg:block absolute right-[100px] top-[10px] opacity-50">
        <Image
          src="/images/onboarding/round-blobs.svg"
          alt=""
          width={245}
          height={233}
        />
      </div>
      <h2 className="mt-0 leading-snug">Chceš se ještě na něco doptat?</h2>
      <p>
        Napiš nám na{" "}
        <a href="mailto:pomoc@cesko.digital">pomoc@cesko.digital</a>, rádi
        pomůžeme!
      </p>
    </div>
  </section>
);

export default Page;
