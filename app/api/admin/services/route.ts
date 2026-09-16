import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { requireAdminApi } from "@/lib/auth";
import { serviceSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  const body = await request.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid data.", issues: parsed.error.flatten() }, { status: 400 });
  }

  try {
    await connectDB();
    const service = await Service.create(parsed.data);
    return NextResponse.json({ success: true, service });
  } catch (err: unknown) {
    const message = err instanceof Error && err.message.includes("duplicate")
      ? "A service with this slug already exists."
      : "Failed to create service.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
