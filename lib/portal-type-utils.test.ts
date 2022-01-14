import { getEventDuration } from "./portal-type-utils";

test("Get event duration", () => {
  // No result for same dates
  expect(
    getEventDuration({
      startTime: "2022-01-14T14:00:00.00Z",
      endTime: "2022-01-14T14:00:00.00Z",
    })
  ).toBe(null);
  // No result when end time is missing
  expect(
    getEventDuration({
      startTime: "2022-01-14T14:00:00.00Z",
      endTime: undefined,
    })
  ).toBe(null);
  // Shorter duration in minutes
  expect(
    getEventDuration({
      startTime: "2022-01-14T14:00:00.00Z",
      endTime: "2022-01-14T15:00:00.00Z",
    })
  ).toBe("60 minut");
  // Longer duration in hours
  expect(
    getEventDuration({
      startTime: "2022-01-14T14:00:00.00Z",
      endTime: "2022-01-14T17:00:00.00Z",
    })
  ).toBe("3 hodiny");
  // Longer duration in hours
  expect(
    getEventDuration({
      startTime: "2022-01-14T14:00:00.00Z",
      endTime: "2022-01-14T19:00:00.00Z",
    })
  ).toBe("5 hodin");
});
