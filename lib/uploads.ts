import connectDB from "@/lib/mongodb";
import StoredUpload, { UPLOAD_FOLDERS } from "@/models/StoredUpload";

export { resolveImageUrl } from "@/lib/image-utils";

const UPLOAD_URL_RE = /^\/api\/uploads\/([a-z]+)\/([a-zA-Z0-9._-]+)$/;

/**
 * Deletes a StoredUpload document referenced by a `/api/uploads/{folder}/{filename}`
 * URL. No-ops safely for external (e.g. Unsplash) or malformed URLs.
 *
 * Server-only (imports mongoose) — never import this from a client component.
 */
export async function deleteStoredUploadByUrl(url: string | undefined | null): Promise<void> {
  if (!url) return;
  const match = url.match(UPLOAD_URL_RE);
  if (!match) return;

  const [, folder, filename] = match;
  if (!UPLOAD_FOLDERS.includes(folder as (typeof UPLOAD_FOLDERS)[number])) return;

  try {
    await connectDB();
    await StoredUpload.deleteOne({ folder, filename });
  } catch {
    // Non-fatal: content update should not fail because cleanup failed.
  }
}
