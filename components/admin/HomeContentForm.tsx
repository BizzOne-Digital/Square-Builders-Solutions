"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminImageUpload from "@/components/admin/AdminImageUpload";

export default function HomeContentForm({
  initial,
}: {
  initial: {
    heroTitle: string;
    heroSubtitle: string;
    heroImageUrl: string;
    ctaText: string;
    aboutPreviewText: string;
  };
}) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.success ? "Saved successfully." : data.error || "Failed to save.");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl2 bg-white p-6 shadow-premium">
      <h2 className="font-heading text-lg font-semibold text-soft-black">Homepage Hero</h2>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">Hero Title</label>
        <input
          value={form.heroTitle}
          onChange={(e) => update("heroTitle", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">Hero Subtitle</label>
        <textarea
          rows={2}
          value={form.heroSubtitle}
          onChange={(e) => update("heroSubtitle", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      <AdminImageUpload
        value={form.heroImageUrl}
        onChange={(url) => update("heroImageUrl", url)}
        folder="pages"
        label="Hero Image"
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">CTA Button Text</label>
        <input
          value={form.ctaText}
          onChange={(e) => update("ctaText", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">About Preview Text</label>
        <textarea
          rows={4}
          value={form.aboutPreviewText}
          onChange={(e) => update("aboutPreviewText", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      {message && <p className="text-sm text-soft-black/70">{message}</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-primary-black shadow-gold disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Homepage"}
      </button>
    </form>
  );
}
