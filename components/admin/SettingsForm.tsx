"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsForm({
  initial,
}: {
  initial: {
    phone: string;
    email: string;
    location: string;
    facebookUrl: string;
    footerCopy: string;
    seoDefaultTitle: string;
    seoDefaultDescription: string;
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
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.success ? "Settings saved." : data.error || "Failed to save.");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl2 bg-white p-6 shadow-premium">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-soft-black">Phone</label>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-soft-black">Email</label>
          <input
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">Location</label>
        <input
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">Facebook URL</label>
        <input
          value={form.facebookUrl}
          onChange={(e) => update("facebookUrl", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">Footer Copy</label>
        <input
          value={form.footerCopy}
          onChange={(e) => update("footerCopy", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">SEO Default Title</label>
        <input
          value={form.seoDefaultTitle}
          onChange={(e) => update("seoDefaultTitle", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-soft-black">SEO Default Description</label>
        <textarea
          rows={3}
          value={form.seoDefaultDescription}
          onChange={(e) => update("seoDefaultDescription", e.target.value)}
          className="w-full rounded-lg border border-soft-gray px-3 py-2 text-sm"
        />
      </div>

      {message && <p className="text-sm text-soft-black/70">{message}</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-primary-black shadow-gold disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
