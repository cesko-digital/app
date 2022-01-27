export type VercelDeploymentType = "production" | "preview" | "development";
export type SystemEnvKeys =
  | "VERBOSE_LOG"
  | "INCLUDE_DRAFT_DATA"
  | "DATA_SOURCE_LOCAL"
  | "AIRTABLE_API_KEY"
  | "ECOMAIL_API_KEY"
  | "VERCEL_ENV";

export type Env = {
  airtableApiKey?: string;
  ecomailApiKey?: string;
  verboseLog: boolean;
  includeDraftData: boolean;
  vercelDeploymentType?: VercelDeploymentType;
  useLocalData: boolean;
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
