import { requireAdmin } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className="min-h-dvh bg-cream">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader email={session.email} />
        <main className="p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
