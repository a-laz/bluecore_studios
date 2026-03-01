import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dailyReports } from "@/lib/schema/crm";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updates: Record<string, unknown> = {};
  if (body.name !== undefined) updates.name = body.name;
  if (body.date !== undefined) updates.date = body.date;
  if (body.tasks_completed !== undefined) updates.tasksCompleted = body.tasks_completed;
  if (body.tasks_in_progress !== undefined) updates.tasksInProgress = body.tasks_in_progress;
  if (body.blockers !== undefined) updates.blockers = body.blockers;
  if (body.hours_worked !== undefined) updates.hoursWorked = parseFloat(body.hours_worked);

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const [updated] = await db
    .update(dailyReports)
    .set(updates)
    .where(eq(dailyReports.id, parseInt(id)))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  return NextResponse.json({
    report: {
      id: updated.id,
      name: updated.name,
      date: updated.date,
      tasks_completed: updated.tasksCompleted,
      tasks_in_progress: updated.tasksInProgress,
      blockers: updated.blockers,
      hours_worked: updated.hoursWorked,
      created_at: updated.createdAt,
    },
  });
}
