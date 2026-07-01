import { prisma } from "@/lib/prisma";
import MemoryGalleryGrid from "./MemoryGalleryGrid";

export const dynamic = "force-dynamic";

export default async function MemoryGallery() {
  const images = await prisma.galleryImage.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      caption: true,
      imageUrl: true,
    },
  });

  return <MemoryGalleryGrid images={images} />;
}
