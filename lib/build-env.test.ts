import { BuildEnv, importEnv } from "./build-env";

describe("Import environment vars", () => {
  test("Import from empty env", () => {
    expect(importEnv({})).toEqual<BuildEnv>({
      verboseLog: false,
      includeDraftData: false,
      useLocalData: true,
      allowRobots: false,
      allowAnalytics: false,
    });
  });
  test("Verbose log", () => {
    expect(importEnv({ VERBOSE_LOG: "yes, please" })).toEqual<BuildEnv>({
      verboseLog: true,
      includeDraftData: false,
      useLocalData: true,
      allowRobots: false,
      allowAnalytics: false,
    });
  });
  test("Include draft data", () => {
    expect(importEnv({ INCLUDE_DRAFT_DATA: "yes, please" })).toEqual<BuildEnv>({
      verboseLog: false,
      includeDraftData: true,
      useLocalData: true,
      allowRobots: false,
      allowAnalytics: false,
    });
  });
  test("Have Airtable API keys", () => {
    expect(importEnv({ AIRTABLE_API_KEY: "foo" })).toEqual<BuildEnv>({
      verboseLog: false,
      includeDraftData: false,
      airtableApiKey: "foo",
      useLocalData: false,
      allowRobots: false,
      allowAnalytics: false,
    });
  });
  test("Have Airtable API keys, force local data", () => {
    expect(
      importEnv({ AIRTABLE_API_KEY: "foo", DATA_SOURCE_LOCAL: "yes" })
    ).toEqual<BuildEnv>({
      verboseLog: false,
      includeDraftData: false,
      airtableApiKey: "foo",
      useLocalData: true,
      allowRobots: false,
      allowAnalytics: false,
    });
  });
  test("Read Vercel env", () => {
    expect(importEnv({ VERCEL_ENV: "development" })).toEqual<BuildEnv>({
      verboseLog: false,
      includeDraftData: false,
      useLocalData: true,
      vercelDeploymentType: "development",
      allowRobots: false,
      allowAnalytics: false,
    });
  });
  test("Refuse to create a production build with local data", () => {
    expect(() =>
      importEnv({ VERCEL_ENV: "production", DATA_SOURCE_LOCAL: "yes" })
    ).toThrow();
  });
  test("Read Ecomail API key", () => {
    expect(importEnv({ ECOMAIL_API_KEY: "foo" })).toEqual<BuildEnv>({
      verboseLog: false,
      includeDraftData: false,
      useLocalData: true,
      ecomailApiKey: "foo",
      allowRobots: false,
      allowAnalytics: false,
    });
  });
  test("Allow robots for production builds", () => {
    expect(
      importEnv({ AIRTABLE_API_KEY: "foo", VERCEL_ENV: "production" })
    ).toEqual<BuildEnv>({
      verboseLog: false,
      includeDraftData: false,
      useLocalData: false,
      vercelDeploymentType: "production",
      airtableApiKey: "foo",
      allowRobots: true,
      allowAnalytics: true,
    });
  });
});
