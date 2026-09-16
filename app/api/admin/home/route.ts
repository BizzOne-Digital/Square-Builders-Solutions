import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { requireAdminApi } from "@/lib/auth";
import { homeContentSchema } from "@/lib/validation";
import { deleteStoredUploadByUrl } from "@/lib/uploads";

export const runtime = "nodejs";

export async function PUT(request: NextRequest) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  const body = await request.json();
  const parsed = homeContentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid data." }, { status: 400 });
  }

  await connectDB();
  const existing = await SiteSettings.findOne();
  const oldImageUrl = existing?.heroImageUrl;

  await SiteSettings.findOneAndUpdate({}, parsed.data, { upsert: true, new: true });

  if (oldImageUrl && oldImageUrl !== parsed.data.heroImageUrl) {
    await deleteStoredUploadByUrl(oldImageUrl);
  }

  return NextResponse.json({ success: true });
}
