import { prisma } from "@/lib/prisma";

/**
 * Compatibility wrapper for the PlanetScale driver's `execute` API.
 *
 * Upstream Dub uses PlanetScale's HTTPS data API from middleware. A
 * self-hosted MySQL server speaks the MySQL protocol instead, so sending the
 * database URL through `@planetscale/database` results in HTTPS being sent to
 * port 3306. The self-hosted build runs middleware on the Node.js runtime and
 * can use Prisma's native MySQL connection directly.
 */
export const conn = {
  async execute<T = Record<string, unknown>>(
    query: string,
    params: unknown[] = [],
  ): Promise<{ rows: T[]; rowsAffected?: number }> {
    const statement = query.trimStart().split(/\s+/, 1)[0]?.toUpperCase();
    const returnsRows = [
      "SELECT",
      "SHOW",
      "DESCRIBE",
      "DESC",
      "EXPLAIN",
      "WITH",
    ].includes(statement);

    if (returnsRows) {
      const rows = await prisma.$queryRawUnsafe<T[]>(query, ...params);
      return { rows };
    }

    const rowsAffected = await prisma.$executeRawUnsafe(query, ...params);
    return { rows: [], rowsAffected };
  },
};
