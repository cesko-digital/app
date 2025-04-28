import { date, record, string, type decodeType } from "typescript-json-decoder";

import { undefinedIfNull } from "~/src/decoding";

import { type Entity } from "./espo";

export type Account = decodeType<typeof decodeAccount>;
const decodeAccount = record({
  // Built-ins
  id: string,
  createdAt: date,
  name: string,
  // Custom props
  cIco: undefinedIfNull(string),
  cDataSource: undefinedIfNull(string),
});

export const entity: Entity<Account> = {
  singularName: "account",
  pluralName: "accounts",
  apiPath: "Account",
  mergeRules: {
    immutableProps: ["id", "cIco"],
    updatableProps: [],
    readOnlyAfterCreatePops: ["name"],
    mergableProps: {},
  },
  decoder: decodeAccount,
};
