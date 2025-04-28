import { date, record, string, type decodeType } from "typescript-json-decoder";

import { type Entity } from "./espo";

export type Account = decodeType<typeof decodeAccount>;
const decodeAccount = record({
  // Built-ins
  id: string,
  createdAt: date,
  name: string,
});

export const entity: Entity<Account> = {
  singularName: "account",
  pluralName: "accounts",
  apiPath: "Account",
  mergeRules: {
    immutableProps: ["id"],
    updatableProps: [],
    readOnlyAfterCreatePops: [],
    mergableProps: {},
  },
  decoder: decodeAccount,
};
