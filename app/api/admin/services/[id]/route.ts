import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { requireAdminApi } from "@/lib/auth";
import { serviceSchema } from "@/lib/validation";
import { deleteStoredUploadByUrl } from "@/lib/uploads";

export const runtime = "nodejs";

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  const { id } = await context.params;
  const body = await request.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid data." }, { status: 400 });
  }

  await connectDB();
  const existing = await Service.findById(id);
  if (!existing) return NextResponse.json({ success: false, error: "Not found." }, { status: 404 });

  const oldImageUrl = existing.imageUrl;
  Object.assign(existing, parsed.data);
  await existing.save();

  if (oldImageUrl && oldImageUrl !== parsed.data.imageUrl) {
    await deleteStoredUploadByUrl(oldImageUrl);
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  const { id } = await context.params;
  await connectDB();
  const existing = await Service.findByIdAndDelete(id);
  if (existing?.imageUrl) {
    await deleteStoredUploadByUrl(existing.imageUrl);
  }

  return NextResponse.json({ success: true });
}
