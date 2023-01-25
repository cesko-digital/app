import {
  record,
  DecoderFunction,
  array,
  string,
  number,
} from "typescript-json-decoder";

const apiKey = process.env.PLAUSIBLE_API_KEY || "";

type Metric =
  | "visitors"
  | "pageviews"
  | "bounce_rate"
  | "visit_duration"
  | "events"
  | "visits";

type Endpoint = "aggregate" | "timeseries" | "breakdown";

type Property = "event:page" | "visit:source";

type Query = Partial<{
  site: string;
  endpoint: Endpoint;
  metrics: Metric[];
  properties: Property[];
  period: string;
  limit: number;
}>;

function buildUrl(query: Query): string {
  const apiRoot = "https://plausible.io/api/v1";
  const {
    site = "cesko.digital",
    endpoint = "aggregate",
    metrics = ["pageviews"],
    period = "30d",
    properties = ["event:page"],
    limit = 1000,
  } = query;
  const params = new URLSearchParams({
    metrics: metrics.join(","),
    property: properties.join(","),
    site_id: site,
    limit: limit.toString(),
    period,
  });
  return `${apiRoot}/stats/${endpoint}?${params}`;
}

async function fetchQuery<T>(query: Query, decoder: DecoderFunction<T>) {
  const decodeWrapper = <T>(decoder: DecoderFunction<T>) =>
    record({
      results: decoder,
    });
  return await fetch(buildUrl(query), {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
    .then((response) => response.json())
    .then(decodeWrapper(decoder))
    .then((wrapper) => wrapper.results);
}

export async function getPageBreakdown(period = "30d") {
  return fetchQuery(
    {
      endpoint: "breakdown",
      properties: ["event:page"],
      metrics: ["pageviews", "visitors"],
      period,
    },
    array(record({ page: string, pageviews: number, visitors: number }))
  );
}
