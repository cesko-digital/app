import { TrendOptions } from "./trend-stats";

/**
 * Gets year query parameter (or custom) and returns it as number or null if it is not set or invalid.
 */
function getYear(query: URLSearchParams, key: string = "year"): number | null {
  const year = query.get(key);

  if (year === null) {
    return null;
  }
  if (year === "now") {
    return new Date().getFullYear();
  }

  if (year === "previous") {
    return new Date().getFullYear() - 1;
  }

  if (year.length === 4) {
    let number = parseInt(year);

    if (!isNaN(number)) {
      return number;
    }
  }

  return null;
}

/**
 * Gets bool query parameter. If not set, false is returned.
 */
function getBool(query: URLSearchParams, key: string): boolean {
  const fillYear = query.get(key);

  if (fillYear === null) {
    return false;
  }

  return fillYear === "true" || fillYear === "1";
}

export function buildTrendOptions(query: URLSearchParams): TrendOptions {
  const year = getYear(query);

  return {
    fromYear: getYear(query, "from") ?? year,
    toYear: getYear(query, "to") ?? year,
    autoFill: getBool(query, "fill"),
  };
}
