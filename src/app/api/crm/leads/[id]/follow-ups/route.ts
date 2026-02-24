import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { followUps, leads } from "@/lib/schema/crm";
import { eq, desc } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);

  const rows = await db
    .select()
    .from(followUps)
    .where(eq(followUps.leadId, leadId))
    .orderBy(desc(followUps.dueDate));

  return NextResponse.json({ followUps: rows });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);
  const body = await request.json();

  const [lead] = await db.select().from(leads).where(eq(leads.id, leadId));
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const [followUp] = await db.insert(followUps).values({
    leadId,
    dueDate: body.due_date,
    title: body.title,
  }).returning();

  // Update lead's next_follow_up
  await db.update(leads).set({
    nextFollowUp: body.due_date,
    updatedAt: new Date().toISOString(),
  }).where(eq(leads.id, leadId));

  return NextResponse.json({ followUp }, { status: 201 });
}
