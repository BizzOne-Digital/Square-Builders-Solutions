import connectDB from "@/lib/mongodb";
import Service, { IService } from "@/models/Service";
import ServicesManager from "@/components/admin/ServicesManager";

export const dynamic = "force-dynamic";

async function getServices(): Promise<IService[]> {
  await connectDB();
  const docs = await Service.find().sort({ order: 1, createdAt: -1 }).lean<IService[]>();
  return JSON.parse(JSON.stringify(docs));
}

export default async function AdminServicesPage() {
  const services = await getServices();
  return <ServicesManager services={services} />;
}
