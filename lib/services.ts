import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { MAIN_SERVICES } from "@/lib/content";
import { resolveImageUrl } from "@/lib/uploads";

export type PublicService = {
  slug: string;
  title: string;
  icon: string;
  description: string;
  bullets: string[];
  image: string;
};

export async function getActiveServices(): Promise<PublicService[]> {
  try {
    await connectDB();
    const docs = await Service.find({ active: true }).sort({ order: 1, createdAt: 1 }).lean();
    if (docs.length === 0) return MAIN_SERVICES as unknown as PublicService[];

    return docs.map((d) => ({
      slug: d.slug,
      title: d.title,
      icon: d.icon || "Hammer",
      description: d.description,
      bullets: d.bullets && d.bullets.length > 0 ? d.bullets : [],
      image: resolveImageUrl(d.imageUrl) ,
    }));
  } catch {
    return MAIN_SERVICES as unknown as PublicService[];
  }
}
