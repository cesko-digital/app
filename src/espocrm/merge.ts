import { type Contact, type EmailAddressData } from "~/src/espocrm/espo";
import { unique } from "~/src/utils";

type MergeFunction<Entity, K extends keyof Entity> = (
  a: NonNullable<Entity[K]>,
  b: NonNullable<Entity[K]>,
) => Entity[K];

export type MergeRules<Entity> = {
  /** If there is just one defined value, we take that. Otherwise it’s a fatal conflict. */
  immutableProps: Array<keyof Entity>;
  /** If there is just one defined value, we take that. Otherwise right-hand side wins. */
  updatableProps: Array<keyof Entity>;
  /** If there already is a value, keep that. Otherwise set. */
  readOnlyAfterCreatePops: Array<keyof Entity>;
  /** If there is just one defined value, we take that. Otherwise merge with given function. */
  mergableProps: {
    [K in keyof Entity]?: MergeFunction<Entity, K>;
  };
};

export function mergeEntities<E>(
  a: Partial<E>,
  b: Partial<E>,
  rules: MergeRules<E>,
): Partial<E> {
  const merged: Partial<E> = {};

  // Immutable props
  for (const key of rules.immutableProps) {
    const valA = a[key];
    const valB = b[key];
    if (valA && valB && valA !== valB) {
      throw new Error(
        `Merge impossible because of conflict on ${String(key)} (${valA} vs ${valB}).`,
      );
    }
    if (valA || valB) {
      merged[key] = valA ?? valB;
    }
  }

  // Updatable props
  for (const key of rules.updatableProps) {
    const valA = a[key];
    const valB = b[key];
    if (valA || valB) {
      merged[key] = b[key] ?? a[key];
    }
  }

  // Mergable props
  for (const [key, merge] of entries(rules.mergableProps)) {
    const valA = a[key];
    const valB = b[key];
    if (valA && valB) {
      merged[key] = merge!(valA, valB);
    } else if (valA || valB) {
      merged[key] = valB ?? valA;
    } else {
      // nothing
    }
  }

  // Read-only after create props
  for (const key of rules.readOnlyAfterCreatePops) {
    const valA = a[key];
    const valB = b[key];
    if (valA || valB) {
      merged[key] = valA ?? valB;
    }
  }

  return merged;
}

//
// Common Merge Utils
//

export const mergeArrays = <T>(a: ReadonlyArray<T>, b: ReadonlyArray<T>) =>
  unique([...a, ...b]);

export const mergeArraysWithCustomEquality =
  <T>(isEqual: (a: T, b: T) => boolean) =>
  (a: ReadonlyArray<T>, b: ReadonlyArray<T>) => {
    const merged: T[] = [];
    for (const next of [...a, ...b]) {
      if (!merged.find((item) => isEqual(item, next))) {
        merged.push(next);
      }
    }
    return merged;
  };

export const mergeDelimitedArrays =
  (separator: string) => (a: string, b: string) =>
    mergeArrays(
      a.split(new RegExp(separator + "\\s*")),
      b.split(new RegExp(separator + "\\s*")),
    ).join(separator + " ");

export const mergeRecords = <T>(
  a: Record<string, T>,
  b: Record<string, T>,
) => ({ ...a, ...b });

export const mergeEmailAdddressData = <
  D extends Pick<EmailAddressData, "emailAddress"> & Partial<EmailAddressData>,
>(
  a: D[],
  b: D[],
): D[] => {
  const lc = (s: string) => s.toLocaleLowerCase();
  const isEqual = (a: D, b: D) => lc(a.emailAddress) === lc(b.emailAddress);
  const merged = mergeArraysWithCustomEquality(isEqual)(a, b);
  merged.forEach((a, idx) => (a.primary = idx === 0));
  return merged;
};

/**
 * Merge rules for contacts
 *
 * We intentionally skip all name-related fields here to keep
 * any name customizations and cleanups in CRM from being overwritten
 * by initial Airtable data.
 *
 * We also intentionally skip the `cDataSource` prop because it
 * should only be set when records are created, not updated.
 *
 * TBD: Move elsewhere to keep merge code above entirely general
 */
export const contactMergeRules: MergeRules<Contact> = {
  immutableProps: ["id", "cLegacyAirtableID"],
  updatableProps: [
    "cBio",
    "cOrganizationName",
    "cProfessionalProfileURL",
    "cProfilePictureURL",
    "cPublicContactEmail",
    "cSeniority",
    "cSlackUserID",
    "phoneNumber",
  ],
  readOnlyAfterCreatePops: ["createdAt"],
  mergableProps: {
    cPrivacyFlags: mergeArrays,
    cTags: mergeDelimitedArrays(";"),
    cOccupation: mergeDelimitedArrays(";"),
    cAvailableInDistricts: mergeDelimitedArrays(","),
    emailAddressData: mergeEmailAdddressData,
    accountsIds: mergeArrays,
    accountsNames: mergeRecords,
    accountsColumns: mergeRecords,
  },
};

export const haveCommonEmailAddress = (
  a: Partial<Contact>,
  b: Partial<Contact>,
) => {
  for (const candidateA of a.emailAddressData ?? []) {
    for (const candidateB of b.emailAddressData ?? []) {
      if (
        candidateA.emailAddress.toLocaleLowerCase() ===
        candidateB.emailAddress.toLocaleLowerCase()
      ) {
        return true;
      }
    }
  }
  return false;
};

//
// Internal Helpers
//

function entries<
  T extends Record<PropertyKey, unknown>,
  K extends keyof T,
  V extends T[K],
>(o: T) {
  return Object.entries(o) as [K, V][];
}
