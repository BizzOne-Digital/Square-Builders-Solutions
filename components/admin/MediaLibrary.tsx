"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Copy, Trash2, Check } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface UploadItem {
  _id: string;
  folder: string;
  filename: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

const FOLDERS = ["all", "pages", "gallery", "products", "misc"] as const;

export default function MediaLibrary() {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [folder, setFolder] = useState<(typeof FOLDERS)[number]>("all");
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UploadItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const query = folder === "all" ? "" : `?folder=${folder}`;
      const res = await fetch(`/api/admin/uploads${query}`);
      const data = await res.json();
      setUploads(data.uploads || []);
    } finally {
      setLoading(false);
    }
  }, [folder]);

  useEffect(() => {
    load();
  }, [load]);

  function urlFor(item: UploadItem) {
    return `/api/uploads/${item.folder}/${item.filename}`;
  }

  async function handleCopy(item: UploadItem) {
    const url = `${window.location.origin}${urlFor(item)}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(item._id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/uploads/${deleteTarget._id}`, { method: "DELETE" });
      setDeleteTarget(null);
      await load();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        {FOLDERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFolder(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${
              folder === f ? "bg-gold-gradient text-primary-black" : "bg-white text-soft-black/70 shadow-sm"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-soft-black/50">Loading...</p>
      ) : uploads.length === 0 ? (
        <p className="text-soft-black/50">No uploads in this folder.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {uploads.map((item) => (
            <div key={item._id} className="overflow-hidden rounded-xl2 bg-white shadow-premium">
              <div className="relative h-32 w-full">
                <Image src={urlFor(item)} alt={item.filename} fill className="object-cover" />
              </div>
              <div className="p-2.5">
                <p className="truncate text-xs text-soft-black/60">{item.filename}</p>
                <p className="text-[10px] text-soft-black/40">{(item.size / 1024).toFixed(0)} KB</p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(item)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-cream py-1.5 text-xs font-medium text-soft-black hover:bg-soft-gray/50"
                  >
                    {copiedId === item._id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedId === item._id ? "Copied" : "Copy"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    className="flex items-center justify-center rounded-lg bg-red-50 px-2 py-1.5 text-red-600 hover:bg-red-100"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Media"
        description="Deleting this file may break any page currently referencing it. Continue?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
