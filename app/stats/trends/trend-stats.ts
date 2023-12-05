import { buildCsvContent, CsvLine, CsvWriteLine } from "./csv";

const RomanNumbers = [
  "",
  "C",
  "CC",
  "CCC",
  "CD",
  "D",
  "DC",
  "DCC",
  "DCCC",
  "CM",
  "",
  "X",
  "XX",
  "XXX",
  "XL",
  "L",
  "LX",
  "LXX",
  "LXXX",
  "XC",
  "",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
];

/**
 * Returns a month (in roman numerals) and year (in two digits) for the given date.
 */
export function romanize(num: number): string {
  const digits = num.toString().split("");

  let roman = "";
  let i = 3;
  while (i--) {
    let value = digits.pop();

    if (typeof value === "undefined") {
      break;
    }

    roman = (RomanNumbers[+value + i * 10] || "") + roman;
  }
  return Array(+digits.join("") + 1).join("M") + roman;
}

/**
 * Returns a month (in roman numerals) and year (in two digits) for the given date.
 *
 * @example monthColumn(new Date(2021, 0, 1)) // returns "I21"
 */
export function getMonthColumn(date: Date): string {
  return (
    romanize(date.getMonth() + 1) +
    "." +
    date.getFullYear().toString().substring(2, 4)
  );
}

/**
 * Key contains date (trend index) in string (toDateString) and value contains number sum value for the given date..
 */
export type TrendData = { [key: string]: number[] };
/**
 * Contains date of the trand value, and optional value that is summed to the given trend date SUM.
 */
export interface TrendValue {
  date: Date;
  value?: number;
}

export type WriteTrendValue = (trendValue: TrendValue) => void;
export type GenerateTrendMethod = (
  writeTrendValue: WriteTrendValue,
) => Promise<void>;

export interface GenerateChildTrend {
  title: string;
  generate: GenerateTrendMethod;
}

export type GenerateTrend = GenerateTrendMethod | GenerateChildTrend[];

export interface TrendOptions {
  fromYear: number | null;
  toYear: number | null;
  autoFill: boolean;
}

/***
 * Generates trend CSV export with ability to customize the trend generation from request parameters:
 *
 * - Trend can be filtered by year (?year=X) or by year range (?from=X,?to=X).
 * - By default the trend is generated from first to last month of the given year range, can be turned off by ?fill=false.
 */
export async function buildTrendStats(
  options: TrendOptions,
  generateTrend: GenerateTrend,
): Promise<string | null> {
  // We want to build a trend by each month / year. First we will sum all trend values in each month.
  // Then we will construct whole trend by filling the missing months with 0.
  // For this we need to know the earliest and latest date.
  const trend: TrendData = {};
  let earliestDate: Date | null = null;
  let latestDate: Date | null = null;

  function writeTrendData(trendValue: TrendValue, trendIndex: number) {
    const trendDate = new Date(
      trendValue.date.getFullYear(),
      trendValue.date.getMonth(),
      1,
    );

    // Filter out the data by the given year range
    if (
      options.fromYear !== null &&
      trendDate.getFullYear() < options.fromYear
    ) {
      return;
    }

    if (options.toYear !== null && trendDate.getFullYear() > options.toYear) {
      return;
    }

    if (earliestDate === null || trendDate < earliestDate) {
      earliestDate = trendDate;
    }

    if (latestDate === null || trendDate > latestDate) {
      latestDate = trendDate;
    }

    const trendKey = trendDate.toDateString();
    if (typeof trend[trendKey] === "undefined") {
      trend[trendKey] = [];
    }

    trend[trendKey][trendIndex] =
      (trend[trendKey][trendIndex] || 0) + (trendValue.value ?? 1);
  }

  const headers: CsvLine = ["Měsíc a rok"];
  if (typeof generateTrend === "function") {
    headers.push("Počet");
    await generateTrend((trendValue: TrendValue) => {
      writeTrendData(trendValue, 0);
    });
  } else {
    for (const childIndex in generateTrend) {
      const childTrend = generateTrend[childIndex];
      headers.push(childTrend.title);

      await childTrend.generate((trendValue: TrendValue) => {
        writeTrendData(trendValue, parseInt(childIndex));
      });
    }
  }

  if (earliestDate === null || latestDate === null) {
    return null;
  }

  return buildCsvContent(headers, function (write: CsvWriteLine) {
    const fromYearSetting = options.fromYear
      ? options.fromYear
      : earliestDate!.getFullYear();
    const toYearSetting = options.toYear
      ? options.toYear
      : latestDate!.getFullYear();

    const startDate = new Date(
      fromYearSetting,
      options.autoFill ? 0 : earliestDate!.getMonth(),
      1,
    );
    const endDate = new Date(
      toYearSetting,
      options.autoFill ? 11 : latestDate!.getMonth(),
      1,
    );

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setMonth(date.getMonth() + 1)
    ) {
      const trendKey = date.toDateString();

      const columns = [getMonthColumn(date)];

      for (const index in headers) {
        const id = parseInt(index);
        if (id == 0) {
          continue;
        }

        const value = trend[trendKey] && trend[trendKey][id - 1];

        columns.push((value ?? 0).toString());
      }

      write(columns);
    }
  });
}
