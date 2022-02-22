import { canSubmitForm } from "./reducer";

test("Can resubmit after error", () => {
  expect(
    canSubmitForm({
      name: "John Smith",
      email: "john@smith.name",
      selectedSkillIds: ["foo", "bar"],
      submissionState: "error",
    })
  ).toBe(true);
});

test("Can’t submit with no skills selected", () => {
  expect(
    canSubmitForm({
      name: "John Smith",
      email: "john@smith.name",
      selectedSkillIds: [],
      submissionState: "fillingIn",
    })
  ).toBe(false);
});
