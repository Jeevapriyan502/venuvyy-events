import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
import { uploadPackageImage } from "@/lib/package-image";
import { revalidatePublicPages } from "@/lib/revalidate-public";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const existing = await prisma.package.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Package not found." }, { status: 404 });
    }

    const formData = await request.formData();
    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string) || null;
    const priceRaw = formData.get("price") as string;
    const price = parseFloat(priceRaw);
    const eventType = (formData.get("eventType") as string) || null;
    const isActive =
      formData.get("isActive") === "on" || formData.get("isActive") === "true";
    const image = formData.get("image") as File | null;

    if (!title || isNaN(price) || price <= 0) {
      return NextResponse.json({ error: "Title and valid price are required." }, { status: 400 });
    }

    let imageUrl = existing.imageUrl;

    if (image && image.size > 0) {
      imageUrl = await uploadPackageImage(image, title);
    }

    const pkg = await prisma.package.update({
      where: { id },
      data: {
        title,
        description: description?.trim() || null,
        price,
        eventType,
        imageUrl,
        isActive,
      },
    });

    revalidatePublicPages();

    return NextResponse.json({ success: true, package: pkg });
  } catch (error) {
    console.error("Package update error:", error);
    const message = error instanceof Error ? error.message : "Failed to update package.";
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
    const existing = await prisma.package.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Package not found." }, { status: 404 });
    }

    await prisma.package.update({
      where: { id },
      data: { isActive: false },
    });

    revalidatePublicPages();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Package delete error:", error);
    return NextResponse.json({ error: "Failed to remove package." }, { status: 500 });
  }
}
