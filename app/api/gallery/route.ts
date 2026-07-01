import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
import { uploadGalleryImage } from "@/lib/package-image";
import { revalidatePublicPages } from "@/lib/revalidate-public";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeAll = searchParams.get("all") === "true";

  if (includeAll) {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const images = await prisma.galleryImage.findMany({
    where: includeAll ? undefined : { isActive: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(images);
}

export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = (formData.get("title") as string) || null;
    const caption = (formData.get("caption") as string) || null;
    const image = formData.get("image") as File | null;

    if (!image || image.size === 0) {
      return NextResponse.json({ error: "Image is required." }, { status: 400 });
    }

    const imageUrl = await uploadGalleryImage(image, title?.trim() || "memory");

    const galleryImage = await prisma.galleryImage.create({
      data: {
        title: title?.trim() || null,
        caption: caption?.trim() || null,
        imageUrl,
        isActive: true,
      },
    });

    revalidatePublicPages();

    return NextResponse.json({ success: true, image: galleryImage }, { status: 201 });
  } catch (error) {
    console.error("Gallery create error:", error);
    return NextResponse.json({ error: "Failed to add gallery image." }, { status: 500 });
  }
}
