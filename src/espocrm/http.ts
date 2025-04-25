import { type DecoderFunction } from "typescript-json-decoder";

const siteUrl = "https://crm.cesko.digital";
const buildUrl = (path: string) => `${siteUrl}/api/v1/${path}`;
const unwrapJson = (response: Response) => response.json();

const throwErrors = (response: Response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(
      `Fetch failed, response code ${response.status} (${response.statusText})`,
    );
  }
};

type CommonArgs<T> = {
  apiKey: string;
  path: string;
  decodeResponse: DecoderFunction<T>;
};

export const getJson = <T>({ apiKey, path, decodeResponse }: CommonArgs<T>) =>
  fetch(buildUrl(path), {
    headers: { "X-Api-Key": apiKey },
  })
    .then(throwErrors)
    .then(unwrapJson)
    .then(decodeResponse);

export const postJson = <T>({
  apiKey,
  path,
  decodeResponse,
  body,
}: CommonArgs<T> & { body: unknown }) =>
  fetch(buildUrl(path), {
    method: "POST",
    body: JSON.stringify(body, null, 2),
    headers: {
      "X-Api-Key": apiKey,
      "Content-type": "application/json",
    },
  })
    .then(throwErrors)
    .then(unwrapJson)
    .then(decodeResponse);

export const putJson = <T>({
  apiKey,
  path,
  decodeResponse,
  body,
}: CommonArgs<T> & { body: unknown }) =>
  fetch(buildUrl(path), {
    method: "PUT",
    body: JSON.stringify(body, null, 2),
    headers: {
      "X-Api-Key": apiKey,
      "Content-type": "application/json",
    },
  })
    .then(throwErrors)
    .then(unwrapJson)
    .then(decodeResponse);
