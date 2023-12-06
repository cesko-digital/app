import { type ReactNode } from "react";

import { Breadcrumbs } from "~/components/Breadcrumbs";

import { DatawrapperChart } from "./DatawrapperChart";

const Page = async () => {
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Statistiky"
      />

      <h1 className="typo-title mb-10 mt-7">Statistiky</h1>

      <SectionHeading>Základy</SectionHeading>
      <Section>
        <DatawrapperChart id="M1Dm2" />
        <DatawrapperChart id="pjTY2" />
      </Section>

      <SectionHeading>Dovednosti</SectionHeading>
      <Section>
        <div className="flex flex-col gap-7">
          <DatawrapperChart id="UkUYc" />
          <DatawrapperChart id="GiFlp" />
        </div>
        <DatawrapperChart id="fDpOz" />
      </Section>

      <SectionHeading>Regionální rozložení</SectionHeading>
      <Section>
        <DatawrapperChart id="SopS3" />
        <DatawrapperChart id="jPwHK" />
      </Section>

      <SectionHeading>Hledané role</SectionHeading>
      <Section>
        <DatawrapperChart id="VZWTt" />
        <DatawrapperChart id="5SpWg" />
      </Section>
    </main>
  );
};

const Section = ({ children }: { children: ReactNode }) => (
  <section className="mb-20 grid gap-7 md:grid-cols-2">{children}</section>
);

const SectionHeading = ({ children }: { children: ReactNode }) => (
  <h2 className="typo-title2 bg-pebble p-7">{children}</h2>
);

export default Page;
