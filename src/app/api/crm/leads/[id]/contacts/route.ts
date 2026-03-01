import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leadContacts, leads } from "@/lib/schema/crm";
import { eq, desc } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);

  const rows = await db
    .select()
    .from(leadContacts)
    .where(eq(leadContacts.leadId, leadId))
    .orderBy(desc(leadContacts.createdAt));

  return NextResponse.json({ contacts: rows });
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

  const [contact] = await db.insert(leadContacts).values({
    leadId,
    name: body.name,
    email: body.email || null,
    title: body.title || null,
    phone: body.phone || null,
  }).returning();

  return NextResponse.json({ contact }, { status: 201 });
}
