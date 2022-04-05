import APM from "elastic-apm-node";
import { NextApiHandler, NextApiRequest } from "next";

if (!APM.isStarted()) {
  APM.start();
}

/**
 * Wrap API handler in an Application Performance Monitoring transaction
 *
 * This makes the API call visible in our Elastic observability dashboard.
 */
export function addPerformanceLogging(handler: NextApiHandler): NextApiHandler {
  return async (request, response) => {
    const name = getRequestPath(request) || "<unknown>";
    APM.startTransaction(name);
    await handler(request, response);
    APM.endTransaction(response.statusCode);
  };
}

const getRequestPath = (request: NextApiRequest) =>
  request.url
    ? new URL(request.url, `http://${request.headers.host}`).pathname
    : undefined;
