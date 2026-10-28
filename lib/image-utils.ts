/**
 * Resolves an image URL for rendering. Legacy filesystem-based `/uploads/...`
 * URLs (from a previous, non-serverless-safe implementation) are mapped to a
 * static placeholder. `/api/uploads/**` and external URLs pass through.
 *
 * Mongoose-free on purpose: imported by client components (e.g. image upload
 * previews), so it must never pull in server-only database code.
 */
export function resolveImageUrl(url: string | undefined | null): string {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("/uploads/")) return "/placeholder.svg";
  return url;
}
