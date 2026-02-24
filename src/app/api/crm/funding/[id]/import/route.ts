import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { fundingRounds, leads, activities } from "@/lib/schema/crm";
import { eq } from "drizzle-orm";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const fundingId = parseInt(id);

  const [round] = await db.select().from(fundingRounds).where(eq(fundingRounds.id, fundingId));

  if (!round) {
    return NextResponse.json({ error: "Funding round not found" }, { status: 404 });
  }

  // Check if already imported
  const [existing] = await db.select().from(leads).where(eq(leads.fundingRoundId, fundingId));
  if (existing) {
    return NextResponse.json({ error: "Already imported", lead: existing }, { status: 409 });
  }

  const [lead] = await db.insert(leads).values({
    fundingRoundId: fundingId,
    companyName: round.companyName,
    companyWebsite: round.companyWebsite,
    stage: "new",
    priority: "medium",
    source: "scraper",
  }).returning();

  await db.insert(activities).values({
    leadId: lead.id,
    type: "note",
    title: "Lead imported from funding data",
    description: `Imported from ${round.roundType} round${round.amountUsd ? ` ($${(round.amountUsd / 1_000_000).toFixed(1)}M)` : ""}`,
    metadata: JSON.stringify({ funding_round_id: fundingId, round_type: round.roundType, amount: round.amountUsd }),
  });

  return NextResponse.json({ lead }, { status: 201 });
}
