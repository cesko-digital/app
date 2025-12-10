import assert from "node:assert";
import test from "node:test";

import { calculateTrend, getTrendDirection } from "~/src/data/metrics";

test("Calculate metric trends", () => {
  assert.equal(calculateTrend([3, 6]), 100);
  assert.equal(calculateTrend([4, 2]), -50);
  assert.equal(calculateTrend([1]), 0);
  assert.equal(calculateTrend([]), 0);
  assert.equal(calculateTrend([3, 7.65]), 155);
  assert.equal(calculateTrend([3, 0.01]), -100);
});

test("Calculate trend direction", () => {
  assert.equal(getTrendDirection(-10, "moreIsBetter"), "worse");
  assert.equal(getTrendDirection(10, "moreIsBetter"), "better");
  assert.equal(getTrendDirection(-10, "lessIsBetter"), "better");
  assert.equal(getTrendDirection(10, "lessIsBetter"), "worse");
  assert.equal(getTrendDirection(0, "lessIsBetter"), "unchanged");
});
