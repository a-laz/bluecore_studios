import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads, activities, followUps } from "@/lib/schema/crm";
import { sql, eq, desc } from "drizzle-orm";

export async function GET() {
  // Pipeline KPIs
  const [totalLeads] = await db.select({ count: sql<number>`count(*)` }).from(leads);
  const [totalValue] = await db.select({ total: sql<number>`coalesce(sum(deal_value), 0)` }).from(leads);
  const [wonLeads] = await db.select({ count: sql<number>`count(*)`, total: sql<number>`coalesce(sum(deal_value), 0)` }).from(leads).where(eq(leads.stage, "closed_won"));
  const [activeLeads] = await db.select({ count: sql<number>`count(*)` }).from(leads).where(sql`stage NOT IN ('closed_won', 'closed_lost')`);

  // Pipeline funnel
  const funnel = await db.select({
    stage: leads.stage,
    count: sql<number>`count(*)`,
    value: sql<number>`coalesce(sum(deal_value), 0)`,
  }).from(leads).groupBy(leads.stage);

  // Recent activities
  const recentActivities = await db
    .select({
      id: activities.id,
      leadId: activities.leadId,
      type: activities.type,
      title: activities.title,
      description: activities.description,
      createdAt: activities.createdAt,
      companyName: leads.companyName,
    })
    .from(activities)
    .innerJoin(leads, eq(activities.leadId, leads.id))
    .orderBy(desc(activities.createdAt))
    .limit(10);

  // Upcoming follow-ups
  const upcomingFollowUps = await db
    .select({
      id: followUps.id,
      leadId: followUps.leadId,
      dueDate: followUps.dueDate,
      title: followUps.title,
      completed: followUps.completed,
      companyName: leads.companyName,
    })
    .from(followUps)
    .innerJoin(leads, eq(followUps.leadId, leads.id))
    .where(eq(followUps.completed, 0))
    .orderBy(followUps.dueDate)
    .limit(10);

  // Leads by source
  const bySource = await db.select({
    source: leads.source,
    count: sql<number>`count(*)`,
  }).from(leads).groupBy(leads.source);

  // Leads by priority
  const byPriority = await db.select({
    priority: leads.priority,
    count: sql<number>`count(*)`,
  }).from(leads).groupBy(leads.priority);

  // Activity volume by day (last 30 days)
  const activityVolume = await db.select({
    date: sql<string>`date(created_at)`,
    count: sql<number>`count(*)`,
  }).from(activities).where(sql`created_at >= datetime('now', '-30 days')`).groupBy(sql`date(created_at)`).orderBy(sql`date(created_at)`);

  return NextResponse.json({
    kpis: {
      totalLeads: totalLeads.count,
      totalPipelineValue: totalValue.total,
      wonDeals: wonLeads.count,
      wonValue: wonLeads.total,
      activeLeads: activeLeads.count,
      conversionRate: totalLeads.count > 0 ? ((wonLeads.count / totalLeads.count) * 100).toFixed(1) : "0",
    },
    funnel,
    recentActivities,
    upcomingFollowUps,
    bySource,
    byPriority,
    activityVolume,
  });
}
