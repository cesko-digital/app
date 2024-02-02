import { getMonthColumn } from "./trend-stats";

test("Month column returns a month (in roman numerals) and year (in two digits) for the given date.", () => {
  // Test all months in 2022 agains expected values
  const expected = [
    "I.22",
    "II.22",
    "III.22",
    "IV.22",
    "V.22",
    "VI.22",
    "VII.22",
    "VIII.22",
    "IX.22",
    "X.22",
    "XI.22",
    "XII.22",
  ];
  for (let i = 0; i < 12; i++) {
    const date = new Date(2022, i, 1);
    expect(getMonthColumn(date)).toEqual(expected[i]);
  }
});
