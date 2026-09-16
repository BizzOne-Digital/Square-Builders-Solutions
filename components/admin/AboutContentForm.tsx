"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminImageUpload from "@/components/admin/AdminImageUpload";

export default function AboutContentForm({
  initial,
}: {
  initial: { heading: string; intro: string; imageUrl: string };
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
      const res = await fetch("/api/admin/pagecontent", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: "about", content: form }),
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
      <h2 className="font-heading text-lg font-semibold text-soft-black">About Page Hero</h2>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">Heading</label>
        <input
          value={form.heading}
          onChange={(e) => update("heading", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">Intro Paragraph</label>
        <textarea
          rows={3}
          value={form.intro}
          onChange={(e) => update("intro", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      <AdminImageUpload
        value={form.imageUrl}
        onChange={(url) => update("imageUrl", url)}
        folder="pages"
        label="Hero Background Image"
      />

      {message && <p className="text-sm text-soft-black/70">{message}</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-primary-black shadow-gold disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save About Page"}
      </button>
    </form>
  );
}
