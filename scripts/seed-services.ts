import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import Service from "../models/Service";
import { MAIN_SERVICES } from "../lib/content";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set.");

  await mongoose.connect(uri);

  for (let i = 0; i < MAIN_SERVICES.length; i++) {
    const s = MAIN_SERVICES[i];
    const existing = await Service.findOne({ slug: s.slug });
    if (existing) {
      console.log(`Skipped (already exists): ${s.title}`);
      continue;
    }
    await Service.create({
      title: s.title,
      slug: s.slug,
      description: s.description,
      longDescription: "",
      bullets: s.bullets,
      imageUrl: s.image,
      icon: s.icon,
      order: i,
      active: true,
    });
    console.log(`Seeded: ${s.title}`);
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
