import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { followUps } from "@/lib/schema/crm";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const followUpId = parseInt(id);

  if ("completed" in body) {
    await db.update(followUps).set({ completed: body.completed ? 1 : 0 }).where(eq(followUps.id, followUpId));
  }
  if ("due_date" in body) {
    await db.update(followUps).set({ dueDate: body.due_date }).where(eq(followUps.id, followUpId));
  }
  if ("title" in body) {
    await db.update(followUps).set({ title: body.title }).where(eq(followUps.id, followUpId));
  }

  const [updated] = await db.select().from(followUps).where(eq(followUps.id, followUpId));

  return NextResponse.json({ followUp: updated });
}
