import MediaLibrary from "@/components/admin/MediaLibrary";

export const dynamic = "force-dynamic";

export default function AdminMediaPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-soft-black">Media Library</h1>
      <p className="mt-1 text-sm text-soft-black/60">
        Browse, copy, and delete images uploaded through the admin portal.
      </p>
      <div className="mt-6">
        <MediaLibrary />
      </div>
    </div>
  );
}
