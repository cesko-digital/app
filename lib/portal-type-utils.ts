import { PortalPartner } from "./portal-types";

export function filterPartnersByCategory(
  partners: readonly PortalPartner[],
  category: ArrayElement<PortalPartner["categories"]>
) {
  return partners.filter((p) => p.categories.some((c) => c === category));
}

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
