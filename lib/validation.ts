import { z } from "zod";
import { PROJECT_TYPES, PROPERTY_TYPES } from "@/models/Lead";
import { UPLOAD_FOLDERS } from "@/models/StoredUpload";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(30),
  projectType: z.enum(PROJECT_TYPES, { message: "Please select a project type." }),
  propertyType: z.enum(PROPERTY_TYPES, { message: "Please select residential or commercial." }),
  message: z.string().trim().min(10, "Please tell us a bit more about your project.").max(3000),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1, "Password is required."),
});

export const serviceSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens."),
  description: z.string().trim().min(2).max(500),
  longDescription: z.string().trim().max(5000).optional().default(""),
  imageUrl: z.string().trim().optional().default(""),
  icon: z.string().trim().min(1).max(60).default("Hammer"),
  order: z.coerce.number().int().default(0),
  active: z.coerce.boolean().default(true),
});

export const testimonialSchema = z.object({
  customerName: z.string().trim().min(2).max(120),
  location: z.string().trim().min(2).max(120),
  rating: z.coerce.number().int().min(1).max(5),
  review: z.string().trim().min(10).max(3000),
  projectType: z.string().trim().min(2).max(120),
  imageUrl: z.string().trim().optional().default(""),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
});

export const siteSettingsSchema = z.object({
  phone: z.string().trim().min(3).max(40),
  email: z.string().trim().email(),
  location: z.string().trim().min(2).max(200),
  facebookUrl: z.string().trim().max(300).optional().default(""),
  footerCopy: z.string().trim().max(300).optional().default(""),
  seoDefaultTitle: z.string().trim().max(200).optional().default(""),
  seoDefaultDescription: z.string().trim().max(400).optional().default(""),
});

export const homeContentSchema = z.object({
  heroTitle: z.string().trim().min(2).max(200),
  heroSubtitle: z.string().trim().min(2).max(400),
  heroImageUrl: z.string().trim().optional().default(""),
  ctaText: z.string().trim().min(2).max(60),
  aboutPreviewText: z.string().trim().min(2).max(1000),
});

export const aboutContentSchema = z.object({
  heading: z.string().trim().min(2).max(200),
  intro: z.string().trim().min(2).max(2000),
  imageUrl: z.string().trim().optional().default(""),
});

export const uploadFolderSchema = z.enum(UPLOAD_FOLDERS);
