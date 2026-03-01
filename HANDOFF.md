# Handoff: Bluecore Studios + Lead Scraper

## Architecture Overview

```
Vercel (Next.js CRM)  ─── @libsql/client ──────┐
                                                 ├──► Turso DB (bluecore-prod)
GitHub Actions (Rust scraper) ─── libsql crate ─┘
```

Both the CRM and scraper share a single Turso database. No local SQLite files are used in production.

---

## Repositories

| Repo | URL | Branch | Deploys To |
|------|-----|--------|------------|
| CRM (Next.js) | https://github.com/a-laz/bluecore_studios | `feature/crm` | Vercel |
| Scraper (Rust) | https://github.com/AuditVision-AI/Lead_Scraper | `feature/funding-scraper-updates` | GitHub Actions |

---

## Turso Database

- **Name:** `bluecore-prod`
- **URL:** `libsql://bluecore-prod-a-laz.aws-us-east-1.turso.io`
- **Region:** aws-us-east-1
- **Dashboard:** `turso db shell bluecore-prod`

### Tables (6)

| Table | Purpose |
|-------|---------|
| `funding_rounds` | Scraped funding data (company, round type, amount, investors, etc.) |
| `leads` | CRM leads (imported from funding rounds or created manually) |
| `activities` | Activity log per lead (notes, emails, stage changes) |
| `tags` | Tag definitions (name + color) |
| `lead_tags` | Many-to-many join between leads and tags |
| `follow_ups` | Scheduled follow-ups per lead |

### Generate a new token

```bash
turso db tokens create bluecore-prod
```

---

## CRM (Next.js)

### Tech Stack

- Next.js 16 (App Router)
- Drizzle ORM + `@libsql/client` (Turso)
- Tailwind CSS 4
- Deployed on Vercel

### Key Files

| File | What it does |
|------|-------------|
| `src/lib/db.ts` | Lazy Turso client + Drizzle instance (proxied) |
| `src/lib/schema/crm.ts` | Drizzle table definitions for all 6 tables |
| `src/middleware.ts` | Cookie-based auth for `/crm` and `/api/crm` routes |
| `src/app/api/crm/` | All API routes (leads, funding, tags, follow-ups, analytics, pipeline) |
| `src/app/crm/` | CRM frontend pages |
| `scripts/migrate-to-turso.ts` | One-shot migration script (local SQLite → Turso) |

### Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `TURSO_URL` | Vercel + `.env.local` | Turso database URL |
| `TURSO_AUTH_TOKEN` | Vercel + `.env.local` | Turso auth token |
| `CRM_PASSWORD` | Vercel + `.env.local` | Password for CRM login |

### Local Development

```bash
cd bluecore_studios
cp .env.local.example .env.local  # fill in TURSO_URL, TURSO_AUTH_TOKEN, CRM_PASSWORD
npm install
npm run dev
# Open http://localhost:3000/crm
```

### API Response Format

- **Leads list** (`GET /api/crm/leads`) returns snake_case keys (`company_name`, `deal_value`, etc.)
- **Lead detail** (`GET /api/crm/leads/[id]`) returns camelCase keys (Drizzle default)
- **Funding** (`GET /api/crm/funding`) returns snake_case keys
- **Pipeline, analytics, follow-ups** return camelCase keys

### Deploy

Push to `feature/crm` branch. Vercel auto-deploys.

---

## Scraper (Rust)

### Tech Stack

- Rust + Tokio (async runtime)
- `libsql` crate for Turso remote DB
- Clap for CLI
- Scrapes from: CoinCarp, CryptoFundraising, Crunchbase (if API key set)

### Key Files

| File | What it does |
|------|-------------|
| `src/main.rs` | CLI entrypoint — scrape, export, stats, enrich commands |
| `src/db.rs` | All DB operations (init, insert, query, upsert) |
| `src/export.rs` | CSV/JSON export |
| `src/models.rs` | `FundingRound` struct |
| `src/sources/` | Scraper implementations per source |
| `.github/workflows/daily-scrape.yml` | Automated scraping every 6 hours |

