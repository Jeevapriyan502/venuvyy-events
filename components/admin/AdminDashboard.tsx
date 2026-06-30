"use client";

import { useState } from "react";
import Image from "next/image";
import AddPackageForm from "./AddPackageForm";

type Package = {
  id: string;
  title: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  eventType: string | null;
  isActive: boolean;
};

export default function AdminDashboard({ initialPackages }: { initialPackages: Package[] }) {
  const [packages, setPackages] = useState(initialPackages);

  const refresh = async () => {
    const res = await fetch("/api/packages");
    const data = await res.json();
    setPackages(data);
  };

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-2">
      <div className="rounded-2xl border border-[#d4af37]/20 bg-[#1a1a1b] p-8">
        <h2 className="font-logo text-xl text-[#d4af37]">Upload New Package</h2>
        <p className="mt-1 text-sm text-slate-400">Add event packages with images</p>
        <div className="mt-6">
          <AddPackageForm onSuccess={refresh} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#d4af37]/20 bg-[#1a1a1b] p-8">
        <h2 className="font-logo text-xl text-[#d4af37]">Your Packages</h2>
        <div className="mt-6 max-h-[600px] space-y-4 overflow-y-auto">
          {packages.length === 0 ? (
            <p className="text-slate-500">No packages yet. Upload your first package.</p>
          ) : (
            packages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex gap-4 rounded-xl border border-[#d4af37]/10 bg-[#0f0f10] p-4"
              >
                {pkg.imageUrl ? (
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-[#1a1a1b] text-2xl">
                    📦
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-white">{pkg.title}</h3>
                  <p className="text-sm text-[#d4af37]">
                    ₹{Number(pkg.price).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-slate-500">{pkg.eventType}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
