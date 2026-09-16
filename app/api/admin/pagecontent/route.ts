import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import { requireAdminApi } from "@/lib/auth";
import { aboutContentSchema } from "@/lib/validation";
import { deleteStoredUploadByUrl } from "@/lib/uploads";

export const runtime = "nodejs";

export async function PUT(request: NextRequest) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  const body = await request.json();
  if (body.pageKey !== "about") {
    return NextResponse.json({ success: false, error: "Unsupported page." }, { status: 400 });
  }

  const parsed = aboutContentSchema.safeParse(body.content);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid data." }, { status: 400 });
  }

  await connectDB();
  const existing = await PageContent.findOne({ pageKey: "about" });
  const oldImageUrl = (existing?.content as { imageUrl?: string } | undefined)?.imageUrl;

  await PageContent.findOneAndUpdate(
    { pageKey: "about" },
    { pageKey: "about", content: parsed.data },
    { upsert: true, new: true }
  );

  if (oldImageUrl && oldImageUrl !== parsed.data.imageUrl) {
    await deleteStoredUploadByUrl(oldImageUrl);
  }

  return NextResponse.json({ success: true });
}
