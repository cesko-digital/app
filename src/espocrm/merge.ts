import { unique } from "~/src/utils";

export type MergeRules<Entity> = {
  /** If there is just one defined value, we take that. Otherwise it’s a fatal conflict. */
  immutableProps: Array<keyof Entity>;
  /** If there is just one defined value, we take that. Otherwise right-hand side wins. */
  updatableProps: Array<keyof Entity>;
  /** If there is just one defined value, we take that. Otherwise merge with given function. */
  mergableProps: {
    [K in keyof Entity]?: (
      a: NonNullable<Entity[K]>,
      b: NonNullable<Entity[K]>,
    ) => Entity[K];
  };
  /** God knows. Do your own thing with a custom merge function. */
  magicProps: {
    [K in keyof Entity]?: (
      a: Partial<Entity>,
      b: Partial<Entity>,
      merged: Partial<Entity>,
    ) => void;
  };
};

export function mergeEntities<Entity>(
  a: Partial<Entity>,
  b: Partial<Entity>,
  rules: MergeRules<Entity>,
): Partial<Entity> {
  const merged: Partial<Entity> = {};

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

  // Magic props
  for (const [key, merge] of entries(rules.magicProps)) {
    const valA = a[key];
    const valB = b[key];
    if (valA || valB) {
      merge!(a, b, merged);
    }
  }

  return merged;
}

export const mergeArrays = <T>(a: ReadonlyArray<T>, b: ReadonlyArray<T>) =>
  unique([...a, ...b]);

export const mergeDelimitedArrays =
  (separator: string) => (a: string, b: string) =>
    mergeArrays(
      a.split(new RegExp(separator + "\\s*")),
      b.split(new RegExp(separator + "\\s*")),
    ).join(separator + " ");

function entries<
  T extends Record<PropertyKey, unknown>,
  K extends keyof T,
  V extends T[K],
>(o: T) {
  return Object.entries(o) as [K, V][];
}
