import { calculateTrend, getTrendDirection } from "~/src/data/metrics";

test("Calculate metric trends", () => {
  expect(calculateTrend([3, 6])).toBe(100);
  expect(calculateTrend([4, 2])).toBe(-50);
  expect(calculateTrend([1])).toBeUndefined();
  expect(calculateTrend([])).toBeUndefined();
  expect(calculateTrend([3, 7.65])).toBe(155);
  expect(calculateTrend([3, 0.01])).toBe(-100);
});

test("Calculate trend direction", () => {
  expect(getTrendDirection(-10, "moreIsBetter")).toBe("worse");
  expect(getTrendDirection(10, "moreIsBetter")).toBe("better");
  expect(getTrendDirection(-10, "lessIsBetter")).toBe("better");
  expect(getTrendDirection(10, "lessIsBetter")).toBe("worse");
  expect(getTrendDirection(0, "lessIsBetter")).toBe("unchanged");
});
