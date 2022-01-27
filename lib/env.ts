/**
 * Vercel deployment type
 *
 * See https://vercel.com/docs/concepts/projects/environment-variables#environments
 */
export type VercelDeploymentType = "production" | "preview" | "development";

/** Names of the env variables we use to customize the build */
export type SystemEnvKeys =
  | "VERBOSE_LOG"
  | "INCLUDE_DRAFT_DATA"
  | "DATA_SOURCE_LOCAL"
  | "AIRTABLE_API_KEY"
  | "ECOMAIL_API_KEY"
  | "VERCEL_ENV";

/** Parsed environment variables that customize the build */
export type Env = {
  /** Airtable API key. If not present, we will attempt to use local data. */
  airtableApiKey?: string;
  /** Ecomail API key, used to subscribe people to our newsletter */
  ecomailApiKey?: string;
  /** If set, code will log details where appropriate */
  verboseLog: boolean;
  /** If set, will also include draft data in generated website */
  includeDraftData: boolean;
  /** Vercel deployment type, ie. are we building a pull request or what? */
  vercelDeploymentType?: VercelDeploymentType;
  /** Should we use local data sources where possible? */
  useLocalData: boolean;
  /**
   * Should we allow robots and track views?
   *
   * We want to make sure we don’t spam our analytics or even harm our SEO
   * by tracking and exposing our draft or development builds.
   */
  allowRobots: boolean;
};

export function importEnv(sysEnv: Partial<Record<SystemEnvKeys, string>>): Env {
  const verboseLog = !!sysEnv.VERBOSE_LOG;
  const includeDraftData = !!sysEnv.INCLUDE_DRAFT_DATA;
  const forceLocal = !!sysEnv.DATA_SOURCE_LOCAL;
  const airtableApiKey = sysEnv.AIRTABLE_API_KEY;
  const ecomailApiKey = sysEnv.ECOMAIL_API_KEY;
  const useLocalData = forceLocal || !airtableApiKey;

  const vercelDeploymentType = sysEnv.VERCEL_ENV as
    | VercelDeploymentType
    | undefined;

  const allowRobots =
    !useLocalData && !includeDraftData && vercelDeploymentType === "production";

  if (useLocalData && vercelDeploymentType === "production") {
    throw "Refusing to use local data source for production build.";
  }

  return {
    useLocalData,
    verboseLog,
    includeDraftData,
    vercelDeploymentType,
    allowRobots,
    airtableApiKey,
    ecomailApiKey,
  };
}

function importEnvOrDie(): Env {
  try {
    return importEnv(process.env as any);
  } catch (e) {
    console.error(`Failed to import environment: ${e}`);
    process.exit(1);
  }
}

export const env = importEnvOrDie();
