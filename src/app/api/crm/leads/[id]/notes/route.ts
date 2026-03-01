import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leadNotes, leads } from "@/lib/schema/crm";
import { eq, desc } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);

  const rows = await db
    .select()
    .from(leadNotes)
    .where(eq(leadNotes.leadId, leadId))
    .orderBy(desc(leadNotes.createdAt));

  return NextResponse.json({ notes: rows });
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

  const [note] = await db.insert(leadNotes).values({
    leadId,
    content: body.content,
    authorName: body.author_name || null,
  }).returning();

  return NextResponse.json({ note }, { status: 201 });
}
