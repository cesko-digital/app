import { usePapaParse } from "react-papaparse";

import { getAllMetricSamples, type MetricSample } from "~/src/data/metrics";
import { ContentType } from "~/src/utils";

const mockDAata = [
  {
    date: "červenec 23",
    value: 214,
  },
  {
    date: "srpen 23",
    value: 211,
  },
  {
    date: "září 23",
    value: 222,
  },
  {
    date: "říjen 23",
    value: 195,
  },
  {
    date: "listopad 23",
    value: 193,
  },
  {
    date: "prosinec 23",
    value: 115,
  },
  {
    date: "leden 23",
    value: 177,
  },
];

type Props = {
  params: {
    slug: string;
  };
};

export async function GET(_: Request, { params }: Props): Promise<Response> {
  const { slug } = params;

  const { jsonToCSV } = usePapaParse();

  const compareSamplesByDate = (a: MetricSample, b: MetricSample) =>
    new Date(a.date).getTime() - new Date(b.date).getTime();

  const allSamples = await getAllMetricSamples();
  const samples = allSamples
    .filter((s) => s.metricSlug === params.slug)
    .sort(compareSamplesByDate);
  const createObject = (item: MetricSample) => {
    return { date: item.label ?? item.date, value: item.value };
  };

  const apiData = samples.map(createObject);

  console.log("api", apiData);
  const csv = jsonToCSV(apiData);
  console.log("csv", csv);

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": ContentType.csv,
      "Content-Disposition": `attachment; filename=${slug}.csv`,
    },
  });
}
