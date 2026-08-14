// Self-hosted deployments run these routes on Node.js and connect to a normal
// MySQL server. Keep the upstream export name so callers do not need to care
// which database transport is in use.
export { prisma as prismaEdge } from "./index";
