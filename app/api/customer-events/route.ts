import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser, getSessionUser } from "@/lib/auth";
import { uploadCustomerEventImage } from "@/lib/package-image";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeAll = searchParams.get("all") === "true";

  if (includeAll) {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const events = await prisma.customerEvent.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(events);
  }

  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = user.emailAddresses[0]?.emailAddress?.toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "No email on account" }, { status: 400 });
  }

  const events = await prisma.customerEvent.findMany({
    where: {
      OR: [{ customerEmail: email }, { clerkUserId: user.id }],
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const customerEmail = (formData.get("customerEmail") as string)?.trim().toLowerCase();
    const title = (formData.get("title") as string)?.trim();
    const eventType = (formData.get("eventType") as string) || null;
    const eventDate = (formData.get("eventDate") as string) || null;
    const guestCountRaw = formData.get("guestCount") as string;
    const guestCount = guestCountRaw ? parseInt(guestCountRaw, 10) : null;
    const description = (formData.get("description") as string) || null;
    const status = (formData.get("status") as string) || "PLANNED";
    const image = formData.get("image") as File | null;

    if (!customerEmail || !title) {
      return NextResponse.json(
        { error: "Customer email and event title are required." },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;
    if (image && image.size > 0) {
      imageUrl = await uploadCustomerEventImage(image, title);
    }

    const event = await prisma.customerEvent.create({
      data: {
        customerEmail,
        title,
        eventType,
        eventDate,
        guestCount: guestCount && !isNaN(guestCount) ? guestCount : null,
        description: description?.trim() || null,
        imageUrl,
        status: status as "PLANNED" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED",
      },
    });

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error) {
    console.error("Customer event create error:", error);
    const message = error instanceof Error ? error.message : "Failed to create event.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
