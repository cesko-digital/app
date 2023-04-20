import sourceData from "./districts.json";

const parseCoords = (input: string) =>
  input.replace("N", "").replace("E", "").split(/,\s*/).map(parseFloat);

export const districts: Record<string, number[]> = Object.fromEntries(
  sourceData
    .filter(({ coords }) => coords !== "")
    .map(({ name, coords }) => [name, parseCoords(coords)])
);
