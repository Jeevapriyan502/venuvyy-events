import ConsultationCta from "@/components/ConsultationCta";
import FaqSection from "@/components/FaqSection";
import HomeOverview from "@/components/HomeOverview";
import HomeWorkspace from "@/components/HomeWorkspace";
import MemoryGallery from "@/components/MemoryGallery";
import PackageShowcase from "@/components/PackageShowcase";
import PlanningForm from "@/components/PlanningForm";
import SpecificNeedsSection from "@/components/SpecificNeedsSection";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ eventType?: string }>;
}) {
  const { eventType } = await searchParams;

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <HomeWorkspace
        home={<HomeOverview gallery={<MemoryGallery />} />}
        packages={<PackageShowcase eventType={eventType} />}
        needs={<SpecificNeedsSection />}
        planning={
          <>
            <PlanningForm />
            <ConsultationCta />
          </>
        }
        faq={<FaqSection />}
      />
    </main>
  );
}
