import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { activities, leads } from "@/lib/schema/crm";
import { eq, desc } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);

  const rows = await db
    .select()
    .from(activities)
    .where(eq(activities.leadId, leadId))
    .orderBy(desc(activities.createdAt));

  return NextResponse.json({ activities: rows });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);
  const body = await request.json();

  // Verify lead exists
  const [lead] = await db.select().from(leads).where(eq(leads.id, leadId));
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const [activity] = await db.insert(activities).values({
    leadId,
    type: body.type || "note",
    title: body.title,
    description: body.description || null,
    metadata: body.metadata ? JSON.stringify(body.metadata) : null,
  }).returning();

  return NextResponse.json({ activity }, { status: 201 });
}
