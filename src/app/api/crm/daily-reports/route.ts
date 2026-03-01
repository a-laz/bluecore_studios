import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dailyReports } from "@/lib/schema/crm";
import { desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const limit = parseInt(searchParams.get("limit") || "20");
  const page = parseInt(searchParams.get("page") || "1");
  const offset = (page - 1) * limit;

  const rows = await db
    .select()
    .from(dailyReports)
    .orderBy(desc(dailyReports.createdAt))
    .limit(limit)
    .offset(offset);

  return NextResponse.json({
    data: rows.map((r) => ({
      id: r.id,
      name: r.name,
      date: r.date,
      tasks_completed: r.tasksCompleted,
      tasks_in_progress: r.tasksInProgress,
      blockers: r.blockers,
      hours_worked: r.hoursWorked,
      created_at: r.createdAt,
    })),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name || !body.date || !body.tasks_completed || !body.hours_worked) {
    return NextResponse.json(
      { error: "name, date, tasks_completed, and hours_worked are required" },
      { status: 400 }
    );
  }

  const [report] = await db
    .insert(dailyReports)
    .values({
      name: body.name,
      date: body.date,
      tasksCompleted: body.tasks_completed,
      tasksInProgress: body.tasks_in_progress || null,
      blockers: body.blockers || null,
      hoursWorked: parseFloat(body.hours_worked),
    })
    .returning();

  return NextResponse.json({ report }, { status: 201 });
}
