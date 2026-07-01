import { prisma } from "@/lib/prisma";

/** Active package counts keyed by eventType (e.g. "Birthday Party" → 2). */
export async function getActivePackageCountsByEventType(): Promise<Record<string, number>> {
  const rows = await prisma.package.groupBy({
    by: ["eventType"],
    where: { isActive: true, eventType: { not: null } },
    _count: { id: true },
  });

  const counts: Record<string, number> = {};
  for (const row of rows) {
    if (row.eventType) counts[row.eventType] = row._count.id;
  }
  return counts;
}
