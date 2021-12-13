import { areCrumbsValid, transformCrumbs } from "./helpers";
import { Crumb } from "./index";

describe("Breadcrumb helpers", () => {
  describe("transformCrumbs", () => {
    it("should return object with last element and remaining items", () => {
      const LAST_CRUMB = { label: "Test 3", path: "/test-3" };
      const REMAINING_CRUMBS: Crumb[] = [
        { label: "Test", path: "/test" },
        { label: "Test 2", path: "/test-2" },
      ];
      expect(transformCrumbs([...REMAINING_CRUMBS, LAST_CRUMB])).toEqual({
        lastCrumb: LAST_CRUMB,
        firstCrumbs: REMAINING_CRUMBS,
      });
    });

    it("should not mutate passed array", () => {
      const CRUMBS: Crumb[] = [
        { label: "Test", path: "/test" },
        { label: "Test 2", path: "/test-2" },
      ];
      transformCrumbs(CRUMBS);
      expect(CRUMBS).toEqual([
        { label: "Test", path: "/test" },
        { label: "Test 2", path: "/test-2" },
      ]);
    });
  });

  describe("areCrumbsValid", () => {
    it("should return true for non empty array", () => {
      expect(areCrumbsValid([{ label: "Test", path: "/test" }])).toBeTruthy();
      expect(
        areCrumbsValid([
          { label: "Test", path: "/test" },
          { label: "Test 2", path: "/test-2" },
        ])
      ).toBeTruthy();
    });

    it("should return false for empty array", () => {
      expect(areCrumbsValid([])).toBeFalsy();
    });
  });
});
