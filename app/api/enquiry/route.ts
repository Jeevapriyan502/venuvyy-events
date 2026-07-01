import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  GMAIL_VALIDATION_MESSAGE,
  isValidGmail,
  isValidIndianPhone,
  PHONE_VALIDATION_MESSAGE,
} from "@/lib/contact-validation";

type EnquiryBody = {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  guestCount?: number;
  message?: string;
  termsAccepted?: boolean;
};

function validate(body: EnquiryBody): string | null {
  if (!body.termsAccepted) {
    return "You must accept the terms and conditions to submit an enquiry.";
  }
  if (!body.name?.trim()) return "Name is required.";
  if (!body.email?.trim() || !isValidGmail(body.email)) {
    return GMAIL_VALIDATION_MESSAGE;
  }
  if (!body.phone?.trim() || !isValidIndianPhone(body.phone)) {
    return PHONE_VALIDATION_MESSAGE;
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
