import { getEventDuration } from "./portal-type-utils";

describe("Get event duration", () => {
  test("No result for same dates", () => {
    expect(
      getEventDuration({
        startTime: "2022-01-14T14:00:00.00Z",
        endTime: "2022-01-14T14:00:00.00Z",
      })
    ).toBe(null);
  });
  test("No result when end time is missing", () => {
    expect(
      getEventDuration({
        startTime: "2022-01-14T14:00:00.00Z",
        endTime: undefined,
      })
    ).toBe(null);
  });
  test("Shorter duration in minutes", () => {
    expect(
      getEventDuration({
        startTime: "2022-01-14T14:00:00.00Z",
        endTime: "2022-01-14T15:00:00.00Z",
      })
    ).toBe("60 minut");
  });
  test("Longer duration in hours", () => {
    expect(
      getEventDuration({
        startTime: "2022-01-14T14:00:00.00Z",
        endTime: "2022-01-14T17:00:00.00Z",
      })
    ).toBe("3 hodiny");
  });
  test("Longer duration in hours", () => {
    expect(
      getEventDuration({
        startTime: "2022-01-14T14:00:00.00Z",
        endTime: "2022-01-14T19:00:00.00Z",
      })
    ).toBe("5 hodin");
  });
});