### CLI Commands

```bash
# Scrape all sources (only keeps rounds from last 6 months)
cargo run --release -- scrape

# Scrape specific source
cargo run --release -- scrape --source coincarp

# Enrich records (backfill company websites)
cargo run --release -- enrich

# Show stats
cargo run --release -- stats

# Export to CSV
cargo run --release -- export --format csv --output rounds.csv
```

### Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `TURSO_URL` | GitHub environment `turso` | Turso database URL |
| `TURSO_AUTH_TOKEN` | GitHub environment `turso` | Turso auth token |
| `CRUNCHBASE_API_KEY` | Optional | Enables Crunchbase source |

### GitHub Actions

- **Workflow:** `.github/workflows/daily-scrape.yml`
- **Schedule:** Every 6 hours (`0 */6 * * *`)
- **Environment:** `turso` (secrets stored here)
- **Manual trigger:** Actions tab → "Scrape Funding Data" → "Run workflow"
- **Branch:** Set `--ref` to run on a feature branch

```bash
# Trigger manually
gh workflow run daily-scrape.yml --ref feature/funding-scraper-updates

# Watch a run
gh run watch

# Cancel a run
gh run list --limit 1
gh run cancel <RUN_ID>
```

### Date Cutoff

The scraper skips funding rounds older than 6 months. This is enforced in `src/main.rs` before insertion. To change the window, modify the `chrono::Months::new(6)` value.

---

## Data Flow

1. **GitHub Actions** runs the Rust scraper every 6 hours
2. Scraper fetches funding rounds from CoinCarp + CryptoFundraising
3. Rounds are upserted into `funding_rounds` table in Turso (dedup by company + round type + date)
4. CRM users browse funding rounds at `/crm/funding`
5. Users click "Import" to create a lead from a funding round
6. Leads are managed through the pipeline at `/crm/pipeline`

---

## Common Operations

### Rotate Turso token

```bash
turso db tokens invalidate bluecore-prod
turso db tokens create bluecore-prod
```

Then update in: `.env.local`, Vercel env vars, GitHub environment `turso`

### Check data counts

```bash
turso db shell bluecore-prod "SELECT COUNT(*) FROM funding_rounds; SELECT COUNT(*) FROM leads;"
```

### Purge old funding rounds

```bash
turso db shell bluecore-prod "DELETE FROM funding_rounds WHERE date < date('now', '-6 months');"
```

### Run migration script (one-time, already done)

```bash
npm install --save-dev better-sqlite3 @types/better-sqlite3
TURSO_URL=... TURSO_AUTH_TOKEN=... npx tsx scripts/migrate-to-turso.ts
npm uninstall better-sqlite3 @types/better-sqlite3
```

---

## PRs to Merge

| Repo | PR | Description |
|------|----|-------------|
| Lead_Scraper | [#2](https://github.com/AuditVision-AI/Lead_Scraper/pull/2) | Rust scraper with Turso integration |
| bluecore_studios | `feature/crm` branch | Full CRM + Turso migration |


###Keys
CRM_PASSWORD=bluecore2024
SCRAPER_DB_PATH=/Users/user/scraper/funding_rounds.db
CRM_DB_PATH=/Users/user/bluecore_studios/data/crm.db
TURSO_URL=libsql://bluecore-prod-a-laz.aws-us-east-1.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzE4OTc0MjIsImlkIjoiMzE0MjAzYTgtNjljNy00NjNjLTk2NTEtNGQ1MmJmOTMwOGU4IiwicmlkIjoiNzhlZWY4YzQtY2UwNy00ZGI1LWI4MGYtNTFjM2RjOGRmM2U5In0.gy1FVYP6GeAT3Meeg5jdvn4LhGPyQaUNm2ZPyDRpHD5Hvz8i-ATdWKBsI04hICjZ35l90uMlVIPYz_pq66Y-Cw
