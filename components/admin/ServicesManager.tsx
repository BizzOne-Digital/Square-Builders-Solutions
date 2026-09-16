"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import ServiceForm from "@/components/admin/ServiceForm";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import type { IService } from "@/models/Service";

export default function ServicesManager({ services }: { services: IService[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<IService | "new" | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IService | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/services/${deleteTarget._id}`, { method: "DELETE" });
      setDeleteTarget(null);
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-soft-black">Services</h1>
        <button
          type="button"
          onClick={() => setEditing("new")}
          className="flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-primary-black shadow-gold"
        >
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      {editing && (
        <div className="mt-6 rounded-xl2 bg-white p-6 shadow-premium">
          <h2 className="mb-4 font-heading text-lg font-semibold text-soft-black">
            {editing === "new" ? "New Service" : "Edit Service"}
          </h2>
          <ServiceForm
            service={editing === "new" ? undefined : editing}
            onDone={() => setEditing(null)}
          />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.length === 0 ? (
          <p className="text-soft-black/50">No services yet.</p>
        ) : (
          services.map((service) => (
            <div key={service._id} className="rounded-xl2 bg-white p-5 shadow-premium">
              <div className="flex items-start justify-between">
                <h3 className="font-heading text-base font-semibold text-soft-black">
                  {service.title}
                </h3>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    service.active ? "bg-green-100 text-green-700" : "bg-soft-gray text-soft-black/50"
                  }`}
                >
                  {service.active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="mt-2 text-sm text-soft-black/60 line-clamp-2">{service.description}</p>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(service)}
                  className="flex items-center gap-1.5 text-sm font-medium text-gold hover:underline"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(service)}
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
        title="Delete Service"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
