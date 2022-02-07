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
export type BuildEnv = {
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
   * Should we allow robots?
   *
   * We want to make sure we don’t harm our SEO by exposing
   * our draft or development builds.
   */
  allowRobots: boolean;

  /**
   * Should we collect analytics for this build?
   *
   * We don’t want to skew our stats by tracking development builds.
   */
  allowAnalytics: boolean;
};

export function importEnv(
  sysEnv: Partial<Record<SystemEnvKeys, string>>
): BuildEnv {
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
  const allowAnalytics = allowRobots;

  if (useLocalData && vercelDeploymentType === "production") {
    throw "Refusing to use local data source for production build.";
  }

  return {
    useLocalData,
    verboseLog,
    includeDraftData,
    vercelDeploymentType,
    allowRobots,
    allowAnalytics,
    airtableApiKey,
    ecomailApiKey,
  };
}

function censor(env: BuildEnv): BuildEnv {
  const {
    useLocalData,
    verboseLog,
    includeDraftData,
    vercelDeploymentType,
    allowRobots,
    allowAnalytics,
  } = env;
  return {
    useLocalData,
    verboseLog,
    includeDraftData,
    vercelDeploymentType,
    allowRobots,
    allowAnalytics,
    airtableApiKey: env.airtableApiKey ? "***" : undefined,
    ecomailApiKey: env.ecomailApiKey ? "***" : undefined,
  };
}

function importEnvOrDie(): BuildEnv {
  try {
    const env = importEnv(process.env as any);
    console.debug(`Environment: ${JSON.stringify(censor(env), null, 2)}`);
    return env;
  } catch (e) {
    console.error(`Failed to import environment: ${e}`);
    process.exit(1);
  }
}

export const buildEnv = importEnvOrDie();
