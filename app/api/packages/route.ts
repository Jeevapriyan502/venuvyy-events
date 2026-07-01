import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
import { uploadPackageImage } from "@/lib/package-image";
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

  const packages = await prisma.package.findMany({
    where: includeAll ? undefined : { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(packages);
}

export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || null;
    const price = parseFloat(formData.get("price") as string);
    const eventType = (formData.get("eventType") as string) || null;
    const image = formData.get("image") as File | null;

    if (!title?.trim() || isNaN(price) || price <= 0) {
      return NextResponse.json({ error: "Title and valid price are required." }, { status: 400 });
    }

    let imageUrl: string | null = null;

    if (image && image.size > 0) {
      imageUrl = await uploadPackageImage(image, title.trim());
    }

    const pkg = await prisma.package.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        price,
        eventType,
        imageUrl,
        isActive: true,
      },
    });

    revalidatePublicPages();

    return NextResponse.json({ success: true, package: pkg }, { status: 201 });
  } catch (error) {
    console.error("Package create error:", error);
    const message = error instanceof Error ? error.message : "Failed to create package.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
