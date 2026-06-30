import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function PackageShowcase() {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <section id="packages" className="bg-[#111827] py-24">
      <div className="mx-auto max-w-6xl px-6 text-left">
        <p className="font-tagline text-sm uppercase tracking-[0.35em] text-[#d4af37]">
          Curated Experiences
        </p>
        <h2 className="mt-4 font-logo text-4xl text-white md:text-5xl">Event Packages</h2>
        <p className="mt-4 max-w-xl text-slate-400">
          {packages.length > 0
            ? "Handcrafted packages designed for unforgettable celebrations."
            : "Premium packages coming soon. Browse below or start planning a custom experience."}
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="group overflow-hidden rounded-2xl border border-[#d4af37]/10 bg-[#151c2c] transition hover:border-[#d4af37]/40 hover:shadow-2xl hover:shadow-[#d4af37]/5"
            >
              <div className="relative h-52 overflow-hidden bg-[#0c1220]">
                {pkg.imageUrl ? (
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl opacity-30">✦</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#151c2c] to-transparent" />
                {pkg.eventType && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#d4af37]/90 px-3 py-1 text-xs font-medium text-[#1a1a1b]">
                    {pkg.eventType}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-logo text-xl text-white">{pkg.title}</h3>
                {pkg.description && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
                    {pkg.description}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-medium text-[#d4af37]">
                    ₹{Number(pkg.price).toLocaleString("en-IN")}
                  </p>
                  <a
                    href="#consultation"
                    className="text-sm text-slate-400 transition hover:text-[#d4af37]"
                  >
                    Enquire →
                  </a>
                </div>
              </div>
            </article>
          ))}

          {/* Custom package card */}
          <article className="flex flex-col overflow-hidden rounded-2xl border border-dashed border-[#d4af37]/40 bg-[#151c2c] p-8 transition hover:border-[#d4af37]/70 hover:bg-[#1a2236]">
            <span className="text-3xl text-[#d4af37]">✧</span>
            <h3 className="mt-4 font-logo text-xl text-white">Custom Package</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
              Every detail shaped around your vision — venue, decor, catering, and timeline built
              from scratch for your celebration.
            </p>
            <a
              href="#custom-planning"
              className="mt-6 inline-block rounded-full border border-[#d4af37]/50 px-6 py-2.5 text-center text-sm font-medium text-[#d4af37] transition hover:bg-[#d4af37]/10"
            >
              Start Planning
            </a>
          </article>
        </div>

        {packages.length === 0 && (
          <p className="mt-8 text-sm text-slate-500">
            More packages will appear here as they are added.{" "}
            <a href="#custom-planning" className="text-[#d4af37] hover:underline">
              Start planning a custom event →
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
