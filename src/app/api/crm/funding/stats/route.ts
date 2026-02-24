import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { fundingRounds } from "@/lib/schema/crm";
import { sql, isNotNull } from "drizzle-orm";

export async function GET() {
  const [totalRounds] = await db
    .select({ count: sql<number>`count(*)` })
    .from(fundingRounds);

  const [totalFunding] = await db
    .select({ total: sql<number>`coalesce(sum(amount_usd), 0)` })
    .from(fundingRounds)
    .where(isNotNull(fundingRounds.amountUsd));

  const [avgRound] = await db
    .select({ avg: sql<number>`coalesce(avg(amount_usd), 0)` })
    .from(fundingRounds)
    .where(isNotNull(fundingRounds.amountUsd));

  const [uniqueCompanies] = await db
    .select({ count: sql<number>`count(distinct company_name_normalized)` })
    .from(fundingRounds);

  const byRoundType = await db
    .select({
      round_type: fundingRounds.roundType,
      count: sql<number>`count(*)`,
      total_amount: sql<number>`coalesce(sum(amount_usd), 0)`,
    })
    .from(fundingRounds)
    .groupBy(fundingRounds.roundType)
    .orderBy(sql`count(*) desc`);

  const byMonth = await db
    .select({
      month: sql<string>`strftime('%Y-%m', date)`,
      count: sql<number>`count(*)`,
      total_amount: sql<number>`coalesce(sum(amount_usd), 0)`,
    })
    .from(fundingRounds)
    .where(isNotNull(fundingRounds.date))
    .groupBy(sql`strftime('%Y-%m', date)`)
    .orderBy(sql`strftime('%Y-%m', date) desc`)
    .limit(12);

  const topCategoriesRows = await db
    .select({ categoryTags: fundingRounds.categoryTags })
    .from(fundingRounds)
    .where(sql`category_tags != '[]'`);

  const categoryCounts: Record<string, number> = {};
  for (const row of topCategoriesRows) {
    const tags: string[] = JSON.parse(row.categoryTags);
    for (const tag of tags) {
      categoryCounts[tag] = (categoryCounts[tag] || 0) + 1;
    }
  }
  const sortedCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  return NextResponse.json({
    totalRounds: totalRounds.count,
    totalFunding: totalFunding.total,
    avgRoundSize: avgRound.avg,
    uniqueCompanies: uniqueCompanies.count,
    byRoundType,
    byMonth: byMonth.reverse(),
    topCategories: sortedCategories,
  });
}
