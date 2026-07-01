import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
import { uploadGalleryImage } from "@/lib/package-image";
import { revalidatePublicPages } from "@/lib/revalidate-public";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const existing = await prisma.galleryImage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Gallery image not found." }, { status: 404 });
    }

    const formData = await request.formData();
    const title = (formData.get("title") as string) || null;
    const caption = (formData.get("caption") as string) || null;
    const isActive =
      formData.get("isActive") === "on" || formData.get("isActive") === "true";
    const image = formData.get("image") as File | null;

    let imageUrl = existing.imageUrl;

    if (image && image.size > 0) {
      imageUrl = await uploadGalleryImage(image, title?.trim() || existing.title || "memory");
    }

    const galleryImage = await prisma.galleryImage.update({
      where: { id },
      data: {
        title: title?.trim() || null,
        caption: caption?.trim() || null,
        imageUrl,
        isActive,
      },
    });

    revalidatePublicPages();

    return NextResponse.json({ success: true, image: galleryImage });
  } catch (error) {
    console.error("Gallery update error:", error);
    const message = error instanceof Error ? error.message : "Failed to update gallery image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const existing = await prisma.galleryImage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Gallery image not found." }, { status: 404 });
    }

    await prisma.galleryImage.update({
      where: { id },
      data: { isActive: false },
    });

    revalidatePublicPages();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gallery delete error:", error);
    return NextResponse.json({ error: "Failed to remove gallery image." }, { status: 500 });
  }
}
