import apm from "elastic-apm-node";
import { NextApiHandler, NextApiRequest } from "next";

const {
  ELASTIC_APM_SERVICE_NAME: serviceName,
  ELASTIC_APM_SECRET_TOKEN: apiToken,
  ELASTIC_APM_SERVER_URL: serverUrl,
} = process.env;

export const enableAPMLogging = () => {
  if (!serviceName || !apiToken || !serverUrl) {
    return;
  }
  if (apm.isStarted()) {
    return;
  }
  console.log(`Starting APM logging for “${serviceName}”.`);
  apm.start();
};

/**
 * Wrap API handler in an Application Performance Monitoring transaction
 *
 * This makes the API call visible in our Elastic observability dashboard.
 */
export function addPerformanceLogging(handler: NextApiHandler): NextApiHandler {
  return async (request, response) => {
    const name = getRequestPath(request) || "<unknown>";
    apm.startTransaction(name);
    await handler(request, response);
    apm.endTransaction(response.statusCode);
  };
}

const getRequestPath = (request: NextApiRequest) =>
  request.url
    ? new URL(request.url, `http://${request.headers.host}`).pathname
    : undefined;
