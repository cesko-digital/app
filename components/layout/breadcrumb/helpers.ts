import { Crumb } from "./index";

export function transformCrumbs(crumbs: Crumb[]): {
  firstCrumbs: Crumb[];
  lastCrumb: Crumb;
} {
  const lastCrumbIndex = crumbs.length - 1;
  return {
    firstCrumbs: crumbs.slice(0, lastCrumbIndex),
    lastCrumb: crumbs[lastCrumbIndex],
  };
}

export function areCrumbsValid(crumbs: Crumb[]): boolean {
  return Array.isArray(crumbs) && crumbs.length !== 0;
}
