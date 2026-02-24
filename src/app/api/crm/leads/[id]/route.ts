import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/schema/crm";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [lead] = await db.select().from(leads).where(eq(leads.id, parseInt(id)));

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({ lead });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const leadId = parseInt(id);

  const [existing] = await db.select().from(leads).where(eq(leads.id, leadId));
  if (!existing) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const updateData: Partial<typeof leads.$inferInsert> = { updatedAt: new Date().toISOString() };
  const allowedFields = [
    "company_name", "company_website", "contact_name", "contact_email",
    "contact_title", "stage", "priority", "deal_value", "source",
    "lost_reason", "next_follow_up",
  ] as const;

  const fieldMap: Record<string, keyof typeof leads.$inferInsert> = {
    company_name: "companyName",
    company_website: "companyWebsite",
    contact_name: "contactName",
    contact_email: "contactEmail",
    contact_title: "contactTitle",
    deal_value: "dealValue",
    lost_reason: "lostReason",
    next_follow_up: "nextFollowUp",
  };

  for (const field of allowedFields) {
    if (field in body) {
      const key = fieldMap[field] || field;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updateData as any)[key] = body[field];
    }
  }

  await db.update(leads).set(updateData).where(eq(leads.id, leadId));
  const [updated] = await db.select().from(leads).where(eq(leads.id, leadId));

  return NextResponse.json({ lead: updated });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);

  const [existing] = await db.select().from(leads).where(eq(leads.id, leadId));
  if (!existing) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  await db.delete(leads).where(eq(leads.id, leadId));

  return NextResponse.json({ success: true });
}
