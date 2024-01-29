"use client";

import { type ReactNode } from "react";

import { MetricsTab } from "~/app/stats/Metrics";
import { SimpleTabBar } from "~/components/TabBar";
import { type MetricDefinition, type MetricSample } from "~/src/data/metrics";

export type Props = {
  metrics: MetricDefinition[];
  samples: MetricSample[];
};

export const StatsTabBar = ({ metrics, samples }: Props) => (
  <SimpleTabBar
    items={[
      {
        title: "Metriky",
        hash: "metrics",
        content: <MetricsTab metrics={metrics} samples={samples} />,
      },
      {
        title: "Nově příchozí",
        hash: "newcomers",
        content: (
          <Section>
            <DatawrapperChart id="M1Dm2" />
            <DatawrapperChart id="pjTY2" />
          </Section>
        ),
      },
      {
        title: "Dovednosti",
        hash: "skills",
        content: (
          <Section>
            <div className="flex flex-col gap-7">
              <DatawrapperChart id="UkUYc" />
              <DatawrapperChart id="GiFlp" />
            </div>
            <DatawrapperChart id="fDpOz" />
          </Section>
        ),
      },
      {
        title: "Regionální rozložení",
        hash: "regions",
        content: (
          <Section>
            <DatawrapperChart id="SopS3" />
            <DatawrapperChart id="jPwHK" />
          </Section>
        ),
      },
      {
        title: "Hledané role",
        hash: "roles",
        content: (
          <Section>
            <DatawrapperChart id="VZWTt" />
            <DatawrapperChart id="5SpWg" />
          </Section>
        ),
      },
    ]}
  />
);

// TBD: The interactive Datawrapper charts are currently broken
// in this setup, so we use the static images instead. It would be nice
// to find a working version with the interactive charts.
const DatawrapperChart = ({ id }: { id: string }) => (
  <img key={id} src={`https://datawrapper.dwcdn.net/${id}/full.png`} alt="" />
);

const Section = ({ children }: { children: ReactNode }) => (
  <section className="mb-20 grid gap-7 md:grid-cols-2">{children}</section>
);
