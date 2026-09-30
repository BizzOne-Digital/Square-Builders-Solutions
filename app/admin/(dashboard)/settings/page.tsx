import connectDB from "@/lib/mongodb";
import SiteSettings, { ISiteSettings } from "@/models/SiteSettings";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

async function getSettings(): Promise<ISiteSettings | null> {
  await connectDB();
  const doc = await SiteSettings.findOne().lean<ISiteSettings>();
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-soft-black">Settings</h1>
      <p className="mt-1 text-sm text-soft-black/60">
        Manage site-wide contact info and SEO defaults.
      </p>
      <div className="mt-6">
        <SettingsForm
          initial={{
            phone: settings?.phone || "321-292-4742",
            email: settings?.email || "karl@squarebuildersusa.com",
            location: settings?.location || "Central Florida",
            facebookUrl:
              settings?.facebookUrl || "https://www.facebook.com/profile.php?id=61570733018315",
            footerCopy: settings?.footerCopy || "Building Excellence. Maintaining Trust.",
            seoDefaultTitle:
              settings?.seoDefaultTitle ||
              "Square Builders Solutions | Roofing, HVAC & Remodeling in Central Florida",
            seoDefaultDescription: settings?.seoDefaultDescription || "",
          }}
        />
      </div>
    </div>
  );
}
