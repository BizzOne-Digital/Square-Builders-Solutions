"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import type { ITestimonial } from "@/models/Testimonial";

type FormState = {
  customerName: string;
  location: string;
  rating: number;
  review: string;
  projectType: string;
  imageUrl: string;
  featured: boolean;
  published: boolean;
};

const EMPTY: FormState = {
  customerName: "",
  location: "",
  rating: 5,
  review: "",
  projectType: "",
  imageUrl: "",
  featured: false,
  published: true,
};

export default function TestimonialForm({
  testimonial,
  onDone,
}: {
  testimonial?: ITestimonial;
  onDone: () => void;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(
    testimonial
      ? {
          customerName: testimonial.customerName,
          location: testimonial.location,
          rating: testimonial.rating,
          review: testimonial.review,
          projectType: testimonial.projectType,
          imageUrl: testimonial.imageUrl || "",
          featured: testimonial.featured,
          published: testimonial.published,
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
      const url = testimonial
        ? `/api/admin/testimonials/${testimonial._id}`
        : "/api/admin/testimonials";
      const method = testimonial ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to save testimonial.");
        setSaving(false);
        return;
      }
      router.refresh();
      onDone();
    } catch {
      setError("Failed to save testimonial.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-soft-black">Customer Name</label>
          <input
            required
            value={form.customerName}
            onChange={(e) => update("customerName", e.target.value)}
            className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-soft-black">Location</label>
          <input
            required
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-soft-black">Project Type</label>
          <input
            required
            value={form.projectType}
            onChange={(e) => update("projectType", e.target.value)}
            className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-soft-black">Rating</label>
          <select
            value={form.rating}
            onChange={(e) => update("rating", Number(e.target.value))}
            className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} Star{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">Review</label>
        <textarea
          required
          rows={4}
          value={form.review}
          onChange={(e) => update("review", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      <AdminImageUpload
        value={form.imageUrl}
        onChange={(url) => update("imageUrl", url)}
        folder="gallery"
        label="Customer Photo (optional)"
      />

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-soft-black">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="h-4 w-4 accent-[#D4AF37]"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-soft-black">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => update("published", e.target.checked)}
            className="h-4 w-4 accent-[#D4AF37]"
          />
          Published
        </label>
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
          {saving ? "Saving..." : "Save Testimonial"}
        </button>
      </div>
    </form>
  );
}
