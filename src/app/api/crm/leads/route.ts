import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads, activities } from "@/lib/schema/crm";
import { desc, asc, like, eq, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search") || "";
  const stage = searchParams.get("stage") || "";
  const priority = searchParams.get("priority") || "";
  const source = searchParams.get("source") || "";
  const sortBy = searchParams.get("sort") || "created_at";
  const sortDir = searchParams.get("dir") || "desc";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");

  let query = db.select().from(leads).$dynamic();

  const conditions = [];
  if (search) conditions.push(like(leads.companyName, `%${search}%`));
  if (stage) conditions.push(eq(leads.stage, stage as "new"));
  if (priority) conditions.push(eq(leads.priority, priority as "low"));
  if (source) conditions.push(eq(leads.source, source as "manual"));

  if (conditions.length > 0) {
    for (const c of conditions) {
      query = query.where(c);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allowedSorts: Record<string, any> = {
    created_at: leads.createdAt,
    updated_at: leads.updatedAt,
    company_name: leads.companyName,
    deal_value: leads.dealValue,
    stage: leads.stage,
    priority: leads.priority,
  };

  const sortCol = allowedSorts[sortBy] || leads.createdAt;
  const orderFn = sortDir === "asc" ? asc : desc;
  query = query.orderBy(orderFn(sortCol));

  const offset = (page - 1) * limit;
  query = query.limit(limit).offset(offset);

  const rows = await query;

  // Get total count
  const countResult = db
    .select({ count: sql<number>`count(*)` })
    .from(leads);
  let countQuery = countResult.$dynamic();
  for (const c of conditions) {
    countQuery = countQuery.where(c);
  }
  const [totalRow] = await countQuery;
  const total = totalRow?.count ?? 0;

  return NextResponse.json({
    data: rows,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const [lead] = await db.insert(leads).values({
    companyName: body.company_name,
    companyWebsite: body.company_website || null,
    contactName: body.contact_name || null,
    contactEmail: body.contact_email || null,
    contactTitle: body.contact_title || null,
    stage: body.stage || "new",
    priority: body.priority || "medium",
    dealValue: body.deal_value || null,
    source: body.source || "manual",
    nextFollowUp: body.next_follow_up || null,
  }).returning();

  await db.insert(activities).values({
    leadId: lead.id,
    type: "note",
    title: "Lead created",
    description: `New lead created (source: ${lead.source || "manual"})`,
  });

  return NextResponse.json({ lead }, { status: 201 });
}
