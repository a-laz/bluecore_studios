import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/schema/crm";
import { asc } from "drizzle-orm";

const STAGES = ["new", "contacted", "meeting", "proposal", "closed_won", "closed_lost"] as const;

export async function GET() {
  const allLeads = await db.select().from(leads).orderBy(asc(leads.updatedAt));

  const pipeline: Record<string, typeof allLeads> = {};
  for (const stage of STAGES) {
    pipeline[stage] = [];
  }

  for (const lead of allLeads) {
    if (pipeline[lead.stage]) {
      pipeline[lead.stage].push(lead);
    }
  }

  return NextResponse.json({ pipeline, stages: STAGES });
}
