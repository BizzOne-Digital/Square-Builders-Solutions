import { UserCircle } from "lucide-react";

export default function AdminHeader({ email }: { email: string }) {
  return (
    <header className="flex h-16 items-center justify-end border-b border-soft-gray bg-white px-6">
      <div className="flex items-center gap-2 text-sm text-soft-black/70">
        <UserCircle className="h-5 w-5 text-gold" />
        {email}
      </div>
    </header>
  );
}
