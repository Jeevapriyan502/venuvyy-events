import { getActivePackageCountsByEventType } from "@/lib/package-counts";
import EventCategoriesGrid from "./EventCategoriesGrid";

export const dynamic = "force-dynamic";

export default async function EventCategoriesSection() {
  const packageCounts = await getActivePackageCountsByEventType();
  return <EventCategoriesGrid packageCounts={packageCounts} />;
}
