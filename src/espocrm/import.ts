import { type BaseEntity } from "./espo";
import { mergeEntities, type MergeRules } from "./merge";

type ImportParams<E extends BaseEntity> = {
  existingValues: Partial<E>[];
  newValues: Partial<E>[];
  isEqual: (a: Partial<E>, b: Partial<E>) => boolean;
  createValue: (value: Partial<E>) => Promise<unknown>;
  updateValue: (value: Partial<E> & Pick<E, "id">) => Promise<unknown>;
  getValueById: (id: string) => Promise<E>;
  mergeRules?: MergeRules<E>;
  dryRun?: boolean;
  singularName?: string;
  pluralName?: string;
};

// TBD: Merge duplicates in newValues
export async function importCRMObjects<E extends BaseEntity>({
  dryRun = false,
  existingValues,
  isEqual,
  newValues,
  createValue,
  updateValue,
  getValueById,
  mergeRules,
  singularName = "item",
  pluralName = "items",
}: ImportParams<E>) {
  if (dryRun) {
    console.warn("*** Dry run, no changes to database will be done.");
  }

  console.log(
    `Got ${existingValues.length} existing ${pluralName}, importing ${newValues.length} new.`,
  );

  const findPrevious = (newItem: Partial<E>) =>
    existingValues.find((previousItem) => isEqual(newItem, previousItem));
  const havePreviousVersionOf = (newItem: Partial<E>) =>
    !!findPrevious(newItem);
  const itemsToCreate = newValues.filter(
    (newItem) => !havePreviousVersionOf(newItem),
  );
  console.log(`Creating ${itemsToCreate.length} new ${pluralName}.`);
  for (const newItem of itemsToCreate) {
    try {
      if (!dryRun) {
        await createValue(newItem);
      } else {
        console.log(JSON.stringify(newItem, null, 2));
      }
    } catch (e) {
      console.error(`Failed to create new ${singularName}:`);
      console.error(JSON.stringify(newItem, null, 2));
      console.error(e);
    }
  }

  if (!mergeRules) {
    console.warn(
      `Skipping updates, merge rules not defined for ${pluralName}.`,
    );
    return;
  }

  const itemsToUpdate = newValues.filter(havePreviousVersionOf);
  for (const updatedItem of itemsToUpdate) {
    // The listing API endpoints don’t include all properties,
    // so we have to fetch the object individually here to make
    // sure we see everything.
    const id = findPrevious(updatedItem)!.id!;
    const savedItem = await getValueById(id);
    const mergedItem = mergeEntities(savedItem, updatedItem, mergeRules);
    const patch = diff(savedItem, mergedItem);
    if (Object.keys(patch).length > 0) {
      console.log(
        `Found existing ${singularName} ${id} (${savedItem.name}), will update:`,
      );
      console.log(JSON.stringify(patch, null, 2));
      try {
        if (!dryRun) {
          await updateValue({ ...patch, id });
        }
      } catch (e) {
        console.error(`Failed to update ${singularName} ${id}:`);
        console.error(e);
      }
    } else {
      console.log(
        `Found existing ${singularName} ${id} (${savedItem.name}), no update needed.`,
      );
    }
  }
}

/** What do we need to change on `a` to get `b`? */
export function diff<T>(a: Partial<T>, b: Partial<T>): Partial<T> {
  const patch: Partial<T> = {};
  for (const key of Object.keys(b) as Array<keyof T>) {
    const valA = JSON.stringify(a[key]);
    const valB = JSON.stringify(b[key]);
    if (valA !== valB) {
      patch[key] = b[key];
    }
  }
  return patch;
}

//
// Import Helpers
//

export const map = <T, U>(value: T | undefined, f: (val: T) => U) =>
  value ? f(value) : undefined;

export const stripWhitespaceAround = (s: string) =>
  s.replaceAll(/^\s+/g, "").replaceAll(/\s+$/g, "");

/** Strip extra whitespace around value */
export function normalize(value: string): string;
export function normalize(value: string | undefined): string | undefined;
export function normalize(value: string | undefined): string | undefined {
  return map(value, stripWhitespaceAround);
}

export function normalizeWebsiteUrl(value: string): string | undefined {
  // Strip whitespace
  value = stripWhitespaceAround(value);

  // Add missing scheme
  value = value.replace(/^www\./, "https://www.");
  // Convert HTTP to HTTPS
  value = value.replace(/^http:\/\//, "https://");
  // Add missing scheme to naked domains
  if (!value.startsWith("https://")) {
    value = "https://" + value;
  }

  // Return `undefined` if the result does not parse
  try {
    const parsed = new URL(value);
    return parsed.origin;
  } catch {
    return undefined;
  }
}
