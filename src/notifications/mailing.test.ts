import assert from "node:assert";
import test from "node:test";

import { renderNotificationMailSubject, renderRole } from "./mailing";

test("Render notification e-mail subject", () => {
  assert.equal(
    renderNotificationMailSubject([{ name: "Krotitel tygrů" }]),
    "Česko.Digital hledá: Krotitel tygrů",
  );
  assert.equal(
    renderNotificationMailSubject([
      { name: "Krotitel tygrů" },
      { name: "Masér varanů" },
    ]),
    "Česko.Digital hledá dvě nové role",
  );
  assert.equal(
    renderNotificationMailSubject([
      { name: "Krotitel tygrů" },
      { name: "Masér varanů" },
      { name: "Krotitel tygrů" },
      { name: "Masér varanů" },
      { name: "Krotitel tygrů" },
      { name: "Masér varanů" },
    ]),
    "Česko.Digital hledá 6 nových rolí",
  );
});

test("Role rendering", () => {
  assert.equal(
    renderRole({ name: "Krotitel tygrů", slug: "krotitel" }),
    `🔹 Krotitel tygrů
  https://app.cesko.digital/opportunities/krotitel
  `,
  );
});
