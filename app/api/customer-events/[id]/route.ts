import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
import { uploadCustomerEventImage } from "@/lib/package-image";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const formData = await request.formData();
    const customerEmail = formData.get("customerEmail") as string | null;
    const title = formData.get("title") as string | null;
    const eventType = formData.get("eventType") as string | null;
    const eventDate = formData.get("eventDate") as string | null;
    const guestCountRaw = formData.get("guestCount") as string | null;
    const description = formData.get("description") as string | null;
    const status = formData.get("status") as string | null;
    const image = formData.get("image") as File | null;

    const existing = await prisma.customerEvent.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    let imageUrl = existing.imageUrl;
    if (image && image.size > 0) {
      imageUrl = await uploadCustomerEventImage(image, title?.trim() || existing.title);
    }

    const guestCount = guestCountRaw ? parseInt(guestCountRaw, 10) : null;

    const event = await prisma.customerEvent.update({
      where: { id },
      data: {
        ...(customerEmail && { customerEmail: customerEmail.trim().toLowerCase() }),
        ...(title && { title: title.trim() }),
        eventType: eventType || null,
        eventDate: eventDate || null,
        guestCount: guestCount && !isNaN(guestCount) ? guestCount : null,
        description: description?.trim() || null,
        imageUrl,
        ...(status && {
          status: status as "PLANNED" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED",
        }),
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Customer event update error:", error);
    const message = error instanceof Error ? error.message : "Failed to update event.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    await prisma.customerEvent.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
}
