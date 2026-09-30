import connectDB from "@/lib/mongodb";
import SiteSettings, { ISiteSettings } from "@/models/SiteSettings";
import PageContent from "@/models/PageContent";
import HomeContentForm from "@/components/admin/HomeContentForm";
import AboutContentForm from "@/components/admin/AboutContentForm";

export const dynamic = "force-dynamic";

interface AboutContent {
  heading?: string;
  intro?: string;
  imageUrl?: string;
}

async function getData() {
  await connectDB();
  const [settings, aboutDoc] = await Promise.all([
    SiteSettings.findOne().lean<ISiteSettings>(),
    PageContent.findOne({ pageKey: "about" }).lean<{ content: AboutContent }>(),
  ]);
  return { settings, aboutContent: aboutDoc?.content || {} };
}

export default async function AdminPagesPage() {
  const { settings, aboutContent } = await getData();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-soft-black">Pages</h1>
      <p className="mt-1 text-sm text-soft-black/60">
        Edit the editable content on the Home and About pages.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <HomeContentForm
          initial={{
            heroTitle: settings?.heroTitle || "Building Excellence, Maintaining Trust",
            heroSubtitle:
              settings?.heroSubtitle ||
              "Full-service roofing, HVAC, and remodeling for homes and businesses across Central Florida.",
            heroImageUrl: settings?.heroImageUrl || "",
            ctaText: settings?.ctaText || "Get a Free Estimate",
            aboutPreviewText: settings?.aboutPreviewText || "",
          }}
        />
        <AboutContentForm
          initial={{
            heading: aboutContent.heading || "Built on Craftsmanship. Guided by Trust.",
            intro:
              aboutContent.intro ||
              "Square Builders Solutions is a Central Florida-based contractor serving homeowners and business owners with roofing, HVAC, and remodeling expertise.",
            imageUrl: aboutContent.imageUrl || "",
          }}
        />
      </div>
    </div>
  );
}
