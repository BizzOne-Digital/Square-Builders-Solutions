import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { requireAdminApi } from "@/lib/auth";
import { testimonialSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  const body = await request.json();
  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid data." }, { status: 400 });
  }

  await connectDB();
  const testimonial = await Testimonial.create(parsed.data);
  return NextResponse.json({ success: true, testimonial });
}
