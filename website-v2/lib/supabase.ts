import { createClient } from "@supabase/supabase-js";

/**
 * Returns a Supabase service-role client for use in API routes (server only).
 * Loud-fails at call time if env vars are missing — never silently falls back.
 */
export function getServiceClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "[supabase] SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required. " +
        "Set them in .env.local (dev) or Cloud Run secrets (prod).",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
