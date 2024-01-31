import {
  getAllMetricDefinitions,
  getAllMetricSamples,
} from "~/src/data/metrics";
import { ContentType } from "~/src/utils";

type Props = {
  params: {
    slug: string;
  };
};

export async function GET(_: Request, { params }: Props): Promise<Response> {
  const { slug } = params;
  const allMetrics = await getAllMetricDefinitions();
  const metric = allMetrics.find((m) => m.slug === slug);
  if (!metric) {
    return new Response("Not found", { status: 404 });
  }

  let response = `Datum,${metric.name}\n`;

  const samples = await getAllMetricSamples(slug);
  samples.forEach((s) => {
    response += `${s.date},${s.value},${s.label ?? ""}\n`;
  });

  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": ContentType.csv,
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
    },
  });
}
