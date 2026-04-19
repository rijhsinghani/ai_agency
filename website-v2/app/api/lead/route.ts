import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const FALLBACK_WEBHOOK_URL =
  "https://hooks.rajphotovideo.com/webhook/sameer-automations-lead";

const BUSINESS_TYPES = [
  "dental",
  "salon",
  "trades",
  "gym",
  "real_estate",
  "cleaning",
  "law",
  "tutoring",
  "other",
] as const;

const LeadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(200),
  business_type: z.enum(BUSINESS_TYPES),
  biggest_pain_point: z.string().trim().min(10).max(500),
  consent: z.literal(true),
  source: z.string().max(100).optional(),
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
});

type Lead = z.infer<typeof LeadSchema>;

type LeadPayload = Lead & {
  source: string;
  submitted_at: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = LeadSchema.safeParse(rawBody);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const field = first?.path.join(".") || "body";
    const message = first?.message || "Invalid request.";
    return NextResponse.json(
      { ok: false, error: `${field}: ${message}` },
      { status: 400 },
    );
  }

  const payload: LeadPayload = {
    ...parsed.data,
    source: parsed.data.source ?? "sameerautomations.com",
    submitted_at: new Date().toISOString(),
  };

  const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL || FALLBACK_WEBHOOK_URL;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (upstream.status === 404) {
      const fallbackId = `fallback-${crypto.randomUUID()}`;
      // Fallback log so leads aren't lost while the n8n webhook is being provisioned.
      console.log(
        `LEAD_CAPTURE_FALLBACK ${JSON.stringify({ id: fallbackId, ...payload })}`,
      );
      return NextResponse.json({ ok: true, id: fallbackId }, { status: 200 });
    }

    const contentType = upstream.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body: unknown = await upstream.json().catch(() => ({}));
      return NextResponse.json(body, { status: upstream.status });
    }
    const text = await upstream.text().catch(() => "");
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "content-type": contentType || "text/plain" },
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Couldn't submit, please email sameer@rajphotovideo.com directly.",
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
