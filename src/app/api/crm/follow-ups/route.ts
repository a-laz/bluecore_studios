import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { followUps, leads } from "@/lib/schema/crm";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  const rows = await db
    .select({
      id: followUps.id,
      leadId: followUps.leadId,
      dueDate: followUps.dueDate,
      title: followUps.title,
      completed: followUps.completed,
      createdAt: followUps.createdAt,
      companyName: leads.companyName,
    })
    .from(followUps)
    .innerJoin(leads, eq(followUps.leadId, leads.id))
    .where(eq(followUps.completed, 0))
    .orderBy(asc(followUps.dueDate));

  return NextResponse.json({ followUps: rows });
}
