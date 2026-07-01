import { prisma } from "@/lib/prisma";
import { getAdminUser, getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminWorkspace from "@/components/admin/AdminWorkspace";
import "./admin.css";

export default async function AdminPage() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/sign-in");

  const user = await getAdminUser();
  if (!user) redirect("/my-events");

  const packages = await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
  });

  const galleryImages = await prisma.galleryImage.findMany({
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

  const serializedGallery = galleryImages.map((g) => ({
    id: g.id,
    title: g.title,
    caption: g.caption,
    imageUrl: g.imageUrl,
    isActive: g.isActive,
  }));

  const enquiries = await prisma.enquiry.count();
  const customerEvents = await prisma.customerEvent.findMany({
    orderBy: { createdAt: "desc" },
  });
  const email = user.emailAddresses[0]?.emailAddress ?? "Admin";

  const serializedCustomerEvents = customerEvents.map((e) => ({
    id: e.id,
    customerEmail: e.customerEmail,
    title: e.title,
    eventType: e.eventType,
    eventDate: e.eventDate,
    guestCount: e.guestCount,
    description: e.description,
    imageUrl: e.imageUrl,
    status: e.status,
  }));

  const activePackages = packages.filter((p) => p.isActive).length;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AdminWorkspace
        email={email}
        stats={{
          packages: packages.length,
          activePackages,
          enquiries,
          gallery: galleryImages.length,
          bookings: customerEvents.length,
        }}
        initialPackages={serializedPackages}
        initialGallery={serializedGallery}
        initialCustomerEvents={serializedCustomerEvents}
      />
    </main>
  );
}
