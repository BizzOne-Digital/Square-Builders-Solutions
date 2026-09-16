import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import StoredUpload, { UPLOAD_FOLDERS } from "@/models/StoredUpload";
import { requireAdminApi } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  const folder = request.nextUrl.searchParams.get("folder");
  const query: Record<string, unknown> = {};
  if (folder && UPLOAD_FOLDERS.includes(folder as (typeof UPLOAD_FOLDERS)[number])) {
    query.folder = folder;
  }

  await connectDB();
  const uploads = await StoredUpload.find(query, { data: 0 }).sort({ createdAt: -1 }).lean();

  return NextResponse.json({ success: true, uploads: JSON.parse(JSON.stringify(uploads)) });
}
