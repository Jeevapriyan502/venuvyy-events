import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import AdminDashboard from "@/components/admin/AdminDashboard";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  const packages = await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serializedPackages = packages.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price.toString(),
    imageUrl: p.imageUrl,
    eventType: p.eventType,
    isActive: p.isActive,
  }));

  const enquiries = await prisma.enquiry.count();

  return (
    <main className="min-h-screen bg-[#0f0f10] text-white">
      <header className="border-b border-[#d4af37]/20 bg-[#1a1a1b]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo variant="dark" size="sm" />
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-400 sm:block">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-logo text-3xl tracking-wide text-white">Admin Dashboard</h1>
        <p className="mt-2 text-slate-400">Upload packages and manage your event catalogue</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#d4af37]/20 bg-[#1a1a1b] p-6">
            <p className="text-sm text-[#d4af37]">Total Packages</p>
            <p className="mt-1 font-logo text-3xl text-white">{packages.length}</p>
          </div>
          <div className="rounded-xl border border-[#d4af37]/20 bg-[#1a1a1b] p-6">
            <p className="text-sm text-[#d4af37]">Active Packages</p>
            <p className="mt-1 font-logo text-3xl text-white">
              {packages.filter((p) => p.isActive).length}
            </p>
          </div>
          <div className="rounded-xl border border-[#d4af37]/20 bg-[#1a1a1b] p-6">
            <p className="text-sm text-[#d4af37]">Enquiries</p>
            <p className="mt-1 font-logo text-3xl text-white">{enquiries}</p>
          </div>
        </div>

        <AdminDashboard initialPackages={serializedPackages} />
      </div>
    </main>
  );
}
