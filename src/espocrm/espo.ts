import {
  array,
  number,
  record,
  type DecoderFunction,
} from "typescript-json-decoder";

import { blueprint } from "~/src/espocrm/contact";

import { getJson, postJson, putJson } from "./http";
import { type MergeRules } from "./merge";

export const Entities = {
  Contact: blueprint,
};

export type BaseEntity = {
  id: string;
};

export type Blueprint<E extends BaseEntity> = {
  singularName: string;
  pluralName: string;
  apiPath: string;
  mergeRules: MergeRules<E>;
  decoder: (value: unknown) => E;
};

//
// Generic API Code
//

export const getEntityById = async <E extends BaseEntity>(
  blueprint: Blueprint<E>,
  apiKey: string,
  id: string,
) =>
  getJson({
    decodeResponse: blueprint.decoder,
    path: `${blueprint.apiPath}/${id}`,
    apiKey,
  });

export const createEntity = async <E extends BaseEntity>(
  Blueprint: Blueprint<E>,
  apiKey: string,
  data: Omit<E, "id">,
) =>
  postJson({
    decodeResponse: Blueprint.decoder,
    body: data,
    path: Blueprint.apiPath,
    apiKey,
  });

export const updateEntity = async <E extends BaseEntity>(
  blueprint: Blueprint<E>,
  apiKey: string,
  data: Pick<E, "id"> & Partial<E>,
) =>
  putJson({
    decodeResponse: blueprint.decoder,
    body: data,
    path: `${blueprint.apiPath}/${data.id}`,
    apiKey,
  });

//
// Batch API Requests
//

const decodeResponseWrapper = <T>(decodeResponse: DecoderFunction<T>) =>
  record({
    total: number,
    list: array(decodeResponse),
  });

const getSinglePageEntityList = async <E extends BaseEntity>(
  blueprint: Blueprint<E>,
  apiKey: string,
  offset: number,
) =>
  getJson({
    decodeResponse: decodeResponseWrapper(blueprint.decoder),
    path: `${blueprint.apiPath}?offset=${offset}`,
    apiKey,
  });

export const getAllEntities = async <E extends BaseEntity>(
  blueprint: Blueprint<E>,
  apiKey: string,
) => {
  let items: E[] = [];
  let offset = 0;
  while (1) {
    const batch = await getSinglePageEntityList(blueprint, apiKey, offset);
    if (batch.list.length > 0) {
      console.debug(
        `Downloaded ${batch.list.length} ${blueprint.pluralName} from offset ${offset}.`,
      );
      items = [...items, ...(batch.list as E[])];
      offset += batch.list.length;
    } else {
      break;
    }
  }
  return items;
};
