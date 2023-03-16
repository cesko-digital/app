import { renderNotificationMailSubject } from "./notifications";

test("Render notification e-mail subject", () => {
  expect(renderNotificationMailSubject([{ name: "Krotitel tygrů" }])).toBe(
    "Česko.Digital hledá: Krotitel tygrů"
  );
  expect(
    renderNotificationMailSubject([
      { name: "Krotitel tygrů" },
      { name: "Masér varanů" },
    ])
  ).toBe("Česko.Digital hledá dvě nové role");
  expect(
    renderNotificationMailSubject([
      { name: "Krotitel tygrů" },
      { name: "Masér varanů" },
      { name: "Krotitel tygrů" },
      { name: "Masér varanů" },
      { name: "Krotitel tygrů" },
      { name: "Masér varanů" },
    ])
  ).toBe("Česko.Digital hledá 6 nových rolí");
});
