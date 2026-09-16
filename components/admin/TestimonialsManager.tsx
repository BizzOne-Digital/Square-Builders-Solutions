"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import TestimonialForm from "@/components/admin/TestimonialForm";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import StarRating from "@/components/ui/StarRating";
import type { ITestimonial } from "@/models/Testimonial";

export default function TestimonialsManager({ testimonials }: { testimonials: ITestimonial[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<ITestimonial | "new" | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ITestimonial | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/testimonials/${deleteTarget._id}`, { method: "DELETE" });
      setDeleteTarget(null);
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-soft-black">Testimonials</h1>
        <button
          type="button"
          onClick={() => setEditing("new")}
          className="flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-primary-black shadow-gold"
        >
          <Plus className="h-4 w-4" /> Add Testimonial
        </button>
      </div>

      {editing && (
        <div className="mt-6 rounded-xl2 bg-white p-6 shadow-premium">
          <h2 className="mb-4 font-heading text-lg font-semibold text-soft-black">
            {editing === "new" ? "New Testimonial" : "Edit Testimonial"}
          </h2>
          <TestimonialForm
            testimonial={editing === "new" ? undefined : editing}
            onDone={() => setEditing(null)}
          />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.length === 0 ? (
          <p className="text-soft-black/50">No testimonials yet.</p>
        ) : (
          testimonials.map((t) => (
            <div key={t._id} className="rounded-xl2 bg-white p-5 shadow-premium">
              <div className="flex items-start justify-between">
                <h3 className="font-heading text-base font-semibold text-soft-black">
                  {t.customerName}
                </h3>
                <div className="flex gap-1">
                  {t.featured && (
                    <span className="rounded-full bg-gold/10 px-2 py-0.5 text-xs font-semibold text-gold">
                      Featured
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      t.published ? "bg-green-100 text-green-700" : "bg-soft-gray text-soft-black/50"
                    }`}
                  >
                    {t.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
              <StarRating rating={t.rating} className="mt-2" />
              <p className="mt-2 text-sm text-soft-black/60 line-clamp-3">{t.review}</p>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(t)}
                  className="flex items-center gap-1.5 text-sm font-medium text-gold hover:underline"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(t)}
                  className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Testimonial"
        description={`Are you sure you want to delete this testimonial from "${deleteTarget?.customerName}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
