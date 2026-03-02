import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dataRoomDocuments } from "@/lib/schema/crm";
import { desc, like, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const limit = parseInt(searchParams.get("limit") || "50");
  const page = parseInt(searchParams.get("page") || "1");
  const offset = (page - 1) * limit;
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  let query = db.select().from(dataRoomDocuments).$dynamic();

  const conditions = [];
  if (search) {
    conditions.push(like(dataRoomDocuments.name, `%${search}%`));
  }
  if (category && category !== "all") {
    conditions.push(eq(dataRoomDocuments.category, category as typeof dataRoomDocuments.category.enumValues[number]));
  }

  if (conditions.length > 0) {
    for (const cond of conditions) {
      query = query.where(cond);
    }
  }

  const rows = await query
    .orderBy(desc(dataRoomDocuments.createdAt))
    .limit(limit)
    .offset(offset);

  return NextResponse.json({
    data: rows.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      category: r.category,
      file_url: r.fileUrl,
      file_type: r.fileType,
      shared_by: r.sharedBy,
      created_at: r.createdAt,
      updated_at: r.updatedAt,
    })),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name || !body.file_url || !body.shared_by) {
    return NextResponse.json(
      { error: "name, file_url, and shared_by are required" },
      { status: 400 }
    );
  }

  const [doc] = await db
    .insert(dataRoomDocuments)
    .values({
      name: body.name,
      description: body.description || null,
      category: body.category || "other",
      fileUrl: body.file_url,
      fileType: body.file_type || null,
      sharedBy: body.shared_by,
    })
    .returning();

  return NextResponse.json(
    {
      data: {
        id: doc.id,
        name: doc.name,
        description: doc.description,
        category: doc.category,
        file_url: doc.fileUrl,
        file_type: doc.fileType,
        shared_by: doc.sharedBy,
        created_at: doc.createdAt,
        updated_at: doc.updatedAt,
      },
    },
    { status: 201 }
  );
}
