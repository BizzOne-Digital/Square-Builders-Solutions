import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import StoredUpload, { UPLOAD_FOLDERS } from "@/models/StoredUpload";

export const runtime = "nodejs";

const FILENAME_RE = /^[0-9]+-[0-9a-f]{12}\.(jpg|png|webp|gif)$/;

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ folder: string; filename: string }> }
) {
  const { folder, filename } = await context.params;

  if (!UPLOAD_FOLDERS.includes(folder as (typeof UPLOAD_FOLDERS)[number])) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  if (!FILENAME_RE.test(filename)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    await connectDB();
    const doc = await StoredUpload.findOne({ folder, filename });
    if (!doc) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    return new Response(doc.data, {
      headers: {
        "Content-Type": doc.mimeType,
        "Content-Length": String(doc.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
