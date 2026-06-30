import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase";

export async function GET() {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
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
      const bucket = process.env.SUPABASE_STORAGE_BUCKET || "package-images";
      const ext = image.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${title.replace(/\s+/g, "-").toLowerCase()}.${ext}`;
      const buffer = Buffer.from(await image.arrayBuffer());

      const supabase = createServiceClient();
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, buffer, { contentType: image.type, upsert: false });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return NextResponse.json(
          { error: `Image upload failed: ${uploadError.message}. Create bucket "${bucket}" in Supabase Storage.` },
          { status: 500 }
        );
      }

      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
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

    return NextResponse.json({ success: true, package: pkg }, { status: 201 });
  } catch (error) {
    console.error("Package create error:", error);
    return NextResponse.json({ error: "Failed to create package." }, { status: 500 });
  }
}
