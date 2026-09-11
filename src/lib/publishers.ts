/**
 * Publisher query helpers for retrieving publisher records used by the static site.
 * These functions keep data access in one place and allow callers to inject a shared database instance.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Retrieves every publisher in the catalog, ordered alphabetically by name.
 *
 * @param db - The database connection used to execute the query.
 * @returns A list of publishers sorted by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
