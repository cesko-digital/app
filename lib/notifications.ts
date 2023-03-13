import { PortalOpportunity } from "./airtable/opportunity";
import { hashDigest, Route } from "./utils";

type Role = Pick<PortalOpportunity, "name" | "slug">;

const trimLeadingWhitespace = (s: string) => s.replaceAll(/^\s+/g, "");

export function renderNotificationMailBody(
  roles: Role[],
  recipientSlackId: string
): string {
  return `Ahoj!

  Posíláme přehled nových dobrovolnických rolí, které by tě mohly zajímat:

  ${roles.map(renderRole).join("\n")}

  Všechny hledané role najdeš na https://cesko.digital/opportunities.

  Ať se daří!
  tým Česko.Digital
  ahoj@cesko.digital

  PS. Pokud chceš tahle upozornění vypnout, stačí kliknout tady:

  ${getUnsubscribeUrl(recipientSlackId)}
  `
    .split("\n")
    .map(trimLeadingWhitespace)
    .join("\n");
}

export function renderRole(role: Role): string {
  return `🔹 ${role.name}
  https://cesko.digital${Route.toOpportunity(role)}
  `;
}

export function renderNotificationMailSubject(
  roles: Pick<PortalOpportunity, "name">[]
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

export const getUnsubscribeUrl = (slackId: string, confirm = false) => {
  const token = hashDigest(["unsubscribe", slackId]);
  const params = new URLSearchParams({ slackId, token });
  if (confirm) {
    params.append("confirm", "y");
  }
  return `https://cesko.digital/api/notifications/unsubscribe?${params}`;
};
