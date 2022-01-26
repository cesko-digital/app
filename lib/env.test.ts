import { Env, importEnv } from "./env";

describe("Import environment vars", () => {
  test("Import from empty env", () => {
    expect(importEnv({})).toEqual<Env>({
      verboseLog: false,
      includeDraftData: false,
      useLocalData: true,
    });
  });
  test("Verbose log", () => {
    expect(importEnv({ VERBOSE_LOG: "yes, please" })).toEqual<Env>({
      verboseLog: true,
      includeDraftData: false,
      useLocalData: true,
    });
  });
  test("Include draft data", () => {
    expect(importEnv({ INCLUDE_DRAFT_DATA: "yes, please" })).toEqual<Env>({
      verboseLog: false,
      includeDraftData: true,
      useLocalData: true,
    });
  });
  test("Have Airtable API keys", () => {
    expect(importEnv({ AIRTABLE_API_KEY: "foo" })).toEqual<Env>({
      verboseLog: false,
      includeDraftData: false,
      useLocalData: false,
    });
  });
  test("Have Airtable API keys, force local data", () => {
    expect(
      importEnv({ AIRTABLE_API_KEY: "foo", DATA_SOURCE_LOCAL: "yes" })
    ).toEqual<Env>({
      verboseLog: false,
      includeDraftData: false,
      useLocalData: true,
    });
  });
  test("Read Vercel env", () => {
    expect(importEnv({ VERCEL_ENV: "development" })).toEqual<Env>({
      verboseLog: false,
      includeDraftData: false,
      useLocalData: true,
      vercelDeploymentType: "development",
    });
  });
  test("Refuse to create a production build with local data", () => {
    expect(() =>
      importEnv({ VERCEL_ENV: "production", DATA_SOURCE_LOCAL: "yes" })
    ).toThrow();
  });
  test("Read Ecomail API key", () => {
    expect(importEnv({ ECOMAIL_API_KEY: "foo" })).toEqual<Env>({
      verboseLog: false,
      includeDraftData: false,
      useLocalData: true,
      ecomailApiKey: "foo",
    });
  });
});
