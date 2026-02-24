import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads, activities } from "@/lib/schema/crm";
import { eq } from "drizzle-orm";

const VALID_STAGES = ["new", "contacted", "meeting", "proposal", "closed_won", "closed_lost"] as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);
  const { stage, lost_reason } = await request.json();

  if (!VALID_STAGES.includes(stage)) {
    return NextResponse.json({ error: "Invalid stage" }, { status: 400 });
  }

  const [existing] = await db.select().from(leads).where(eq(leads.id, leadId));
  if (!existing) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const fromStage = existing.stage;
  const updateData: Partial<typeof leads.$inferInsert> = {
    stage,
    updatedAt: new Date().toISOString(),
  };
  if (stage === "closed_lost" && lost_reason) {
    updateData.lostReason = lost_reason;
  }

  await db.update(leads).set(updateData).where(eq(leads.id, leadId));
  const [updated] = await db.select().from(leads).where(eq(leads.id, leadId));

  // Auto-log activity
  await db.insert(activities).values({
    leadId,
    type: "stage_change",
    title: `Stage changed: ${fromStage} → ${stage}`,
    metadata: JSON.stringify({ from: fromStage, to: stage }),
  });

  return NextResponse.json({ lead: updated });
}
