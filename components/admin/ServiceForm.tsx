"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import { slugify } from "@/lib/utils";
import type { IService } from "@/models/Service";

type FormState = {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  icon: string;
  order: number;
  active: boolean;
};

const EMPTY: FormState = {
  title: "",
  slug: "",
  description: "",
  longDescription: "",
  imageUrl: "",
  icon: "Hammer",
  order: 0,
  active: true,
};

export default function ServiceForm({
  service,
  onDone,
}: {
  service?: IService;
  onDone: () => void;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(
    service
      ? {
          title: service.title,
          slug: service.slug,
          description: service.description,
          longDescription: service.longDescription || "",
          imageUrl: service.imageUrl || "",
          icon: service.icon || "Hammer",
          order: service.order || 0,
          active: service.active,
        }
      : EMPTY
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const url = service ? `/api/admin/services/${service._id}` : "/api/admin/services";
      const method = service ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to save service.");
        setSaving(false);
        return;
      }
      router.refresh();
      onDone();
    } catch {
      setError("Failed to save service.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-soft-black">Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => {
              update("title", e.target.value);
              if (!service) update("slug", slugify(e.target.value));
            }}
            className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-soft-black">Slug</label>
          <input
            required
            value={form.slug}
            onChange={(e) => update("slug", slugify(e.target.value))}
            className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">Short Description</label>
        <textarea
          required
          rows={2}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">Long Description</label>
        <textarea
          rows={4}
          value={form.longDescription}
          onChange={(e) => update("longDescription", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      <AdminImageUpload
        value={form.imageUrl}
        onChange={(url) => update("imageUrl", url)}
        folder="products"
        label="Service Image"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-soft-black">
            Icon (lucide name)
          </label>
          <input
            value={form.icon}
            onChange={(e) => update("icon", e.target.value)}
            className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-soft-black">Order</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => update("order", Number(e.target.value))}
            className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm font-medium text-soft-black">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => update("active", e.target.checked)}
              className="h-4 w-4 accent-[#D4AF37]"
            />
            Active
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onDone}
          className="rounded-full border border-soft-gray px-5 py-2.5 text-sm font-medium hover:bg-soft-gray/40"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-primary-black shadow-gold disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Service"}
        </button>
      </div>
    </form>
  );
}
