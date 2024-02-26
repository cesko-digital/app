import { usePapaParse } from "react-papaparse";

import { getAllMetricSamples, type MetricSample } from "~/src/data/metrics";
import { ContentType } from "~/src/utils";

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

  const csv = jsonToCSV(apiData);

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": ContentType.csv,
      "Content-Disposition": `attachment; filename=${slug}.csv`,
    },
  });
}
