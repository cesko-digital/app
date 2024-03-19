import { type Opportunity } from "~/src/data/opportunity";
import { absolute, Route } from "~/src/routing";
import { hashDigest } from "~/src/utils";

type Role = Pick<Opportunity, "name" | "slug">;

const trimLeadingWhitespace = (s: string) => s.replaceAll(/^\s+/g, "");

export function renderNotificationMailBody(
  roles: Role[],
  recipientId: string,
): string {
  return `Ahoj!

  Posíláme přehled nových dobrovolnických rolí, které by tě mohly zajímat:

  ${roles.map(renderRole).join("\n")}

  Všechny hledané role najdeš na https://app.cesko.digital/opportunities.

  Ať se daří!
  tým Česko.Digital
  ahoj@cesko.digital

  PS. Pokud chceš tahle upozornění vypnout, stačí kliknout tady:

  ${absolute(unsubscribeRoute(recipientId))}
  `
    .split("\n")
    .map(trimLeadingWhitespace)
    .join("\n");
}

export function renderRole(role: Role): string {
  return `🔹 ${role.name}
  ${absolute(Route.toOpportunity(role))}
  `;
}

export function renderNotificationMailSubject(
  roles: Pick<Opportunity, "name">[],
): string {
  if (roles.length === 0) {
    throw "Expected at least one role, got zero.";
  } else if (roles.length === 1) {
    return `Česko.Digital hledá: ${roles[0].name}`;
  } else if (roles.length >= 2 && roles.length <= 4) {
    const words = ["_", "_", "dvě", "tři", "čtyři"];
    return `Česko.Digital hledá ${words[roles.length]} nové role`;
  } else {
    return `Česko.Digital hledá ${roles.length} nových rolí`;
  }
}

// TBD: Can we meld this into Route and use it in end-to-end unsubscribe tests?
export const unsubscribeRoute = (id: string, confirm = false) => {
  const token = hashDigest(["unsubscribe", id]);
  const params = new URLSearchParams({ id, token });
  if (confirm) {
    params.append("confirm", "y");
  }
  return `/profile/notifications/unsubscribe?${params}`;
};
