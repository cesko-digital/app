import {
  array,
  number,
  record,
  type DecoderFunction,
} from "typescript-json-decoder";

import { entity as accountEntity } from "./account";
import { entity as contactEntity } from "./contact";
import { getJson, postJson, putJson } from "./http";
import { type MergeRules } from "./merge";

/** All supported CRM entities */
export const Entities = {
  Contact: contactEntity,
  Account: accountEntity,
};

/** Base entity type that all entities extend */
export type BaseEntity = {
  id: string;
};

export type Entity<E extends BaseEntity> = {
  /** Singular entity name, ie. `contact` */
  singularName: string;
  /** Plural entity name, ie. `contacts` */
  pluralName: string;
  /** API path of the relevant REST resource, ie. `Contact` */
  apiPath: string;
  /** Rules to merge two objects of this entity */
  mergeRules: MergeRules<E>;
  /** Function to decode JSON API response */
  decoder: (value: unknown) => E;
};

//
// Generic API Code
//

export const getObjectById = async <E extends BaseEntity>(
  entity: Entity<E>,
  apiKey: string,
  id: string,
) =>
  getJson({
    decodeResponse: entity.decoder,
    path: `${entity.apiPath}/${id}`,
    apiKey,
  });

export const createObject = async <E extends BaseEntity>(
  entity: Entity<E>,
  apiKey: string,
  data: Partial<E>,
) =>
  postJson({
    decodeResponse: entity.decoder,
    body: data,
    path: entity.apiPath,
    apiKey,
  });

export const updateObject = async <E extends BaseEntity>(
  entity: Entity<E>,
  apiKey: string,
  data: Pick<E, "id"> & Partial<E>,
) =>
  putJson({
    decodeResponse: entity.decoder,
    body: data,
    path: `${entity.apiPath}/${data.id}`,
    apiKey,
  });

//
// Batch API Requests
//

const decodeWrapper = <T>(decodeResponse: DecoderFunction<T>) =>
  record({
    total: number,
    list: array(decodeResponse),
  });

const getOnePageOfObjects = async <E extends BaseEntity>(
  entity: Entity<E>,
  apiKey: string,
  offset: number,
) =>
  getJson({
    decodeResponse: decodeWrapper(entity.decoder),
    path: `${entity.apiPath}?offset=${offset}`,
    apiKey,
  });

export const getAllObjects = async <E extends BaseEntity>(
  entity: Entity<E>,
  apiKey: string,
) => {
  let items: E[] = [];
  let offset = 0;
  while (1) {
    const batch = await getOnePageOfObjects(entity, apiKey, offset);
    if (batch.list.length > 0) {
      console.debug(
        `Downloaded ${batch.list.length} ${entity.pluralName} from offset ${offset}.`,
      );
      items = [...items, ...(batch.list as E[])];
      offset += batch.list.length;
    } else {
      break;
    }
  }
  return items;
};
