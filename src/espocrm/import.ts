import {
  createObject,
  getAllObjects,
  getObjectById,
  updateObject,
  type BaseEntity,
  type Entity,
} from "~/src/espocrm/espo";
import { mergeEntities } from "~/src/espocrm/merge";

//
// Import
//

export async function importObjects<E extends BaseEntity>({
  entity,
  newValues,
  isEqual,
  apiKey,
  dryRun = false,
}: {
  entity: Entity<E>;
  newValues: ReadonlyArray<Partial<E>>;
  isEqual: (a: Partial<E>, b: Partial<E>) => boolean;
  apiKey: string;
  dryRun?: boolean;
}) {
  if (dryRun) {
    console.warn("*** Dry run, no changes to database will be done.");
  }

  console.log(`Downloading all existing ${entity.pluralName}.`);
  const previousItems = await getAllObjects(entity, apiKey);
  console.log(`Downloaded ${previousItems.length} ${entity.pluralName}.`);

  const findPrevious = (newItem: Partial<E>) =>
    previousItems.find((previousItem) => isEqual(newItem, previousItem));
  const havePreviousVersionOf = (newItem: Partial<E>) =>
    !!findPrevious(newItem);
  const itemsToCreate = newValues.filter(
    (newItem) => !havePreviousVersionOf(newItem),
  );
  console.log(`Inserting ${itemsToCreate.length} new ${entity.pluralName}.`);
  for (const newItem of itemsToCreate) {
    try {
      if (!dryRun) {
        await createObject(entity, apiKey, newItem);
      }
    } catch (e) {
      console.error(`Failed to create new ${entity.singularName}:`);
      console.error(JSON.stringify(newItem, null, 2));
      console.error(e);
    }
  }

  const itemsToUpdate = newValues.filter(havePreviousVersionOf);
  for (const updatedItem of itemsToUpdate) {
    // The listing API endpoints don’t include all properties,
    // so we have to fetch the object individually here to make
    // sure we see everything.
    const id = findPrevious(updatedItem)!.id;
    const savedItem = await getObjectById(entity, apiKey, id);
    const mergedItem = mergeEntities(savedItem, updatedItem, entity.mergeRules);
    const patch = diff(savedItem, mergedItem);
    if (Object.keys(patch).length > 0) {
      console.log(`Will update ${entity.singularName} ${id}:`);
      console.log(JSON.stringify(patch, null, 2));
      try {
        if (!dryRun) {
          await updateObject(entity, apiKey, { ...patch, id });
        }
      } catch (e) {
        console.error(`Failed to update ${entity.singularName} ${id}:`);
        console.error(e);
      }
    } else {
      console.log(`Skipping ${entity.singularName} ${id}, no update needed.`);
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
