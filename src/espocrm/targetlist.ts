import {
  number,
  record,
  string,
  type decodeType,
} from "typescript-json-decoder";

import { undefinedIfNull } from "~/src/decoding";

import { type Entity } from "./espo";

export type TargetList = decodeType<typeof decodeTargetList>;
const decodeTargetList = record({
  id: string,
  name: string,
  description: undefinedIfNull(string),
  entryCount: undefinedIfNull(number),
  optedOutCount: undefinedIfNull(number),
});

export const entity: Entity<TargetList> = {
  singularName: "target list",
  pluralName: "target lists",
  apiPath: "TargetList",
  decoder: decodeTargetList,
  mergeRules: {
    immutableProps: ["id"],
    updatableProps: ["name", "description"],
    readOnlyAfterCreatePops: [],
    mergableProps: {},
  },
};
