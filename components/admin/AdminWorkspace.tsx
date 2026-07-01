"use client";

import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminShell, { useAdminSection } from "@/components/admin/AdminShell";
import type { CustomerEventItem } from "@/components/admin/EditCustomerEventForm";
import type { GalleryImageItem } from "@/components/admin/EditGalleryForm";
import type { AdminSectionId } from "@/lib/admin-sections";

type Package = {
  id: string;
  title: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  eventType: string | null;
  isActive: boolean;
};

type AdminStats = {
  packages: number;
  activePackages: number;
  enquiries: number;
  gallery: number;
  bookings: number;
};

const OVERVIEW_SEGMENTS: {
  id: AdminSectionId;
  label: string;
  description: string;
  icon: string;
  statKey: keyof AdminStats;
}[] = [
  {
    id: "packages-admin",
    label: "Packages",
    description: "Manage event packages on the homepage.",
    icon: "📦",
    statKey: "packages",
  },
  {
    id: "gallery-admin",
    label: "Gallery",
    description: "Upload happy client photos for the memory gallery.",
    icon: "🖼",
    statKey: "gallery",
  },
  {
    id: "bookings-admin",
    label: "Bookings",
    description: "Client events shown on My Events.",
    icon: "📅",
    statKey: "bookings",
  },
];

function OverviewPanel({
  stats,
  onNavigate,
}: {
  stats: AdminStats;
  onNavigate: (section: AdminSectionId) => void;
}) {
  return (
    <header className="admin-page-header">
      <p className="section-label">Admin</p>
      <h1 className="admin-page-title">Overview</h1>
      <p className="admin-page-subtitle">
        Quick summary of your site. Open a section from the sidebar or below to manage
        packages, gallery, and bookings.
      </p>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <p className="admin-stat-label">Packages</p>
          <p className="admin-stat-value">{stats.packages}</p>
        </div>
        <div className="admin-stat-card">
          <p className="admin-stat-label">Active</p>
          <p className="admin-stat-value">{stats.activePackages}</p>
        </div>
        <div className="admin-stat-card">
          <p className="admin-stat-label">Enquiries</p>
          <p className="admin-stat-value">{stats.enquiries}</p>
        </div>
        <div className="admin-stat-card">
          <p className="admin-stat-label">Gallery</p>
          <p className="admin-stat-value">{stats.gallery}</p>
        </div>
      </div>

      <div className="admin-overview-segments">
        {OVERVIEW_SEGMENTS.map((segment) => (
          <button
            key={segment.id}
            type="button"
            onClick={() => onNavigate(segment.id)}
            className="admin-overview-segment"
          >
            <span className="admin-overview-segment-icon" aria-hidden>
              {segment.icon}
            </span>
            <div className="admin-overview-segment-body">
              <h2 className="admin-overview-segment-title">{segment.label}</h2>
              <p className="admin-overview-segment-desc">{segment.description}</p>
            </div>
            <span className="admin-overview-segment-count">{stats[segment.statKey]}</span>
            <span className="admin-overview-segment-arrow" aria-hidden>
              →
            </span>
          </button>
        ))}
      </div>
    </header>
  );
}

export default function AdminWorkspace({
  email,
  stats,
  initialPackages,
  initialGallery,
  initialCustomerEvents,
}: {
  email: string;
  stats: AdminStats;
  initialPackages: Package[];
  initialGallery: GalleryImageItem[];
  initialCustomerEvents: CustomerEventItem[];
}) {
  const { activeSection, navigate } = useAdminSection();

  return (
    <AdminShell email={email} activeSection={activeSection} onNavigate={navigate}>
      {activeSection === "overview" && (
        <OverviewPanel stats={stats} onNavigate={navigate} />
      )}

      {activeSection !== "overview" && (
        <AdminDashboard
          view={activeSection}
          initialPackages={initialPackages}
          initialGallery={initialGallery}
          initialCustomerEvents={initialCustomerEvents}
        />
      )}
    </AdminShell>
  );
}
