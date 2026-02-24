import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tags } from "@/lib/schema/crm";
import { eq } from "drizzle-orm";

export async function GET() {
  const rows = await db.select().from(tags);
  return NextResponse.json({ tags: rows });
}

export async function POST(request: NextRequest) {
  const { name, color } = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const [tag] = await db.insert(tags).values({
      name,
      color: color || "#2176FF",
    }).returning();
    return NextResponse.json({ tag }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Tag already exists" }, { status: 409 });
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  await db.delete(tags).where(eq(tags.id, id));
  return NextResponse.json({ success: true });
}
