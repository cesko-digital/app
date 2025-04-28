import { type Contact } from "./contact";
import { diff } from "./import";

test("Null diff", () => {
  expect(diff({}, {})).toEqual({});
});

test("Add prop", () => {
  expect(diff<Contact>({}, { name: "Miles" })).toEqual({ name: "Miles" });
});

test("Change prop", () => {
  expect(diff<Contact>({ name: "Miles" }, { name: "Dizzy" })).toEqual({
    name: "Dizzy",
  });
});

test("Delete prop", () => {
  expect(diff<Contact>({ name: "Miles" }, {})).toEqual({
    name: undefined,
  });
});
