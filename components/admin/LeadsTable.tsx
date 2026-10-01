"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { LEAD_STATUSES } from "@/lib/constants";
import type { ILead } from "@/models/Lead";

export default function LeadsTable({ leads }: { leads: ILead[] }) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<ILead | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = useMemo(
    () => (statusFilter === "all" ? leads : leads.filter((l) => l.status === statusFilter)),
    [leads, statusFilter]
  );

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <label htmlFor="statusFilter" className="text-sm font-medium text-soft-black/70">
          Filter by status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-soft-gray px-3 py-1.5 text-sm"
        >
          <option value="all">All</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl2 bg-white shadow-premium">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-soft-gray text-soft-black/50">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Property</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Message</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-soft-black/50">
                  No leads found.
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr key={lead._id} className="border-b border-soft-gray/60">
                  <td className="px-4 py-3 font-medium text-soft-black">{lead.name}</td>
                  <td className="px-4 py-3 text-soft-black/70">
                    <div>{lead.email}</div>
                    <div className="text-xs text-soft-black/50">{lead.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-soft-black/70">{lead.projectType}</td>
                  <td className="px-4 py-3 text-soft-black/70">{lead.propertyType}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      disabled={updating === lead._id}
                      onChange={(e) => updateStatus(lead._id, e.target.value)}
                      className="rounded-full border border-soft-gray bg-gold/10 px-2.5 py-1 text-xs font-semibold text-gold"
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-soft-black/50">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setSelected(lead)}
                      className="text-sm font-medium text-gold hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl2 bg-white p-6 shadow-premium">
            <div className="flex items-start justify-between">
              <h3 className="font-heading text-lg font-semibold text-soft-black">
                {selected.name}
              </h3>
              <button onClick={() => setSelected(null)} aria-label="Close">
                <X className="h-5 w-5 text-soft-black/50" />
              </button>
            </div>
            <p className="mt-2 text-sm text-soft-black/60">
              {selected.email} · {selected.phone}
            </p>
            <p className="mt-1 text-sm text-soft-black/60">
              {selected.projectType} · {selected.propertyType}
            </p>
            <p className="mt-4 whitespace-pre-wrap rounded-lg bg-cream p-4 text-sm text-soft-black/80">
              {selected.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
