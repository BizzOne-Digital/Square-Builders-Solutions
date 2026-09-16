import Link from "next/link";
import { Inbox, Mail, Quote, Hammer } from "lucide-react";
import connectDB from "@/lib/mongodb";
import Lead, { ILead } from "@/models/Lead";
import Testimonial from "@/models/Testimonial";
import Service from "@/models/Service";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  await connectDB();
  const [totalLeads, newLeads, testimonialCount, serviceCount, recentLeads] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: "new" }),
    Testimonial.countDocuments(),
    Service.countDocuments(),
    Lead.find().sort({ createdAt: -1 }).limit(8).lean<ILead[]>(),
  ]);

  return {
    totalLeads,
    newLeads,
    testimonialCount,
    serviceCount,
    recentLeads: JSON.parse(JSON.stringify(recentLeads)) as ILead[],
  };
}

export default async function AdminDashboardPage() {
  const { totalLeads, newLeads, testimonialCount, serviceCount, recentLeads } =
    await getDashboardData();

  const cards = [
    { label: "Total Leads", value: totalLeads, icon: Inbox },
    { label: "New Leads", value: newLeads, icon: Mail },
    { label: "Testimonials", value: testimonialCount, icon: Quote },
    { label: "Services", value: serviceCount, icon: Hammer },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-soft-black">Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl2 bg-white p-6 shadow-premium">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-soft-black/60">{card.label}</p>
              <card.icon className="h-5 w-5 text-gold" />
            </div>
            <p className="mt-3 font-heading text-3xl font-bold text-soft-black">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl2 bg-white p-6 shadow-premium">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-soft-black">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm font-medium text-gold hover:underline">
            View all
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-soft-gray text-soft-black/50">
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Project</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 pr-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-soft-black/50">
                    No leads yet.
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr key={lead._id} className="border-b border-soft-gray/60">
                    <td className="py-3 pr-4 font-medium text-soft-black">{lead.name}</td>
                    <td className="py-3 pr-4 text-soft-black/70">{lead.projectType}</td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-gold/10 px-2.5 py-1 text-xs font-semibold text-gold">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-soft-black/50">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
