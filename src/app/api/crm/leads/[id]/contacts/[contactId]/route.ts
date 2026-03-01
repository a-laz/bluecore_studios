import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leadContacts } from "@/lib/schema/crm";
import { eq, and } from "drizzle-orm";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; contactId: string }> }
) {
  const { id, contactId } = await params;
  const leadId = parseInt(id);
  const cId = parseInt(contactId);

  await db
    .delete(leadContacts)
    .where(and(eq(leadContacts.id, cId), eq(leadContacts.leadId, leadId)));

  return NextResponse.json({ success: true });
}
