import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contactSchema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // Stub: in v1 we simply log the submission server-side. When a real provider
  // (e.g. Resend) is wired in, replace this block with the send call.
  console.info("[continuum:contact] new enquiry", {
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company,
    service: parsed.data.service,
    length: parsed.data.message.length,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
