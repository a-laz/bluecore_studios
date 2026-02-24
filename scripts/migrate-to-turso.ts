/**
 * One-shot migration: reads local SQLite DBs and bulk-inserts into Turso.
 *
 * Usage:
 *   npx tsx scripts/migrate-to-turso.ts
 *
 * Requires:
 *   TURSO_URL and TURSO_AUTH_TOKEN env vars (or in .env.local)
 *   Local files: data/crm.db and ~/scraper/funding_rounds.db
 */

import Database from "better-sqlite3";
import { createClient } from "@libsql/client";
import path from "path";

const BATCH_SIZE = 100;

async function main() {
  const url = process.env.TURSO_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) {
    console.error("Missing TURSO_URL or TURSO_AUTH_TOKEN");
    process.exit(1);
  }

  const turso = createClient({ url, authToken });

  // --- Migrate funding_rounds ---
  const scraperDbPath = process.env.SCRAPER_DB_PATH || path.join(process.env.HOME || "", "scraper", "funding_rounds.db");
  try {
    const scraperDb = new Database(scraperDbPath, { readonly: true });
    const rows = scraperDb.prepare("SELECT * FROM funding_rounds").all() as Record<string, unknown>[];
    console.log(`funding_rounds: ${rows.length} rows to migrate`);

    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const batch = rows.slice(i, i + BATCH_SIZE);
      const stmts = batch.map((row) => ({
        sql: `INSERT OR IGNORE INTO funding_rounds
              (id, company_name, company_name_normalized, round_type, amount_usd, date,
               investors, category_tags, source, source_url, company_website, description,
               created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          row.id as number,
          row.company_name as string,
          row.company_name_normalized as string,
          row.round_type as string,
          row.amount_usd as number | null,
          row.date as string | null,
          row.investors as string,
          row.category_tags as string,
          row.source as string,
          row.source_url as string | null,
          row.company_website as string | null,
          row.description as string | null,
          row.created_at as string,
          row.updated_at as string,
        ],
      }));
      await turso.batch(stmts);
      console.log(`  funding_rounds: inserted batch ${Math.floor(i / BATCH_SIZE) + 1} (${Math.min(i + BATCH_SIZE, rows.length)}/${rows.length})`);
    }

    // Verify
    const localCount = scraperDb.prepare("SELECT COUNT(*) as count FROM funding_rounds").get() as { count: number };
    const remoteCount = await turso.execute("SELECT COUNT(*) as count FROM funding_rounds");
    console.log(`funding_rounds: local=${localCount.count}, turso=${remoteCount.rows[0].count}`);
    scraperDb.close();
  } catch (err) {
    console.warn(`Skipping funding_rounds migration: ${err}`);
  }

  // --- Migrate CRM tables ---
  const crmDbPath = process.env.CRM_DB_PATH || path.join(process.cwd(), "data", "crm.db");
  try {
    const crmDb = new Database(crmDbPath, { readonly: true });

    for (const table of ["leads", "activities", "tags", "lead_tags", "follow_ups"]) {
      const rows = crmDb.prepare(`SELECT * FROM ${table}`).all() as Record<string, unknown>[];
      if (rows.length === 0) {
        console.log(`${table}: 0 rows (skipping)`);
        continue;
      }
      console.log(`${table}: ${rows.length} rows to migrate`);

      const columns = Object.keys(rows[0]);
      const placeholders = columns.map(() => "?").join(", ");
      const sqlStr = `INSERT OR IGNORE INTO ${table} (${columns.join(", ")}) VALUES (${placeholders})`;

      for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batch = rows.slice(i, i + BATCH_SIZE);
        const stmts = batch.map((row) => ({
          sql: sqlStr,
          args: columns.map((col) => (row[col] ?? null) as string | number | null),
        }));
        await turso.batch(stmts);
        console.log(`  ${table}: inserted batch ${Math.floor(i / BATCH_SIZE) + 1} (${Math.min(i + BATCH_SIZE, rows.length)}/${rows.length})`);
      }

      const localCount = crmDb.prepare(`SELECT COUNT(*) as count FROM ${table}`).get() as { count: number };
      const remoteCount = await turso.execute(`SELECT COUNT(*) as count FROM ${table}`);
      console.log(`${table}: local=${localCount.count}, turso=${remoteCount.rows[0].count}`);
    }

    crmDb.close();
  } catch (err) {
    console.warn(`Skipping CRM migration: ${err}`);
  }

  console.log("Migration complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
