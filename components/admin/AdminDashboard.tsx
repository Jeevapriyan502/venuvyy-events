"use client";

import { useState } from "react";
import Image from "next/image";
import AddPackageForm from "./AddPackageForm";
import AddGalleryForm from "./AddGalleryForm";
import EditPackageForm from "./EditPackageForm";
import EditGalleryForm, { type GalleryImageItem } from "./EditGalleryForm";
import CustomerEventsSection from "./CustomerEventsSection";
import type { CustomerEventItem } from "./EditCustomerEventForm";
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

type GalleryImage = GalleryImageItem;

export default function AdminDashboard({
  view,
  initialPackages,
  initialGallery,
  initialCustomerEvents,
}: {
  view: Exclude<AdminSectionId, "overview">;
  initialPackages: Package[];
  initialGallery: GalleryImage[];
  initialCustomerEvents: CustomerEventItem[];
}) {
  const [packages, setPackages] = useState(initialPackages);
  const [gallery, setGallery] = useState(initialGallery);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);

  const refreshPackages = async () => {
    const res = await fetch("/api/packages?all=true");
    const data = await res.json();
    if (Array.isArray(data)) setPackages(data);
  };

  const refreshGallery = async () => {
    const res = await fetch("/api/gallery?all=true");
    const data = await res.json();
    setGallery(data);
  };

  return (
    <>
      {view === "packages-admin" && (
      <section className="admin-section">
        <div className="admin-section-header">
          <p className="admin-section-label">Catalogue</p>
          <h2 className="admin-section-title">Packages</h2>
          <p className="admin-section-desc">Upload and edit event packages shown on the homepage.</p>
        </div>

        <div className="admin-split">
          <div className="admin-panel admin-panel-fill">
            <h3 className="text-sm font-semibold">Package catalogue ({packages.length})</h3>
            <p className="mt-1 text-sm text-muted">All packages on the public site.</p>
            <div className="admin-list mt-4">
              {packages.length === 0 ? (
                <p className="text-sm text-muted">No packages yet.</p>
              ) : (
                packages.map((pkg) => (
                  <div key={pkg.id} className="admin-list-item">
                    <div className="admin-list-item-row">
                      {pkg.imageUrl ? (
                        <Image
                          src={pkg.imageUrl}
                          alt={pkg.title}
                          width={72}
                          height={72}
                          className="admin-list-thumb"
                        />
                      ) : (
                        <div className="admin-list-thumb-placeholder">📦</div>
                      )}
                      <div className="admin-list-body">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="admin-list-title">{pkg.title}</h3>
                            <p className="admin-list-price">
                              ₹{Number(pkg.price).toLocaleString("en-IN")}
                            </p>
                            <p className="admin-list-meta">{pkg.eventType}</p>
                            {!pkg.isActive && <span className="admin-badge">Hidden</span>}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingPackageId(editingPackageId === pkg.id ? null : pkg.id)
                            }
                            className="admin-btn admin-btn-ghost"
                          >
                            {editingPackageId === pkg.id ? "Close" : "Edit"}
                          </button>
                        </div>
                        {pkg.description && editingPackageId !== pkg.id && (
                          <p className="mt-2 line-clamp-2 text-xs text-muted">{pkg.description}</p>
                        )}
                      </div>
                    </div>

                    {editingPackageId === pkg.id && (
                      <div className="mt-4 w-full border-t border-border pt-4">
                        <EditPackageForm
                          pkg={pkg}
                          onSuccess={refreshPackages}
                          onCancel={() => setEditingPackageId(null)}
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="admin-panel admin-panel-sticky">
            <h3 className="text-sm font-semibold">Add package</h3>
            <p className="mt-1 text-sm text-muted">
              Include image, price, and event type for category counts.
            </p>
            <div className="mt-5">
              <AddPackageForm onSuccess={refreshPackages} />
            </div>
          </div>
        </div>
      </section>
      )}

      {view === "gallery-admin" && (
      <section className="admin-section">
        <div className="admin-section-header">
          <p className="admin-section-label">Homepage</p>
          <h2 className="admin-section-title">Memory gallery</h2>
          <p className="admin-section-desc">Happy client photos in the scrolling gallery section.</p>
        </div>

        <div className="admin-split admin-split-gallery">
          <div className="admin-panel admin-panel-sticky">
            <h3 className="text-sm font-semibold">Memory gallery</h3>
            <p className="mt-1 text-sm text-muted">
              Upload happy client photos for the homepage scroll gallery.
            </p>
            <div className="mt-5">
              <AddGalleryForm onSuccess={refreshGallery} />
            </div>
          </div>

          <div className="admin-panel admin-panel-fill">
            <h3 className="text-sm font-semibold">Gallery images ({gallery.length})</h3>
            <p className="mt-1 text-sm text-muted">Preview of images shown on the site.</p>
            <div className="admin-gallery-grid mt-4">
              {gallery.length === 0 ? (
                <p className="text-sm text-muted">No gallery images yet.</p>
              ) : (
                gallery.map((img) => (
                  <div
                    key={img.id}
                    className={`admin-gallery-card-wrapper${
                      editingGalleryId === img.id ? " is-editing" : ""
                    }`}
                  >
                    <article className="admin-gallery-card">
                      <div className="admin-gallery-card-text">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="admin-list-title">{img.title || "Untitled"}</h3>
                            {img.caption && <p className="admin-list-meta">{img.caption}</p>}
                            {!img.isActive && <span className="admin-badge">Hidden</span>}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingGalleryId(editingGalleryId === img.id ? null : img.id)
                            }
                            className="admin-btn admin-btn-ghost shrink-0"
                          >
                            {editingGalleryId === img.id ? "Close" : "Edit"}
                          </button>
                        </div>
                      </div>
                      <div className="admin-gallery-card-image">
                        <Image
                          src={img.imageUrl}
                          alt={img.title || "Gallery"}
                          fill
                          className="object-cover"
                          sizes="104px"
                        />
                      </div>
                    </article>

                    {editingGalleryId === img.id && (
                      <div className="mt-3 rounded-xl border border-border bg-background/60 p-4">
                        <EditGalleryForm
                          image={img}
                          onSuccess={refreshGallery}
                          onCancel={() => setEditingGalleryId(null)}
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      )}

      {view === "bookings-admin" && (
      <section className="admin-section">
        <div className="admin-section-header">
          <p className="admin-section-label">Clients</p>
          <h2 className="admin-section-title">Bookings</h2>
          <p className="admin-section-desc">
            Events customers see on My Events after they sign in.
          </p>
        </div>
        <CustomerEventsSection initialEvents={initialCustomerEvents} />
      </section>
      )}
    </>
  );
}
