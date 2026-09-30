import { Schema, models, model } from "mongoose";

export interface ISiteSettings {
  _id: string;
  phone: string;
  email: string;
  location: string;
  facebookUrl: string;
  footerCopy: string;
  seoDefaultTitle: string;
  seoDefaultDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  ctaText: string;
  aboutPreviewText: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    phone: { type: String, default: "321-292-4742" },
    email: { type: String, default: "karl@squarebuildersusa.com" },
    location: { type: String, default: "Central Florida" },
    facebookUrl: {
      type: String,
      default: "https://www.facebook.com/profile.php?id=61570733018315",
    },
    footerCopy: { type: String, default: "Building Excellence. Maintaining Trust." },
    seoDefaultTitle: {
      type: String,
      default: "Square Builders Solutions | Roofing, HVAC & Remodeling in Central Florida",
    },
    seoDefaultDescription: {
      type: String,
      default:
        "Square Builders Solutions delivers premium roofing, HVAC, kitchen and bathroom remodeling for residential and commercial clients in Central Florida.",
    },
    heroTitle: { type: String, default: "Building Excellence, Maintaining Trust" },
    heroSubtitle: {
      type: String,
      default:
        "Full-service roofing, HVAC, and remodeling for homes and businesses across Central Florida.",
    },
    heroImageUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop",
    },
    ctaText: { type: String, default: "Get a Free Estimate" },
    aboutPreviewText: {
      type: String,
      default:
        "For more than 15 years, Square Builders Solutions has helped homeowners and business owners across Central Florida protect and improve the properties they rely on every day.",
    },
  },
  { timestamps: true }
);

export default models.SiteSettings || model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
