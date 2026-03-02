import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dataRoomDocuments } from "@/lib/schema/crm";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updates: Record<string, unknown> = {
    updatedAt: new Date().toISOString(),
  };

  if (body.name !== undefined) updates.name = body.name;
  if (body.description !== undefined) updates.description = body.description;
  if (body.category !== undefined) updates.category = body.category;
  if (body.file_url !== undefined) updates.fileUrl = body.file_url;
  if (body.file_type !== undefined) updates.fileType = body.file_type;
  if (body.shared_by !== undefined) updates.sharedBy = body.shared_by;

  const [doc] = await db
    .update(dataRoomDocuments)
    .set(updates)
    .where(eq(dataRoomDocuments.id, parseInt(id)))
    .returning();

  if (!doc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  return NextResponse.json({
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
  });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [doc] = await db
    .delete(dataRoomDocuments)
    .where(eq(dataRoomDocuments.id, parseInt(id)))
    .returning();

  if (!doc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
