import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getServiceClient } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";
import { getGuideBySlug } from "@/lib/guides";

export const runtime = "nodejs";

const SubscribeSchema = z.object({
  email: z.string().trim().email().max(200),
  guideSlug: z.string().trim().min(1).max(100),
  consent: z.literal(true),
});

function getClientIp(req: NextRequest): string {
  // Cloud Run sets x-forwarded-for; fall back to a constant for local dev
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1"
  );
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Rate limit by IP
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests. Please wait a minute and try again.",
      },
      { status: 429 },
    );
  }

  // Parse and validate body
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = SubscribeSchema.safeParse(rawBody);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const field = first?.path.join(".") || "body";
    const msg = first?.message || "Invalid request.";
    return NextResponse.json(
      { ok: false, error: `${field}: ${msg}` },
      { status: 400 },
    );
  }

  const { email, guideSlug, consent: _consent } = parsed.data;

  // Validate guide slug exists
  const guide = getGuideBySlug(guideSlug);
  if (!guide) {
    return NextResponse.json(
      { ok: false, error: "Unknown guide." },
      { status: 400 },
    );
  }

  // Write to Supabase — upsert so repeat submits for the same guide don't error
  let supabaseError: string | null = null;
  try {
    const db = getServiceClient();
    const { error } = await db.from("guide_subscribers").upsert(
      {
        email,
        source_guide_slug: guideSlug,
        consented_at: new Date().toISOString(),
      },
      { onConflict: "email,source_guide_slug" },
    );
    if (error) {
      // Log server-side but don't expose internals to caller
      console.error("[subscribe] Supabase upsert error:", error.message);
      supabaseError = error.message;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[subscribe] Supabase client error:", msg);
    supabaseError = msg;
  }

  // Send delivery email via Resend
  let resendError: string | null = null;
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error("[subscribe] RESEND_API_KEY is not set");
    resendError = "Email service not configured.";
  } else {
    try {
      const resend = new Resend(resendKey);
      const fromAddress =
        process.env.RESEND_FROM_ADDRESS ??
        "Sameer <hello@sameerautomations.com>";

      const { error } = await resend.emails.send({
        from: fromAddress,
        to: email,
        subject: `Your guide: ${guide.title}`,
        html: buildDeliveryEmail(guide.title, guide.slug),
      });

      if (error) {
        console.error("[subscribe] Resend send error:", error.message);
        resendError = error.message;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[subscribe] Resend client error:", msg);
      resendError = msg;
    }
  }

  // Both failures → 502 (user-safe message, no internals)
  if (supabaseError && resendError) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong on our end. Please try again or DM @sameer_rijhsinghani on Instagram.",
      },
      { status: 502 },
    );
  }

  // Partial failure — Supabase wrote but email failed (or vice versa)
  // Still return ok:true so the visitor can access the guide; we log the partial failure above.
  return NextResponse.json({ ok: true, slug: guideSlug }, { status: 200 });
}

function buildDeliveryEmail(title: string, slug: string): string {
  const guideUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://sameerautomations.com"}/guides/${slug}`;
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="background:#0a1117;color:#fcfcfc;font-family:system-ui,sans-serif;margin:0;padding:40px 20px;">
  <div style="max-width:480px;margin:0 auto;">
    <p style="color:#a055ff;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:24px;">
      Sameer Automations
    </p>
    <h1 style="font-size:1.5rem;font-weight:700;color:#fcfcfc;margin-bottom:16px;line-height:1.2;">
      Here's your guide: ${title}
    </h1>
    <p style="color:#a8a29e;font-size:0.9375rem;line-height:1.55;margin-bottom:32px;">
      You're in. Click the button below to read the full guide — your email has unlocked it.
    </p>
    <a href="${guideUrl}"
       style="display:inline-block;background:linear-gradient(180deg,#c084fc 0%,#a055ff 55%,#5a1f94 100%);color:#fff;text-decoration:none;font-weight:700;font-size:0.9375rem;padding:14px 28px;border-radius:12px;margin-bottom:32px;">
      Read the guide →
    </a>
    <p style="color:#6b7280;font-size:0.8125rem;line-height:1.55;">
      You'll also get the operator note — one short idea every week from the automations I'm actually building.
      No fluff. Unsubscribe any time by replying "unsubscribe."
    </p>
    <hr style="border:none;border-top:1px solid rgba(252,252,252,0.06);margin:32px 0;" />
    <p style="color:#6b7280;font-size:0.75rem;">
      Sameer Automations · sameerautomations.com
    </p>
  </div>
</body>
</html>`;
}
