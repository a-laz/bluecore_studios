import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leadTags, tags, leads } from "@/lib/schema/crm";
import { eq, and } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);
  const { tag_id } = await request.json();

  const [lead] = await db.select().from(leads).where(eq(leads.id, leadId));
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  const [tag] = await db.select().from(tags).where(eq(tags.id, tag_id));
  if (!tag) return NextResponse.json({ error: "Tag not found" }, { status: 404 });

  try {
    await db.insert(leadTags).values({ leadId, tagId: tag_id });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Tag already assigned" }, { status: 409 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);
  const { tag_id } = await request.json();

  await db.delete(leadTags).where(
    and(eq(leadTags.leadId, leadId), eq(leadTags.tagId, tag_id))
  );

  return NextResponse.json({ success: true });
}
