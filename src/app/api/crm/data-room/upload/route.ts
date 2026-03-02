import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "data-room");
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 25MB." },
      { status: 400 }
    );
  }

  // Sanitize filename: keep extension, replace unsafe chars
  const ext = path.extname(file.name);
  const baseName = path
    .basename(file.name, ext)
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .substring(0, 100);
  const timestamp = Date.now();
  const fileName = `${baseName}_${timestamp}${ext}`;

  await mkdir(UPLOAD_DIR, { recursive: true });

  const bytes = await file.arrayBuffer();
  const filePath = path.join(UPLOAD_DIR, fileName);
  await writeFile(filePath, Buffer.from(bytes));

  return NextResponse.json({
    file_url: `/data-room/${fileName}`,
    file_name: file.name,
    file_type: file.type || ext.replace(".", ""),
    file_size: file.size,
  });
}
