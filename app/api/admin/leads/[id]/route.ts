import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead, { LEAD_STATUSES } from "@/models/Lead";
import { requireAdminApi } from "@/lib/auth";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  const { id } = await context.params;
  const body = await request.json();

  if (!LEAD_STATUSES.includes(body.status)) {
    return NextResponse.json({ success: false, error: "Invalid status." }, { status: 400 });
  }

  await connectDB();
  const updated = await Lead.findByIdAndUpdate(id, { status: body.status }, { new: true });
  if (!updated) {
    return NextResponse.json({ success: false, error: "Lead not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
