import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type EnquiryBody = {
  name?: string;
  email?: string;
  eventType?: string;
  eventDate?: string;
  guestCount?: number;
  message?: string;
};

function validate(body: EnquiryBody): string | null {
  if (!body.name?.trim()) return "Name is required.";
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return "Valid email is required.";
  }
  if (!body.eventType?.trim()) return "Event type is required.";
  if (!body.eventDate?.trim()) return "Event date is required.";
  if (!body.guestCount || body.guestCount < 1) return "Guest count must be at least 1.";
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body: EnquiryBody = await request.json();
    const validationError = validate(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const email = body.email!.trim().toLowerCase();

    // Upsert CRM contact and link enquiry (lead pipeline)
    const contact = await prisma.crmContact.upsert({
      where: { email },
      create: {
        name: body.name!.trim(),
        email,
        developmentRating: "WARM",
      },
      update: {
        name: body.name!.trim(),
        developmentRating: "WARM",
      },
    });

    const enquiry = await prisma.enquiry.create({
      data: {
        name: body.name!.trim(),
        email,
        eventType: body.eventType!.trim(),
        eventDate: body.eventDate!.trim(),
        guestCount: body.guestCount!,
        message: body.message?.trim() || null,
        contactId: contact.id,
      },
    });

    return NextResponse.json(
      { success: true, id: enquiry.id, message: "Enquiry received successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
