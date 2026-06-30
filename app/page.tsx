import ConsultationForm from "@/components/ConsultationForm";
import CustomPlanningForm from "@/components/CustomPlanningForm";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import PackageShowcase from "@/components/PackageShowcase";

const services = [
  {
    title: "Weddings",
    description:
      "From intimate ceremonies to grand celebrations — every floral detail, every moment, flawlessly orchestrated.",
    icon: "✦",
  },
  {
    title: "Corporate Events",
    description:
      "Conferences, product launches, and executive gatherings that leave a lasting impression on every guest.",
    icon: "◆",
  },
  {
    title: "Private Parties",
    description:
      "Birthdays, anniversaries, and milestone celebrations curated with elegance and personal touch.",
    icon: "❖",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c1220] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,_#1e3a5f30,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_70%,_#d4af3710,_transparent_45%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 text-left md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="font-tagline text-sm uppercase tracking-[0.35em] text-[#d4af37]">
                Premium Event Planning
              </p>
              <h1 className="mt-6 font-logo text-4xl leading-[1.15] tracking-wide md:text-6xl">
                Unforgettable Events,{" "}
                <span className="bg-gradient-to-b from-[#f0d78c] via-[#d4af37] to-[#9a7b2e] bg-clip-text text-transparent">
                  Flawlessly Executed
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
                Venuvyy Events transforms your vision into extraordinary experiences.
                Meticulous planning, elegant design, and flawless delivery — every single time.
              </p>
              <div className="mt-10">
                <a
                  href="#consultation"
                  className="inline-block rounded-full bg-gradient-to-b from-[#f0d78c] to-[#9a7b2e] px-8 py-3.5 font-medium text-[#1a1a1b] shadow-xl shadow-[#d4af37]/20 transition hover:opacity-90"
                >
                  Book Consultation
                </a>
              </div>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Logo variant="dark" size="lg" showTagline />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-[#111827] py-24">
        <div className="mx-auto max-w-6xl px-6 text-left">
          <p className="font-tagline text-sm uppercase tracking-[0.35em] text-[#d4af37]">
            What We Do
          </p>
          <h2 className="mt-4 font-logo text-4xl md:text-5xl">Our Services</h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group rounded-2xl border border-[#d4af37]/10 bg-[#151c2c] p-8 transition hover:border-[#d4af37]/30 hover:bg-[#1a2236]"
              >
                <span className="text-2xl text-[#d4af37]">{service.icon}</span>
                <h3 className="mt-4 font-logo text-xl text-white">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-400">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Custom package CTA */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_#1e3a5f25,_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 text-left">
          <p className="font-tagline text-sm uppercase tracking-[0.35em] text-[#d4af37]">
            Tailored For You
          </p>
          <h2 className="mt-4 font-logo text-3xl md:text-4xl">
            Custom{" "}
            <span className="text-[#d4af37]">Event Packages</span>
          </h2>
          <p className="mt-4 max-w-xl text-slate-400">
            No two celebrations are alike. Share your preferences and we will design a bespoke
            experience from venue to final farewell.
          </p>
          <a
            href="#custom-planning"
            className="mt-8 inline-block rounded-full border border-[#d4af37]/50 px-10 py-4 font-medium text-[#d4af37] transition hover:bg-[#d4af37]/10"
          >
            Start Planning
          </a>
        </div>
      </section>

      <CustomPlanningForm />
      <ConsultationForm />

      {/* Packages at end of scroll */}
      <PackageShowcase />

      <footer className="border-t border-[#d4af37]/10 bg-[#080d16] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 text-left">
          <Logo variant="dark" size="sm" />
          <p className="font-tagline text-xs uppercase tracking-[0.3em] text-slate-600">
            Creating Moments, Capturing Memories
          </p>
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Venuvyy Events. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
