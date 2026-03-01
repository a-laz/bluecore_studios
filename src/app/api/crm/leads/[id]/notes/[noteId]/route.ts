import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leadNotes } from "@/lib/schema/crm";
import { eq, and } from "drizzle-orm";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; noteId: string }> }
) {
  const { id, noteId } = await params;
  const leadId = parseInt(id);
  const nId = parseInt(noteId);

  await db
    .delete(leadNotes)
    .where(and(eq(leadNotes.id, nId), eq(leadNotes.leadId, leadId)));

  return NextResponse.json({ success: true });
}
