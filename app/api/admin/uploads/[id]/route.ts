import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import { requireAdminApi } from "@/lib/auth";

export const runtime = "nodejs";

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  const { id } = await context.params;
  await connectDB();
  await StoredUpload.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
