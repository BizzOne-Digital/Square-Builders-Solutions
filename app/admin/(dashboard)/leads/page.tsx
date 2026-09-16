import connectDB from "@/lib/mongodb";
import Lead, { ILead } from "@/models/Lead";
import LeadsTable from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

async function getLeads(): Promise<ILead[]> {
  await connectDB();
  const docs = await Lead.find().sort({ createdAt: -1 }).lean<ILead[]>();
  return JSON.parse(JSON.stringify(docs));
}

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-soft-black">Leads</h1>
      <p className="mt-1 text-sm text-soft-black/60">
        Review and manage inbound leads from the contact form.
      </p>
      <div className="mt-6">
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
