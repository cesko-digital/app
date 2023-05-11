import { CzechiaMapArrows } from "components/illustrations";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
  AnezkaL,
  AnezkaM,
  Jakub,
  Ondrej,
  Petr,
  PetrB,
  RadekP,
  Martin,
  Eva,
} from "./images";

/**
 * “Join Us” section with the Czechia map and profile picture pins
 *
 * The `div` on the right side that contains the map is constrained to the
 * map aspect ratio to make positioning of the pins easier.
 */
export const JoinUsBox = () => (
  <section className="max-w-content m-auto py-10 px-5 text-lg">
    <h2 className="text-it mt-0 leading-snug">
      Staň se součástí komunity Česko.Digital
    </h2>
    <div className="border-[1px] border-gray rounded-md p-6 lg:p-10 grid lg:grid-cols-3 gap-6 max-w-prose lg:max-w-none">
      <div>
        <p className="mt-0">
          Ať už pomocnou ruku hledáš nebo sám nabízíš, vždy budeš{" "}
          <b>nepostradatelným členem naší komunity</b>.
        </p>
        <p>
          Věříme, že ve sdílení je síla a že{" "}
          <b>každý z nás má ostatním co nabídnout</b>!
        </p>
        <Link href="/join/form" className="btn-primary mt-10 inline-block mb-4">
          Registruj se do komunity →
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
        <ProfilePin image={PetrB} name="Petr" top={55} left={25} />
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
      <Image src={image} alt={name} width={80} height={80} />
    </div>
  </div>
);
